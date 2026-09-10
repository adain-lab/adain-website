const json = (data, status=200) => new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json; charset=utf-8'}});
const allowedTypes = new Set(['product','experience','testimonial']);

async function ensureDB(db){
  // Pakai prepare().run() untuk DDL agar tidak terkena parser db.exec().
  await db.prepare(`CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    unit TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    stock TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();

  // Tambah kolom active untuk database lama.
  try{
    await db.prepare(`ALTER TABLE content ADD COLUMN active INTEGER NOT NULL DEFAULT 1`).run();
  }catch(err){
    const msg=String(err?.message||err).toLowerCase();
    if(!msg.includes('duplicate column') && !msg.includes('already exists')){
      throw err;
    }
  }

  await db.prepare(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_day TEXT NOT NULL,
    visitor_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(visit_day, visitor_hash)
  )`).run();
}

function unauthorized(){return json({error:'Unauthorized'},401)}

function adminSecret(env){
  return String(env.ADMIN_PASSWORD || '').trim();
}

function toB64Url(bytes){
  let s='';
  for(const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

async function signAdminToken(secret, ts){
  const key=await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    {name:'HMAC',hash:'SHA-256'},
    false,
    ['sign']
  );
  const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(String(ts)));
  return `${ts}.${toB64Url(new Uint8Array(sig))}`;
}

async function verifyAdminToken(request, env){
  const secret=adminSecret(env);
  if(!secret) return false;

  const auth=request.headers.get('authorization')||'';
  const token=auth.startsWith('Bearer ')?auth.slice(7):'';
  const [tsRaw,sig]=token.split('.');
  const ts=Number(tsRaw);
  if(!ts || !sig) return false;

  // 12-hour admin session
  if(Date.now()-ts > 12*60*60*1000 || ts-Date.now() > 60*1000) return false;

  const expected=await signAdminToken(secret,ts);
  return token===expected;
}

async function sha256Hex(value){
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

export default {
  async fetch(request, env){
    const url=new URL(request.url);

    if(url.pathname.startsWith('/media/')){
      if(!env.MEDIA) return new Response('Media unavailable',{status:404});
      const key=url.pathname.slice('/media/'.length);
      const obj=await env.MEDIA.get(key);
      if(!obj) return new Response('Not found',{status:404});
      const h=new Headers();
      obj.writeHttpMetadata(h);
      h.set('etag',obj.httpEtag);
      h.set('cache-control','public, max-age=86400');
      return new Response(obj.body,{headers:h});
    }

    if(!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    // Auth/diagnostic endpoints MUST NOT depend on D1.
    if(url.pathname==='/api/health') return json({ok:true});
    if(url.pathname==='/api/admin-status' && request.method==='GET'){
      const secret=adminSecret(env);
      return json({ok:true,secretConfigured:!!secret,secretLength:secret.length});
    }
    if(url.pathname==='/api/login' && request.method==='POST'){
      const body=await request.json().catch(()=>({}));
      const secret=adminSecret(env);
      const supplied=String(body.password || '').trim();
      if(secret && supplied===secret){
        const ts=Date.now();
        return json({ok:true,token:await signAdminToken(secret,ts)});
      }
      return unauthorized();
    }

    // Content endpoints need D1.
    if(!env.DB) return json({error:'D1 binding DB belum tersedia.'},503);

    if(url.pathname==='/api/db-status' && request.method==='GET'){
      try{
        await ensureDB(env.DB);
        const c=await env.DB.prepare(`SELECT COUNT(*) AS n FROM content`).first();
        const v=await env.DB.prepare(`SELECT COUNT(*) AS n FROM visits`).first();
        return json({ok:true,contentRows:Number(c?.n||0),visitRows:Number(v?.n||0)});
      }catch(err){
        return json({ok:false,error:String(err?.message||err)},500);
      }
    }

    try{
      await ensureDB(env.DB);
    }catch(err){
      return json({error:'Database belum siap', detail:String(err?.message||err)},500);
    }
    if(url.pathname==='/api/content' && request.method==='GET'){
      const type=url.searchParams.get('type');
      const unit=url.searchParams.get('unit');
      const wantsAll=url.searchParams.get('all')==='1';
      const isAdmin=wantsAll ? await verifyAdminToken(request,env) : false;
      let sql='SELECT * FROM content WHERE 1=1'; const binds=[];
      if(!isAdmin) sql+=' AND active=1';
      if(type){sql+=' AND type=?';binds.push(type)}
      if(unit){sql+=' AND unit=?';binds.push(unit)}
      sql+=' ORDER BY sort_order ASC, id DESC';
      const {results}=await env.DB.prepare(sql).bind(...binds).all(); return json(results||[]);
    }

    if(url.pathname==='/api/visit' && request.method==='POST'){
      const body=await request.json().catch(()=>({}));
      const visitorId=String(body.visitorId||'').slice(0,200);
      if(!visitorId) return json({error:'visitorId required'},400);
      const day=new Date().toISOString().slice(0,10);
      const hash=await sha256Hex(`${day}:${visitorId}`);
      await env.DB.prepare(`INSERT OR IGNORE INTO visits(visit_day,visitor_hash) VALUES(?,?)`).bind(day,hash).run();
      const today=await env.DB.prepare(`SELECT COUNT(*) AS n FROM visits WHERE visit_day=?`).bind(day).first();
      const total=await env.DB.prepare(`SELECT COUNT(*) AS n FROM visits`).first();
      return json({ok:true,today:Number(today?.n||0),total:Number(total?.n||0)});
    }

    if(url.pathname==='/api/visit-stats' && request.method==='GET'){
      const day=new Date().toISOString().slice(0,10);
      const today=await env.DB.prepare(`SELECT COUNT(*) AS n FROM visits WHERE visit_day=?`).bind(day).first();
      const total=await env.DB.prepare(`SELECT COUNT(*) AS n FROM visits`).first();
      return json({today:Number(today?.n||0),total:Number(total?.n||0)});
    }
    if(url.pathname==='/api/content' && request.method==='POST'){
      if(!await verifyAdminToken(request,env)) return unauthorized();
      const b=await request.json(); if(!allowedTypes.has(b.type)||!b.title) return json({error:'Data tidak lengkap'},400);
      const r=await env.DB.prepare(`INSERT INTO content(type,unit,title,category,price,stock,description,image_url,sort_order,active) VALUES(?,?,?,?,?,?,?,?,?,?)`)
        .bind(b.type,b.unit||'',b.title,b.category||'',b.price||'',b.stock||'',b.description||'',b.image_url||'',Number(b.sort_order)||0,b.active===0?0:1).run();
      return json({ok:true,id:r.meta?.last_row_id});
    }
    const m=url.pathname.match(/^\/api\/content\/(\d+)$/);
    if(m && request.method==='PUT'){
      if(!await verifyAdminToken(request,env)) return unauthorized(); const b=await request.json();
      await env.DB.prepare(`UPDATE content SET type=?,unit=?,title=?,category=?,price=?,stock=?,description=?,image_url=?,sort_order=?,active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`)
        .bind(b.type,b.unit||'',b.title,b.category||'',b.price||'',b.stock||'',b.description||'',b.image_url||'',Number(b.sort_order)||0,b.active===0?0:1,Number(m[1])).run();
      return json({ok:true});
    }
    if(m && request.method==='DELETE'){
      if(!await verifyAdminToken(request,env)) return unauthorized();
      const old=await env.DB.prepare('SELECT image_url FROM content WHERE id=?').bind(Number(m[1])).first();
      await env.DB.prepare('DELETE FROM content WHERE id=?').bind(Number(m[1])).run();
      if(old?.image_url?.startsWith('/media/') && env.MEDIA){
        const key=old.image_url.slice('/media/'.length);
        await env.MEDIA.delete(key).catch(()=>{});
      }
      return json({ok:true});
    }
    if(url.pathname==='/api/upload' && request.method==='POST'){
      if(!await verifyAdminToken(request,env)) return unauthorized();
      if(!env.MEDIA) return json({error:'R2 binding MEDIA belum tersedia.'},503);
      const form=await request.formData(); const file=form.get('file'); if(!file || typeof file==='string') return json({error:'File tidak ditemukan'},400);
      if(file.size>5*1024*1024) return json({error:'Maksimal file 5 MB'},400);
      const ext=(file.name.split('.').pop()||'jpg').replace(/[^a-z0-9]/gi,'').toLowerCase(); const key=`uploads/${crypto.randomUUID()}.${ext}`;
      await env.MEDIA.put(key, await file.arrayBuffer(), {httpMetadata:{contentType:file.type||'application/octet-stream'}});
      return json({ok:true,url:`/media/${key}`});
    }
    return json({error:'Not found'},404);
  }
}
