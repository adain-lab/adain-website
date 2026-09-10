import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ChevronRight, Calculator, Store, BriefcaseBusiness,
  ShieldCheck, Headphones, Boxes, TrendingUp, MessageCircle,
  Mail, Phone, ArrowRight, CheckCircle2, Search, Filter, Star,
  FileSpreadsheet, ReceiptText, Landmark, Users, Package, ShoppingBag,
  Printer, PenTool, Coffee, SprayCan, ExternalLink, LogIn, LogOut, Eye, EyeOff, Plus, Pencil, Trash2, Upload, Save, LayoutDashboard
} from 'lucide-react';
import './styles.css';

const WA_NUMBER = '62818777802';
const WA_URL = `https://wa.me/${WA_NUMBER}`;
const EMAIL = 'projectadain@gmail.com';
const TOKOPEDIA_URL = '#';

function waLink(message='Halo ada in Project, saya ingin konsultasi.') {
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
}

function BrandMark({ compact = false, light = false }) {
  const ink = light ? '#ffffff' : '#071a3a';
  return (
    <div className={`brand-mark ${compact ? 'compact' : ''} ${light ? 'light' : ''}`} aria-label="ada in Project">
      <svg className="aip-symbol" viewBox="0 0 175 62" role="img" aria-label="AIP">
        <path d="M12 54 L40 10 L68 54" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M87 10 L87 54" fill="none" stroke="#c99016" strokeWidth="6" strokeLinecap="round"/>
        <path d="M105 14 H145 Q160 14 160 28 Q160 42 145 42 H113 M113 48 V54" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="brand-name" style={{color:ink}}><span>ada in</span> <strong>Project</strong></div>
    </div>
  );
}

const units = [
  {
    id:'accounting', title:'ada in Accounting', kicker:'Akuntansi • Keuangan • Pajak',
    desc:'Solusi profesional untuk pembukuan, laporan keuangan, perpajakan, payroll, dan pendampingan administrasi bisnis.',
    icon:Calculator, visualTitle:'FINANCE', visualItems:['Laporan Keuangan','Pajak','Payroll'], cta:'Lihat Layanan'
  },
  {
    id:'vape', title:'ada in Vape', kicker:'Retail • Vape Store',
    desc:'Retail online untuk liquid, device, cartridge, dan aksesoris vape dari berbagai brand pilihan.',
    icon:Store, visualTitle:'VAPE STORE', visualItems:['Liquid','Device','Cartridge'], cta:'Lihat Produk'
  },
  {
    id:'alat', title:'ada in Alat', kicker:'ATK • Office Supplies • General Supplies',
    desc:'Kebutuhan kantor dan operasional bisnis: ATK, kertas, filing, pantry, kebersihan, serta general supplies.',
    icon:BriefcaseBusiness, visualTitle:'OFFICE SUPPLY', visualItems:['ATK','Kertas & Filing','General Supplies'], cta:'Lihat Produk'
  }
];

const services = [
  {icon:FileSpreadsheet, title:'Bookkeeping & Reporting', text:'Pencatatan transaksi, rekonsiliasi, closing bulanan dan laporan keuangan.'},
  {icon:ReceiptText, title:'Tax Compliance', text:'Pendampingan administrasi pajak dan pelaporan sesuai kebutuhan perusahaan.'},
  {icon:Users, title:'Payroll & BPJS', text:'Perhitungan payroll, BPJS dan administrasi penggajian yang lebih tertib.'},
  {icon:Landmark, title:'Finance Administration', text:'SOP, cashflow, budget, kontrol dokumen dan dukungan finance operasional.'},
];

const fallbackExperiences = [
  {type:'Accounting', title:'Penyusunan Laporan Keuangan', text:'Pendampingan pembukuan dan laporan bulanan untuk bisnis perdagangan dan distribusi.', tag:'Monthly Closing'},
  {type:'System', title:'Implementasi Sistem Accounting', text:'Setup chart of accounts, alur transaksi, migrasi data, serta SOP penggunaan sistem.', tag:'Implementation'},
  {type:'Tax & Payroll', title:'Tax & Payroll Support', text:'Pendampingan payroll, BPJS, PPh 21 dan administrasi perpajakan perusahaan.', tag:'Compliance'},
];

const fallbackVapeProducts = [
  {name:'Liquid Series A', brand:'ROKBAR', category:'Liquid', price:'Hubungi Kami', stock:'Tersedia'},
  {name:'Liquid Series B', brand:'ROKBAR', category:'Liquid', price:'Hubungi Kami', stock:'Tersedia'},
  {name:'Pod Device', brand:'Multi Brand', category:'Device', price:'Hubungi Kami', stock:'Tersedia'},
  {name:'Replacement Cartridge', brand:'Multi Brand', category:'Cartridge', price:'Hubungi Kami', stock:'Pre-order'},
  {name:'Vape Accessories', brand:'Multi Brand', category:'Accessories', price:'Hubungi Kami', stock:'Tersedia'},
  {name:'Starter Bundle', brand:'Multi Brand', category:'Bundle', price:'Hubungi Kami', stock:'Tersedia'},
];

const fallbackAlatProducts = [
  {name:'Kertas A4 80 gsm', brand:'Office Supply', category:'Kertas', price:'Minta Penawaran', stock:'Tersedia'},
  {name:'Pulpen & Writing Set', brand:'ATK', category:'ATK', price:'Minta Penawaran', stock:'Tersedia'},
  {name:'Map & Filing Document', brand:'Office Supply', category:'Filing', price:'Minta Penawaran', stock:'Tersedia'},
  {name:'Toner / Printer Supply', brand:'Office Supply', category:'Printing', price:'Minta Penawaran', stock:'By Request'},
  {name:'Pantry Office Pack', brand:'General Supply', category:'Pantry', price:'Minta Penawaran', stock:'Tersedia'},
  {name:'Cleaning Supply Pack', brand:'General Supply', category:'Cleaning', price:'Minta Penawaran', stock:'Tersedia'},
];

function useContent(type, unit, fallback=[]) {
  const [items,setItems]=useState(fallback);
  React.useEffect(()=>{ fetch(`/api/content?type=${encodeURIComponent(type)}&unit=${encodeURIComponent(unit)}`).then(r=>r.ok?r.json():[]).then(x=>{if(Array.isArray(x)&&x.length)setItems(x)}).catch(()=>{}); },[type,unit]);
  return items;
}

function ProductVisual({type, index, image}) {
  const iconsVape = [Package, ShoppingBag, Package, Boxes, ShoppingBag, Store];
  const iconsAlat = [Printer, PenTool, Boxes, Printer, Coffee, SprayCan];
  const Icon = type === 'vape' ? iconsVape[index % iconsVape.length] : iconsAlat[index % iconsAlat.length];
  if(image) return <div className={`product-visual ${type} has-image`}><img src={image} alt="Foto produk"/></div>;
  return <div className={`product-visual ${type}`}><Icon size={48}/><span>{type === 'vape' ? 'PRODUCT' : 'OFFICE'}</span></div>
}

function Catalog({type, products}) {
  const categories = ['Semua', ...Array.from(new Set(products.map(p=>p.category)))];
  const [category, setCategory] = useState('Semua');
  const [q, setQ] = useState('');
  const filtered = useMemo(()=>products.filter(p =>
    (category==='Semua' || p.category===category) &&
    `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase())
  ), [products, category, q]);

  return (
    <>
      <div className="catalog-tools">
        <div className="search-box"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..."/></div>
        <div className="filter-chips">
          {categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}
        </div>
      </div>
      <div className="product-grid">
        {filtered.map((p,i)=>(
          <article className="product-card" key={`${p.name}-${i}`}>
            <ProductVisual type={type} index={i} image={p.image_url}/>
            <div className="product-body">
              <div className="product-meta">{p.brand} • {p.category}</div>
              <h3>{p.name}</h3>
              <div className="stock">{p.stock}</div>
              <div className="product-foot">
                {p.price?<strong>{p.price}</strong>:<strong>Info Produk</strong>}
                <a href={waLink(`Halo ada in Project, saya tertarik dengan ${p.name}. Mohon info lebih lanjut.`)} target="_blank" rel="noreferrer">
                  Tanya <ChevronRight size={16}/>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && <div className="empty-state">Produk tidak ditemukan.</div>}
    </>
  );
}

function Header({page,setPage}) {
  const [open,setOpen] = useState(false);
  const go = (target) => { setOpen(false); setPage(target); window.scrollTo({top:0, behavior:'smooth'}); };
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <button className="logo-link bare" onClick={()=>go('home')}><BrandMark compact/></button>
        <div className="desktop-nav">
          <button className={page==='home'?'active':''} onClick={()=>go('home')}>Home</button>
          <button className={page==='accounting'?'active':''} onClick={()=>go('accounting')}>Accounting</button>
          <button className={page==='vape'?'active':''} onClick={()=>go('vape')}>Vape</button>
          <button className={page==='alat'?'active':''} onClick={()=>go('alat')}>Alat</button>
          <button className={page==='admin'?'active':''} onClick={()=>go('admin')}>Admin</button>
        </div>
        <a className="btn btn-primary desktop-cta" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Hubungi Kami</a>
        <button className="menu-btn" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
      </nav>
      {open && <div className="mobile-menu">
        <button onClick={()=>go('home')}>Home</button>
        <button onClick={()=>go('accounting')}>Accounting</button>
        <button onClick={()=>go('vape')}>Vape</button>
        <button onClick={()=>go('alat')}>Alat</button>
        <button onClick={()=>go('admin')}>Admin</button>
        <a href={waLink()} target="_blank" rel="noreferrer">Hubungi Kami</a>
      </div>}
    </header>
  )
}

function Footer({setPage}) {
  const go = p => { setPage(p); window.scrollTo({top:0,behavior:'smooth'}); };
  return <footer className="footer-v45">
    <div className="container footer-v45-row">
      <button className="bare" onClick={()=>go('home')}><BrandMark compact/></button>
      <div className="footer-motto"><b>More Than Business</b><span>A Better Tomorrow</span></div>
      <a href={waLink()} target="_blank" rel="noreferrer"><Phone size={18}/>0818 777 802</a>
      <a href={`mailto:${EMAIL}`}><Mail size={18}/>{EMAIL}</a>
      <span><Landmark size={18}/>Indonesia</span>
      <button className="footer-admin-link" onClick={()=>go('admin')}>Admin</button>
    </div>
  </footer>
}

function Home({setPage}) {
  const go = p => { setPage(p); window.scrollTo({top:0, behavior:'smooth'}); };
  const [visitors,setVisitors]=useState({today:0,total:0});
  React.useEffect(()=>{
    let id=localStorage.getItem('aip_visitor_id');
    if(!id){id=crypto.randomUUID();localStorage.setItem('aip_visitor_id',id)}
    fetch('/api/visit',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({visitorId:id})})
      .then(r=>r.ok?r.json():null).then(d=>{if(d)setVisitors({today:d.today||0,total:d.total||0})}).catch(()=>{});
  },[]);
  const benefits = [
    [ShieldCheck,'Layanan','Profesional'],
    [Users,'Tim','Berpengalaman'],
    [Boxes,'Solusi','Terintegrasi'],
    [TrendingUp,'Pertumbuhan','Bersama']
  ];
  return <>
    <section className="hero home-v45">
      <div className="hero-glow hero-glow-1"></div><div className="hero-glow hero-glow-2"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow gold">ADA IN PROJECT</div>
          <h1>Satu Brand,<br/><span>Berbagai Solusi</span></h1>
          <p>ada in Project adalah ekosistem bisnis yang hadir untuk memberikan solusi terbaik di berbagai kebutuhan Anda — dari keuangan, retail hingga kebutuhan kantor.</p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={()=>document.getElementById('units')?.scrollIntoView({behavior:'smooth'})}>Lihat Unit Bisnis <ArrowRight size={18}/></button>
            <a className="btn btn-ghost" href={waLink()} target="_blank" rel="noreferrer">Konsultasi</a>
          </div>
          <div className="trust-line">TERPERCAYA &nbsp;•&nbsp; PROFESIONAL &nbsp;•&nbsp; BERKEMBANG BERSAMA</div><div className="visitor-counter"><span><b>{visitors.today.toLocaleString('id-ID')}</b><small>Pengunjung Hari Ini</small></span><i></i><span><b>{visitors.total.toLocaleString('id-ID')}</b><small>Total Kunjungan Unik Harian</small></span></div>
        </div>
        <div className="hero-art">
          <div className="hero-card big"><BrandMark light/><div className="hero-tag">MORE THAN BUSINESS<br/>A BETTER TOMORROW</div></div>
          <div className="hero-quote">Solusi untuk<br/>langkah lebih baik.</div>
        </div>
        <aside className="hero-benefits">
          {benefits.map(([Icon,a,b])=><div className="hero-benefit" key={a}><span><Icon size={25}/></span><p>{a}<strong>{b}</strong></p></div>)}
        </aside>
      </div>
    </section>

    <section id="units" className="section units-section home-units-v45">
      <div className="container">
        <div className="section-head center"><div className="eyebrow gold">UNIT BISNIS KAMI</div><h2>Temukan Solusi yang Anda Butuhkan</h2><p>Tiga unit bisnis dengan identitas berbeda, tetap dalam satu keluarga <strong>ada in Project</strong>.</p></div>
        <div className="unit-grid">
          {units.map(({id,title,kicker,desc,cta,icon:Icon})=>(
            <article className={`unit-card ${id} visual-card`} key={id}>
              <div className="unit-visual">
                <div className="unit-brand"><BrandMark compact/><span>{title.replace('ada in ','')}</span></div>
                <div className="unit-scene">
                  {id==='accounting'&&<><Calculator size={74}/><FileSpreadsheet size={54}/><TrendingUp size={60}/></>}
                  {id==='vape'&&<><Package size={76}/><ShoppingBag size={58}/><Store size={60}/></>}
                  {id==='alat'&&<><PenTool size={70}/><Printer size={58}/><BriefcaseBusiness size={62}/></>}
                </div>
                <div className="unit-icon"><Icon size={27}/></div>
              </div>
              <div className="unit-body">
                <h3>{title}</h3><div className="unit-kicker">{kicker}</div><p>{desc}</p>
                <button className="card-cta" onClick={()=>go(id)}>{cta}<ChevronRight size={18}/></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
}

function PageHero({eyebrow,title,desc,children,dark=false}) {
  return <section className={`page-hero ${dark?'dark':''}`}><div className="container page-hero-grid"><div><div className="eyebrow gold">{eyebrow}</div><h1>{title}</h1><p>{desc}</p><div className="hero-actions">{children}</div></div><div className="page-badge"><BrandMark light={!dark}/><span>BUSINESS UNIT</span></div></div></section>
}

function AccountingPage() {
  const experiences = useContent('experience','accounting',fallbackExperiences);
  const testimonials = useContent('testimonial','accounting',[]);
  return <>
    <PageHero eyebrow="ADA IN ACCOUNTING" title="Akuntansi Lebih Tertib, Bisnis Lebih Fokus" desc="Layanan akuntansi, keuangan, perpajakan, payroll, dan administrasi untuk membantu bisnis bekerja lebih rapi dan terukur.">
      <a className="btn btn-gold" href={waLink('Halo ada in Accounting, saya ingin konsultasi terkait layanan accounting/finance/tax.')} target="_blank" rel="noreferrer">Konsultasi Sekarang</a>
    </PageHero>
    <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">LAYANAN</div><h2>Layanan yang Dapat Disesuaikan</h2></div><div className="service-grid">{services.map(({icon:Icon,title,text})=><article className="service-card" key={title}><Icon/><h3>{title}</h3><p>{text}</p><CheckCircle2 className="check"/></article>)}</div></div></section>
    <section className="section soft"><div className="container"><div className="section-head"><div className="eyebrow gold">EXPERIENCE</div><h2>Contoh Experience & Project</h2><p>Area ini nantinya bisa Anda tambah sendiri dari admin panel: nama project, jenis pekerjaan, deskripsi, periode dan dokumentasi.</p></div><div className="experience-grid">{experiences.map((e,i)=><article className="experience-card" key={e.title}><div className="experience-no">0{i+1}</div><div className="experience-tag">{e.type}</div><h3>{e.title}</h3><p>{e.text}</p><span>{e.tag}</span></article>)}</div></div></section>
    {testimonials.length>0 && <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">TESTIMONI</div><h2>Apa Kata Klien</h2></div><div className="experience-grid">{testimonials.map(t=><article className="experience-card" key={t.id||t.title}><Star className="star"/><h3>{t.title}</h3><p>{t.description}</p><span>{t.category||'Client'}</span></article>)}</div></div></section>}
    <section className="section"><div className="container cta-band"><div><div className="eyebrow gold">BUTUH DISKUSI?</div><h2>Ceritakan kebutuhan perusahaan Anda.</h2></div><a className="btn btn-gold" href={waLink('Halo ada in Accounting, saya ingin berdiskusi mengenai kebutuhan perusahaan saya.')} target="_blank" rel="noreferrer">WhatsApp Accounting <ArrowRight size={18}/></a></div></section>
  </>
}

function VapePage() {
  const products = useContent('product','vape',fallbackVapeProducts);
  return <>
    <PageHero dark eyebrow="ADA IN VAPE" title="Katalog Vape dalam Satu Tempat" desc="Katalog untuk liquid, device, cartridge dan aksesori. Produk dapat ditampilkan dengan harga atau diarahkan langsung ke marketplace dan WhatsApp.">
      <a className="btn btn-gold" href={TOKOPEDIA_URL}>Buka Tokopedia <ExternalLink size={17}/></a>
      <a className="btn btn-dark-ghost" href={waLink('Halo ada in Vape, saya ingin tanya produk.')} target="_blank" rel="noreferrer">Tanya via WhatsApp</a>
    </PageHero>
    <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">KATALOG PRODUK</div><h2>Produk Tersedia</h2><p>Data di bawah masih contoh. Nantinya produk, foto, harga, stok, kategori dan link marketplace bisa dikelola dari admin panel.</p></div><Catalog type="vape" products={products}/></div></section>
  </>
}

function AlatPage() {
  const products = useContent('product','alat',fallbackAlatProducts);
  return <>
    <PageHero eyebrow="ADA IN ALAT" title="Kebutuhan Kantor & General Supplies" desc="Pengadaan ATK, perlengkapan kantor, printing, filing, pantry, kebersihan dan kebutuhan operasional perusahaan.">
      <a className="btn btn-gold" href={waLink('Halo ada in Alat, saya ingin minta penawaran kebutuhan ATK / office supplies.')} target="_blank" rel="noreferrer">Minta Penawaran</a>
    </PageHero>
    <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">KATALOG PRODUK</div><h2>Office & General Supplies</h2><p>Harga dapat ditampilkan langsung atau menggunakan format “Minta Penawaran” untuk kebutuhan pengadaan perusahaan.</p></div><Catalog type="alat" products={products}/></div></section>
    <section className="section soft"><div className="container cta-band"><div><div className="eyebrow gold">PENGADAAN PERUSAHAAN</div><h2>Punya daftar kebutuhan bulanan?</h2><p>Kirim daftar barang melalui WhatsApp. Kami siapkan penawaran sesuai kebutuhan.</p></div><a className="btn btn-primary" href={waLink('Halo ada in Alat, saya punya daftar kebutuhan kantor dan ingin minta penawaran.')} target="_blank" rel="noreferrer">Kirim Daftar Kebutuhan</a></div></section>
  </>
}


function AdminPage(){
  const [token,setToken]=useState(()=>sessionStorage.getItem('aip_admin')||'');
  const [password,setPassword]=useState(''); const [items,setItems]=useState([]); const [tab,setTab]=useState('product'); const [msg,setMsg]=useState('');
  const blank={id:null,type:'product',unit:'vape',title:'',category:'Liquid',price:'',stock:'Tersedia',description:'',image_url:'',sort_order:0,active:1};
  const [form,setForm]=useState(blank);
  const load=()=>fetch('/api/content?all=1',{headers:{authorization:`Bearer ${token}`}}).then(r=>r.json()).then(x=>setItems(Array.isArray(x)?x:[])).catch(()=>setItems([]));
  React.useEffect(()=>{if(token)load()},[token]);
  const login=async(e)=>{e.preventDefault();setMsg('Memeriksa...');try{const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});if(r.ok){const d=await r.json();sessionStorage.setItem('aip_admin',d.token);setToken(d.token);setPassword('');setMsg('')}else if(r.status===401){setMsg('Password admin salah.')}else{setMsg('Login gagal. Coba refresh halaman.')}}catch{setMsg('Tidak dapat terhubung ke server.')}};
  const save=async(e)=>{e.preventDefault();const url=form.id?`/api/content/${form.id}`:'/api/content';const r=await fetch(url,{method:form.id?'PUT':'POST',headers:{'content-type':'application/json','authorization':`Bearer ${token}`},body:JSON.stringify({...form,price:(form.priceMode==='contact'?'Hubungi Kami':form.priceMode==='quote'?'Minta Penawaran':form.priceMode==='hidden'?'':form.price)})});if(r.ok){setMsg('Data berhasil disimpan.');setForm({...blank,type:tab,unit:tab==='product'?'vape':'accounting',category:tab==='product'?'Liquid':'',stock:tab==='product'?'Tersedia':'',priceMode:tab==='product'?'show':''});load()}else setMsg('Gagal menyimpan data.')};
  const del=async(x)=>{if(!confirm(`Yakin ingin menghapus "${x.title}"? Data dan foto produk akan dihapus.`))return;const r=await fetch(`/api/content/${x.id}`,{method:'DELETE',headers:{authorization:`Bearer ${token}`}});if(r.ok){setMsg('Data berhasil dihapus.');if(form.id===x.id)setForm({...blank,type:tab,unit:tab==='product'?'vape':'accounting',category:tab==='product'?'Liquid':'',active:1});load()}else setMsg('Gagal menghapus data.');};
  const upload=async(file)=>{if(!file)return;setMsg('Mengupload foto...');const fd=new FormData();fd.append('file',file);const r=await fetch('/api/upload',{method:'POST',headers:{authorization:`Bearer ${token}`},body:fd});const d=await r.json();if(r.ok){setForm(f=>({...f,image_url:d.url}));setMsg('Foto berhasil diupload.')}else setMsg(d.error||'Upload gagal.')};
  const edit=x=>{setTab(x.type);setForm({...x,active:Number(x.active)!==0?1:0,priceMode:x.price==='Hubungi Kami'?'contact':x.price==='Minta Penawaran'?'quote':!x.price?'hidden':'show'});window.scrollTo({top:0,behavior:'smooth'})};
  const logout=()=>{sessionStorage.removeItem('aip_admin');setToken('')};
  if(!token) return <section className="admin-login"><form onSubmit={login} className="login-card"><BrandMark/><h1>Admin Panel</h1><p>Masuk untuk mengelola produk, experience dan testimoni.</p><input type="password" placeholder="Password admin" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn btn-primary"><LogIn size={18}/> Masuk</button>{msg&&<small>{msg}</small>}</form></section>;
  const visible=items.filter(x=>x.type===tab);
  return <section className="admin-shell"><aside className="admin-side"><BrandMark light compact/><div className="admin-menu"><button className={tab==='product'?'active':''} onClick={()=>{setTab('product');setForm({...blank,type:'product',unit:'vape',category:'Liquid',stock:'Tersedia',priceMode:'show'})}}><Package/>Produk</button><button className={tab==='experience'?'active':''} onClick={()=>{setTab('experience');setForm({...blank,type:'experience',unit:'accounting'})}}><BriefcaseBusiness/>Experience</button><button className={tab==='testimonial'?'active':''} onClick={()=>{setTab('testimonial');setForm({...blank,type:'testimonial',unit:'accounting'})}}><Star/>Testimoni</button></div><button className="admin-logout" onClick={logout}><LogOut/>Logout</button></aside><div className="admin-main"><div className="admin-title"><div><div className="eyebrow gold">ADMIN PANEL</div><h1>{tab==='product'?'Produk':tab==='experience'?'Experience':'Testimoni'}</h1></div><div className="admin-count">{visible.length} data</div></div><div className="admin-grid"><form className="admin-form" onSubmit={save}><h2>{form.id?'Edit':'Tambah'} {tab}</h2><label>Unit<select value={form.unit} onChange={e=>setForm({...form,unit:e.target.value,category:tab==='product'?(e.target.value==='vape'?'Liquid':'ATK'):form.category})}>{tab==='product'?<><option value="vape">ada in Vape</option><option value="alat">ada in Alat</option></>:<option value="accounting">ada in Accounting</option>}</select></label><label>Nama / Judul<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></label><div className="form-row"><label>Kategori{tab==='product'?<select value={form.category || (form.unit==='vape'?'Liquid':'ATK')} onChange={e=>setForm({...form,category:e.target.value})}>{(form.unit==='vape'?['Liquid','Device','Cartridge','Accessories','Bundle']:['ATK','Kertas','Filing','Printing','Pantry','Cleaning','General Supplies']).map(x=><option key={x} value={x}>{x}</option>)}</select>:<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>}</label>{tab==='product'&&<label>Stok<select value={form.stock || 'Tersedia'} onChange={e=>setForm({...form,stock:e.target.value})}>{['Tersedia','Stok Terbatas','Pre-order','By Request','Habis'].map(x=><option key={x} value={x}>{x}</option>)}</select></label>}</div>{tab==='product'&&<>
  <label>Tampilan Harga
    <select value={form.priceMode || 'show'} onChange={e=>{
      const mode=e.target.value;
      setForm({...form,priceMode:mode,price:mode==='contact'?'Hubungi Kami':mode==='quote'?'Minta Penawaran':mode==='hidden'?'':form.price});
    }}>
      <option value="show">Tampilkan Harga</option>
      <option value="contact">Hubungi Kami</option>
      <option value="quote">Minta Penawaran</option>
      <option value="hidden">Sembunyikan Harga</option>
    </select>
  </label>
  {(form.priceMode || 'show')==='show'&&
    <label>Harga
      <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Contoh: Rp 120.000"/>
    </label>
  }
</>}{tab==='product'&&<label>Status Produk<select value={String(form.active ?? 1)} onChange={e=>setForm({...form,active:Number(e.target.value)})}><option value="1">Aktif — tampil di website</option><option value="0">Nonaktif — sembunyikan dari website</option></select></label>}<label>Deskripsi<textarea rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>{tab==='product'&&<div className="upload-box"><Upload/><div><b>Upload Foto Produk</b><small>JPG/PNG/WebP, maksimal 5 MB</small></div><input type="file" accept="image/*" onChange={e=>upload(e.target.files?.[0])}/>{form.image_url&&<img src={form.image_url}/>}</div>}<div className="form-actions"><button className="btn btn-primary"><Save size={17}/>{form.id?'Simpan Perubahan':'Simpan'}</button>{form.id&&<button type="button" className="btn btn-ghost" onClick={()=>setForm({...blank,type:tab,unit:tab==='product'?'vape':'accounting',category:tab==='product'?'Liquid':'',stock:tab==='product'?'Tersedia':'',priceMode:tab==='product'?'show':''})}>Batal Edit</button>}</div>{msg&&<div className="admin-msg">{msg}</div>}</form><div className="admin-list"><h2>Data Tersimpan</h2>{visible.length===0&&<div className="empty-state">Belum ada data. Tambahkan dari form di samping.</div>}{visible.map(x=><article className={`admin-item ${Number(x.active)===0?'inactive':''}`} key={x.id}>{x.image_url&&<img src={x.image_url}/>}<div><span>{x.unit} • {x.category||x.type}</span><h3>{x.title}</h3><p>{x.price||x.description||'—'} {x.stock?` • ${x.stock}`:''}</p>{x.type==='product'&&<small className={`status-pill ${Number(x.active)===0?'off':'on'}`}>{Number(x.active)===0?<><EyeOff size={13}/> Nonaktif</>:<><Eye size={13}/> Aktif</>}</small>}</div><div className="item-actions"><button title="Edit" onClick={()=>edit(x)}><Pencil/></button><button title="Hapus" className="danger" onClick={()=>del(x)}><Trash2/></button></div></article>)}</div></div></div></section>
}

function App() {
  const [page,setPage] = useState('home');
  return <div className="app"><Header page={page} setPage={setPage}/><main>{page==='home'&&<Home setPage={setPage}/>} {page==='accounting'&&<AccountingPage/>} {page==='vape'&&<VapePage/>} {page==='alat'&&<AlatPage/>} {page==='admin'&&<AdminPage/>}</main><Footer setPage={setPage}/></div>
}

createRoot(document.getElementById('root')).render(<App/>);
