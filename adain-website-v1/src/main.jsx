import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ChevronRight, Calculator, Store, BriefcaseBusiness,
  ShieldCheck, Headphones, Boxes, TrendingUp, MessageCircle,
  Mail, Phone, ArrowRight, CheckCircle2, Search, Filter, Star,
  FileSpreadsheet, ReceiptText, Landmark, Users, Package, ShoppingBag,
  Printer, PenTool, Coffee, SprayCan, ExternalLink, ShoppingCart, Plus, Minus, FileDown, Send, Trash, ClipboardList, LogIn, LogOut, Eye, EyeOff, Pencil, Trash2, Upload, Save, LayoutDashboard
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import './styles.css';

const WA_NUMBER = '62818777802';
const WA_URL = `https://wa.me/${WA_NUMBER}`;
const EMAIL = 'projectadain@gmail.com';
const TOKOPEDIA_URL = '#';

const ADMIN_PATH = '/admin';

function pageToPath(page){
  return page==='home' ? '/' : `/${page}`;
}
function pathToPage(pathname){
  const p=String(pathname||'/').replace(/\/+$/,'') || '/';
  if(p===ADMIN_PATH) return 'admin';
  if(p==='/accounting') return 'accounting';
  if(p==='/vape') return 'vape';
  if(p==='/alat') return 'alat';
  if(p==='/cart') return 'cart';
  return 'home';
}
function numericPrice(value){
  const raw=String(value??'').trim();
  if(!raw || /hubungi|penawaran|info/i.test(raw)) return null;
  const digits=raw.replace(/[^\d]/g,'');
  return digits ? Number(digits) : null;
}
function unitLabel(unit){
  return unit==='accounting'?'ada in Accounting':unit==='vape'?'ada in Vape':'ada in Alat';
}
function rupiahNumber(n){
  return `Rp. ${Number(n||0).toLocaleString('id-ID')}`;
}

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

function formatPrice(value){
  const raw=String(value??'').trim();
  if(!raw) return 'Info Produk';
  const lower=raw.toLowerCase();
  if(lower==='hubungi kami' || lower==='minta penawaran') return raw;
  const digits=raw.replace(/[^\d]/g,'');
  if(digits) return `Rp. ${Number(digits).toLocaleString('id-ID')}`;
  return raw;
}

function ProductVisual({type, index, image, title}) {
  const iconsVape = [Package, ShoppingBag, Package, Boxes, ShoppingBag, Store];
  const iconsAlat = [Printer, PenTool, Boxes, Printer, Coffee, SprayCan];
  const Icon = type === 'vape' ? iconsVape[index % iconsVape.length] : iconsAlat[index % iconsAlat.length];
  if(image) return <div className={`product-visual ${type} has-image`}><img src={image} alt={title||'Foto produk'}/></div>;
  return <div className={`product-visual ${type}`}><Icon size={48}/><span>{type === 'vape' ? 'PRODUCT' : 'OFFICE'}</span></div>
}

function ProductDetail({product,type,onClose,onAddCart}){
  if(!product) return null;
  const name=product.title||product.name||'Produk';
  return <div className="product-modal-backdrop" onClick={onClose}>
    <div className="product-modal" onClick={e=>e.stopPropagation()}>
      <button className="product-modal-close" onClick={onClose} aria-label="Tutup"><X size={22}/></button>
      <div className="product-modal-grid">
        <ProductVisual type={type} index={0} image={product.image_url} title={name}/>
        <div className="product-modal-copy">
          <div className="product-meta">{product.brand||'ada in Project'} • {product.category||'Produk'}</div>
          <h2>{name}</h2>
          <div className="detail-badges"><span className="stock">{product.stock||'Tersedia'}</span></div>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p>{product.description||'Silakan hubungi kami untuk informasi lengkap mengenai produk ini.'}</p>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={()=>onAddCart?.(product,type)}><ShoppingCart size={17}/> Masukkan Keranjang</button>
            <a className="btn btn-gold" href={waLink(`Halo ada in Project, saya tertarik dengan ${name}. Mohon info lebih lanjut.`)} target="_blank" rel="noreferrer">
              Tanya Produk <MessageCircle size={17}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
}

function Catalog({type, products, onAddCart}) {
  const categories = ['Semua', ...Array.from(new Set(products.map(p=>p.category).filter(Boolean)))];
  const [category, setCategory] = useState('Semua');
  const [q, setQ] = useState('');
  const [selected,setSelected]=useState(null);
  const filtered = useMemo(()=>products.filter(p => {
    const name=p.title||p.name||'';
    return (category==='Semua' || p.category===category) &&
      `${name} ${p.brand||''} ${p.category||''}`.toLowerCase().includes(q.toLowerCase());
  }), [products, category, q]);

  return (
    <>
      <div className="catalog-tools">
        <div className="search-box"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..."/></div>
        <div className="filter-chips">
          {categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}
        </div>
      </div>
      <div className="product-grid">
        {filtered.map((p,i)=>{
          const name=p.title||p.name||'Produk';
          return <article className="product-card clickable" key={`${p.id||name}-${i}`} onClick={()=>setSelected(p)}>
            <ProductVisual type={type} index={i} image={p.image_url} title={name}/>
            <div className="product-body">
              <div className="product-meta">{p.brand||''}{p.brand?' • ':''}{p.category||'Produk'}</div>
              <h3>{name}</h3>
              <div className="stock">{p.stock||'Tersedia'}</div>
              <div className="product-foot">
                <strong>{formatPrice(p.price)}</strong>
                <div className="product-card-actions">
                  <button className="cart-mini-btn" onClick={(e)=>{e.stopPropagation();onAddCart?.(p,type)}} title="Masukkan keranjang"><ShoppingCart size={17}/></button>
                  <button className="product-detail-link" onClick={(e)=>{e.stopPropagation();setSelected(p)}}>Detail <ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </article>
        })}
      </div>
      {!filtered.length && <div className="empty-state">Produk tidak ditemukan.</div>}
      <ProductDetail product={selected} type={type} onClose={()=>setSelected(null)} onAddCart={onAddCart}/>
    </>
  );
}

function Header({page,navigate,cartCount}) {
  const [open,setOpen] = useState(false);
  const go = (target) => { setOpen(false); navigate(target); };
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <button className="logo-link bare" onClick={()=>go('home')}><BrandMark compact/></button>
        <div className="desktop-nav">
          <button className={page==='home'?'active':''} onClick={()=>go('home')}>Home</button>
          <button className={page==='accounting'?'active':''} onClick={()=>go('accounting')}>Accounting</button>
          <button className={page==='vape'?'active':''} onClick={()=>go('vape')}>Vape</button>
          <button className={page==='alat'?'active':''} onClick={()=>go('alat')}>Alat</button>
        </div>
        <div className="nav-actions">
          <button className={`cart-nav-btn ${page==='cart'?'active':''}`} onClick={()=>go('cart')}>
            <ShoppingCart size={19}/><span>Keranjang</span>{cartCount>0&&<b>{cartCount}</b>}
          </button>
          <a className="btn btn-primary desktop-cta" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Hubungi Kami</a>
        </div>
        <button className="menu-btn" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
      </nav>
      {open && <div className="mobile-menu">
        <button onClick={()=>go('home')}>Home</button>
        <button onClick={()=>go('accounting')}>Accounting</button>
        <button onClick={()=>go('vape')}>Vape</button>
        <button onClick={()=>go('alat')}>Alat</button>
        <button onClick={()=>go('cart')}>Keranjang {cartCount>0?`(${cartCount})`:''}</button>
        <a href={waLink()} target="_blank" rel="noreferrer">Hubungi Kami</a>
      </div>}
    </header>
  )
}

function Footer({navigate}) {
  return <footer className="footer-v45">
    <div className="container footer-v45-row public-footer">
      <button className="bare" onClick={()=>navigate('home')}><BrandMark compact/></button>
      <div className="footer-motto"><b>More Than Business</b><span>A Better Tomorrow</span></div>
      <a href={waLink()} target="_blank" rel="noreferrer"><Phone size={18}/>0818 777 802</a>
      <a href={`mailto:${EMAIL}`}><Mail size={18}/>{EMAIL}</a>
      <span><Landmark size={18}/>Indonesia</span>
    </div>
  </footer>
}

function Home({navigate}) {
  const go = p => navigate(p);
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
              <div className={`unit-visual unit-photo ${id}`}>
                <div className="unit-photo-overlay"></div>
                <div className="unit-brand unit-brand-photo"><BrandMark compact/><span>{title.replace('ada in ','')}</span></div>
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

const accountingCategories = [
  'Pembukuan & Laporan Keuangan',
  'Perpajakan',
  'Payroll & BPJS',
  'Finance Administration',
  'Accounting System & Implementation'
];

function AccountingDetail({item,type,onClose}){
  if(!item) return null;
  return <div className="product-modal-backdrop" onClick={onClose}>
    <div className="accounting-detail-modal" onClick={e=>e.stopPropagation()}>
      <button className="product-modal-close" onClick={onClose} aria-label="Tutup"><X size={22}/></button>
      <div className="accounting-detail-top">
        <div className="eyebrow gold">{type==='experience'?'EXPERIENCE / PROJECT':'TESTIMONI KLIEN'}</div>
        <div className="accounting-detail-category">{item.category||'Accounting'}</div>
        <h2>{item.title}</h2>
        {item.client_name&&<div className="accounting-client">Client: <strong>{item.client_name}</strong></div>}
      </div>
      <div className="accounting-detail-body">
        <p>{item.description||item.text||'Belum ada deskripsi detail.'}</p>
        <a className="btn btn-gold" href={waLink(`Halo ada in Accounting, saya ingin konsultasi terkait ${item.title}.`)} target="_blank" rel="noreferrer">
          Konsultasi <MessageCircle size={17}/>
        </a>
      </div>
    </div>
  </div>
}

function AccountingPage({onAddService}) {
  const experiences = useContent('experience','accounting',[]);
  const testimonials = useContent('testimonial','accounting',[]);
  const [activeCategory,setActiveCategory]=useState(accountingCategories[0]);
  const [detail,setDetail]=useState(null);

  const serviceByCategory = {
    'Pembukuan & Laporan Keuangan': {
      icon: FileSpreadsheet,
      title: 'Pembukuan & Laporan Keuangan',
      text: 'Pencatatan transaksi, rekonsiliasi, closing bulanan, penyusunan laporan keuangan dan review administrasi.'
    },
    'Perpajakan': {
      icon: ReceiptText,
      title: 'Perpajakan',
      text: 'Pendampingan administrasi pajak, PPh, PPN, pelaporan dan kebutuhan compliance perusahaan.'
    },
    'Payroll & BPJS': {
      icon: Users,
      title: 'Payroll & BPJS',
      text: 'Perhitungan payroll, BPJS, PPh 21, slip gaji dan administrasi penggajian secara lebih tertib.'
    },
    'Finance Administration': {
      icon: Landmark,
      title: 'Finance Administration',
      text: 'Cashflow, budgeting, SOP, kontrol dokumen, pengajuan pembayaran dan dukungan administrasi finance.'
    },
    'Accounting System & Implementation': {
      icon: Boxes,
      title: 'Accounting System & Implementation',
      text: 'Setup chart of accounts, alur transaksi, migrasi data, implementasi sistem dan pendampingan penggunaan.'
    }
  };

  const categoryExp = experiences.filter(x => x.category===activeCategory);
  const categoryTesti = testimonials.filter(x => x.category===activeCategory);
  const current = serviceByCategory[activeCategory] || serviceByCategory[accountingCategories[0]];
  const CurrentIcon = current.icon;

  return <>
    <PageHero eyebrow="ADA IN ACCOUNTING" title="Akuntansi Lebih Tertib, Bisnis Lebih Fokus" desc="Layanan akuntansi, keuangan, perpajakan, payroll, dan administrasi untuk membantu bisnis bekerja lebih rapi dan terukur.">
      <a className="btn btn-gold" href={waLink('Halo ada in Accounting, saya ingin konsultasi terkait layanan accounting/finance/tax.')} target="_blank" rel="noreferrer">Konsultasi Sekarang</a>
    </PageHero>

    <section className="section accounting-hub"><div className="container">
      <div className="section-head">
        <div className="eyebrow gold">LAYANAN & EXPERIENCE / TESTIMONI</div>
        <h2>Pilih Kategori Layanan</h2>
        <p>Pilih kategori untuk melihat layanan serta Experience dan Testimoni yang sesuai dalam satu tempat.</p>
      </div>

      <div className="accounting-category-tabs">
        {accountingCategories.map(cat=><button key={cat} className={activeCategory===cat?'active':''} onClick={()=>setActiveCategory(cat)}>{cat}</button>)}
      </div>

      <div className="accounting-service-feature">
        <div className="service-feature-icon"><CurrentIcon size={34}/></div>
        <div>
          <div className="eyebrow gold">LAYANAN</div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
        <div className="service-cart-actions">
          <button className="btn btn-primary" onClick={()=>onAddService?.({title:current.title,category:activeCategory,description:current.text})}><ShoppingCart size={17}/> Tambah ke Keranjang</button>
          <a className="btn btn-ghost" href={waLink(`Halo ada in Accounting, saya ingin konsultasi untuk layanan ${current.title}.`)} target="_blank" rel="noreferrer">Konsultasi</a>
        </div>
      </div>

      <div className="category-content-grid">
        <div className="category-content-column">
          <div className="category-block-title"><div><span>EXPERIENCE / PROJECT</span><h3>Pengalaman di kategori ini</h3></div><b>{categoryExp.length}</b></div>
          {categoryExp.length===0
            ? <div className="empty-state">Belum ada Experience pada kategori ini.</div>
            : <div className="category-card-list">{categoryExp.map((e,i)=><article className="category-detail-card" key={e.id||e.title} onClick={()=>setDetail({item:e,type:'experience'})}>
                <div className="category-card-no">{String(i+1).padStart(2,'0')}</div>
                <div className="category-card-copy">
                  {e.client_name&&<small>CLIENT • {e.client_name}</small>}
                  <h4>{e.title}</h4>
                  <p>{(e.description||'').slice(0,120)}{(e.description||'').length>120?'…':''}</p>
                  <button>Lihat Detail <ChevronRight size={15}/></button>
                </div>
              </article>)}</div>
          }
        </div>

        <div className="category-content-column">
          <div className="category-block-title"><div><span>TESTIMONI</span><h3>Apa kata klien</h3></div><b>{categoryTesti.length}</b></div>
          {categoryTesti.length===0
            ? <div className="empty-state">Belum ada Testimoni pada kategori ini.</div>
            : <div className="category-card-list">{categoryTesti.map(t=><article className="category-detail-card testimonial" key={t.id||t.title} onClick={()=>setDetail({item:t,type:'testimonial'})}>
                <Star className="category-star" size={21}/>
                <div className="category-card-copy">
                  {t.client_name&&<small>CLIENT • {t.client_name}</small>}
                  <h4>{t.title}</h4>
                  <p>{(t.description||'').slice(0,140)}{(t.description||'').length>140?'…':''}</p>
                  <button>Lihat Detail <ChevronRight size={15}/></button>
                </div>
              </article>)}</div>
          }
        </div>
      </div>
    </div></section>

    <section className="section soft"><div className="container cta-band"><div><div className="eyebrow gold">BUTUH DISKUSI?</div><h2>Ceritakan kebutuhan perusahaan Anda.</h2></div><a className="btn btn-gold" href={waLink('Halo ada in Accounting, saya ingin berdiskusi mengenai kebutuhan perusahaan saya.')} target="_blank" rel="noreferrer">WhatsApp Accounting <ArrowRight size={18}/></a></div></section>

    {detail&&<AccountingDetail item={detail.item} type={detail.type} onClose={()=>setDetail(null)}/>}
  </>
}

function VapePage({onAddCart}) {
  const products = useContent('product','vape',fallbackVapeProducts);
  return <>
    <PageHero dark eyebrow="ADA IN VAPE" title="Katalog Vape dalam Satu Tempat" desc="Katalog untuk liquid, device, cartridge dan aksesori. Produk dapat ditampilkan dengan harga atau diarahkan langsung ke marketplace dan WhatsApp.">
      <a className="btn btn-gold" href={TOKOPEDIA_URL}>Buka Tokopedia <ExternalLink size={17}/></a>
      <a className="btn btn-dark-ghost" href={waLink('Halo ada in Vape, saya ingin tanya produk.')} target="_blank" rel="noreferrer">Tanya via WhatsApp</a>
    </PageHero>
    <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">KATALOG PRODUK</div><h2>Produk Tersedia</h2><p>Data di bawah masih contoh. Nantinya produk, foto, harga, stok, kategori dan link marketplace bisa dikelola dari admin panel.</p></div><Catalog type="vape" products={products} onAddCart={onAddCart}/></div></section>
  </>
}

function AlatPage({onAddCart}) {
  const products = useContent('product','alat',fallbackAlatProducts);
  return <>
    <PageHero eyebrow="ADA IN ALAT" title="Kebutuhan Kantor & General Supplies" desc="Pengadaan ATK, perlengkapan kantor, printing, filing, pantry, kebersihan dan kebutuhan operasional perusahaan.">
      <a className="btn btn-gold" href={waLink('Halo ada in Alat, saya ingin minta penawaran kebutuhan ATK / office supplies.')} target="_blank" rel="noreferrer">Minta Penawaran</a>
    </PageHero>
    <section className="section"><div className="container"><div className="section-head"><div className="eyebrow gold">KATALOG PRODUK</div><h2>Office & General Supplies</h2><p>Harga dapat ditampilkan langsung atau menggunakan format “Minta Penawaran” untuk kebutuhan pengadaan perusahaan.</p></div><Catalog type="alat" products={products} onAddCart={onAddCart}/></div></section>
    <section className="section soft"><div className="container cta-band"><div><div className="eyebrow gold">PENGADAAN PERUSAHAAN</div><h2>Punya daftar kebutuhan bulanan?</h2><p>Kirim daftar barang melalui WhatsApp. Kami siapkan penawaran sesuai kebutuhan.</p></div><a className="btn btn-primary" href={waLink('Halo ada in Alat, saya punya daftar kebutuhan kantor dan ingin minta penawaran.')} target="_blank" rel="noreferrer">Kirim Daftar Kebutuhan</a></div></section>
  </>
}



function CartPage({cart,setCart,navigate}){
  const [customer,setCustomer]=useState(()=>JSON.parse(localStorage.getItem('aip_customer')||'{"name":"","company":"","phone":"","email":"","address":"","notes":""}'));
  const [msg,setMsg]=useState('');
  const updateCustomer=(k,v)=>{const next={...customer,[k]:v};setCustomer(next);localStorage.setItem('aip_customer',JSON.stringify(next))};
  const grouped=['accounting','vape','alat'].map(unit=>({unit,items:cart.filter(x=>x.unit===unit)})).filter(g=>g.items.length);
  const numericTotal=cart.reduce((sum,x)=>sum+(x.numericPrice!=null?x.numericPrice*x.qty:0),0);
  const hasNonNumeric=cart.some(x=>x.numericPrice==null);
  const requiredOk=[customer.name,customer.company,customer.phone,customer.email,customer.address].every(v=>String(v||'').trim());

  const changeQty=(id,delta)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+delta)}:x));
  const remove=(id)=>setCart(c=>c.filter(x=>x.id!==id));
  const clear=()=>{if(confirm('Kosongkan seluruh keranjang?'))setCart([])};

  const validate=()=>{
    if(!requiredOk){
      setMsg('Lengkapi semua Data Pemesan yang wajib: Nama, Perusahaan, No. WhatsApp, Email, dan Alamat.');
      return false;
    }
    if(!cart.length){
      setMsg('Keranjang masih kosong.');
      return false;
    }
    setMsg('');
    return true;
  };

  const buildPdf=()=>{
    const doc=new jsPDF({unit:'mm',format:'a4'});
    const margin=14; let y=16;
    doc.setFont('helvetica','bold'); doc.setFontSize(17); doc.text('PESANAN PEMBELIAN / INQUIRY',margin,y); y+=8;
    doc.setFontSize(11); doc.text('ada in Project',margin,y); y+=6;
    doc.setFont('helvetica','normal'); doc.setFontSize(9);
    doc.text(`Tanggal: ${new Date().toLocaleString('id-ID')}`,margin,y); y+=7;
    doc.line(margin,y,196,y); y+=7;

    doc.setFont('helvetica','bold'); doc.text('Data Pemesan',margin,y); y+=6;
    doc.setFont('helvetica','normal');
    const info=[
      `Nama: ${customer.name}`,
      `Perusahaan: ${customer.company}`,
      `No. WA: ${customer.phone}`,
      `Email: ${customer.email}`,
      `Alamat: ${customer.address}`
    ];
    info.forEach(t=>{const lines=doc.splitTextToSize(t,178);doc.text(lines,margin,y);y+=lines.length*4.5});
    y+=3;

    grouped.forEach(group=>{
      if(y>245){doc.addPage();y=16}
      doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text(unitLabel(group.unit),margin,y); y+=6;

      if(group.unit==='vape' || group.unit==='alat'){
        const col=[margin,margin+10,margin+82,margin+98,margin+119,margin+154,196];
        const rowH=7;
        doc.setFontSize(8.5);
        doc.rect(col[0],y,col[6]-col[0],rowH);
        ['No.','Nama Produk','Qty','Satuan','Harga','Jumlah'].forEach((h,i)=>doc.text(h,col[i]+2,y+4.7));
        for(let i=1;i<6;i++) doc.line(col[i],y,col[i],y+rowH);
        y+=rowH;

        let unitSubtotal=0;
        group.items.forEach((x,i)=>{
          if(y>270){doc.addPage();y=16}
          const p=x.numericPrice;
          const amount=p!=null?p*x.qty:null;
          if(amount!=null)unitSubtotal+=amount;
          const nameLines=doc.splitTextToSize(x.title,67);
          const h=Math.max(rowH, nameLines.length*4.2+3);
          doc.rect(col[0],y,col[6]-col[0],h);
          for(let j=1;j<6;j++) doc.line(col[j],y,col[j],y+h);
          doc.setFont('helvetica','normal');
          doc.text(String(i+1),col[0]+3,y+4.7);
          doc.text(nameLines,col[1]+2,y+4.7);
          doc.text(String(x.qty),col[2]+4,y+4.7);
          doc.text('Unit',col[3]+2,y+4.7);
          doc.text(p!=null?rupiahNumber(p):x.priceDisplay,col[4]+2,y+4.7);
          doc.text(amount!=null?rupiahNumber(amount):x.priceDisplay,col[5]+2,y+4.7);
          y+=h;
        });
        doc.setFont('helvetica','bold');
        doc.rect(col[0],y,col[6]-col[0],rowH);
        doc.text('Total',col[1]+2,y+4.7);
        doc.text(String(group.items.reduce((n,x)=>n+x.qty,0)),col[2]+4,y+4.7);
        doc.text(rupiahNumber(unitSubtotal),col[5]+2,y+4.7);
        for(let j=1;j<6;j++) doc.line(col[j],y,col[j],y+rowH);
        y+=rowH+6;
      }else{
        doc.setFontSize(9);
        group.items.forEach((x,i)=>{
          if(y>270){doc.addPage();y=16}
          doc.setFont('helvetica','bold'); doc.text(`${i+1}. ${x.title}`,margin,y); y+=5;
          doc.setFont('helvetica','normal');
          doc.text(`Kategori: ${x.category||'-'} | Qty: ${x.qty}`,margin+4,y); y+=5;
          doc.text(`Harga: ${x.numericPrice!=null?`${rupiahNumber(x.numericPrice)} x ${x.qty} = ${rupiahNumber(x.numericPrice*x.qty)}`:x.priceDisplay}`,margin+4,y); y+=5;
          if(x.description){const lines=doc.splitTextToSize(`Catatan: ${x.description}`,174);doc.text(lines,margin+4,y);y+=lines.length*4.5}
          y+=3;
        });
      }
    });

    if(y>255){doc.addPage();y=16}
    doc.line(margin,y,196,y); y+=7;
    doc.setFont('helvetica','bold'); doc.setFontSize(11);
    doc.text(`Total harga terhitung: ${rupiahNumber(numericTotal)}`,margin,y); y+=6;
    if(hasNonNumeric){doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text('* Item Minta Penawaran/Hubungi Kami akan dikonfirmasi oleh admin.',margin,y);y+=6}
    if(customer.notes){
      doc.setFont('helvetica','bold');doc.text('Catatan Pemesan:',margin,y);y+=5;
      doc.setFont('helvetica','normal');const lines=doc.splitTextToSize(customer.notes,178);doc.text(lines,margin,y);y+=lines.length*4.5;
    }
    y+=8;
    doc.setFontSize(8); doc.setTextColor(100); doc.text('Dokumen dibuat otomatis melalui website ada in Project.',margin,y);
    return doc;
  };

  const downloadPdf=()=>{
    if(!validate())return;
    buildPdf().save(`Pesanan-ada-in-Project-${Date.now()}.pdf`);
  };

  const printPdf=()=>{
    if(!validate())return;
    const doc=buildPdf();
    const url=URL.createObjectURL(doc.output('blob'));
    const win=window.open(url,'_blank');
    if(!win){setMsg('Popup diblokir browser. Gunakan tombol Download PDF.');return}
    setTimeout(()=>{try{win.print()}catch{}},800);
  };

  const summaryText=()=>cart.map((x,i)=>`${i+1}. ${x.title} (${unitLabel(x.unit)}) x${x.qty}`).join('\n');

  const sendWhatsApp=async()=>{
    if(!validate())return;
    const doc=buildPdf();
    const blob=doc.output('blob');
    const file=new File([blob],`Pesanan-ada-in-Project-${Date.now()}.pdf`,{type:'application/pdf'});
    const text=`Halo ada in Project, saya ingin mengirim pesanan/inquiry berikut:\n\n${summaryText()}\n\nNama: ${customer.name}\nPerusahaan: ${customer.company}\nNo. WA: ${customer.phone}\nEmail: ${customer.email}\nMohon konfirmasi ketersediaan dan total pesanan.`;
    if(navigator.canShare?.({files:[file]}) && navigator.share){
      try{
        await navigator.share({title:'Pesanan ada in Project',text,files:[file]});
        setMsg('PDF siap dibagikan. Pilih WhatsApp pada menu Share.');
        return;
      }catch(e){
        if(e?.name==='AbortError')return;
      }
    }
    doc.save(file.name);
    window.open(waLink(text),'_blank');
    setMsg('PDF sudah diunduh dan WhatsApp dibuka. Lampirkan PDF tersebut pada chat admin.');
  };

  const sendEmail=async()=>{
    if(!validate())return;
    const doc=buildPdf();
    const blob=doc.output('blob');
    const file=new File([blob],`Pesanan-ada-in-Project-${Date.now()}.pdf`,{type:'application/pdf'});
    const subject=`Pesanan / Inquiry - ${customer.company}`;
    const body=`Halo ada in Project,\n\nSaya ingin mengirim pesanan/inquiry berikut:\n\n${summaryText()}\n\nNama: ${customer.name}\nPerusahaan: ${customer.company}\nNo. WA: ${customer.phone}\nEmail: ${customer.email}\nAlamat: ${customer.address}\n\nCatatan: ${customer.notes||'-'}\n\nMohon konfirmasi ketersediaan dan total pesanan.`;

    if(navigator.canShare?.({files:[file]}) && navigator.share){
      try{
        await navigator.share({title:subject,text:body,files:[file]});
        setMsg('PDF siap dibagikan. Pilih aplikasi Email/Gmail pada menu Share.');
        return;
      }catch(e){
        if(e?.name==='AbortError')return;
      }
    }

    doc.save(file.name);
    window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMsg('PDF sudah diunduh dan aplikasi email dibuka. Lampirkan PDF tersebut sebelum mengirim.');
  };

  const renderProductTable=(group)=>{
    const unitSubtotal=group.items.reduce((sum,x)=>sum+(x.numericPrice!=null?x.numericPrice*x.qty:0),0);
    return <div className="cart-table-wrap">
      <table className="cart-product-table">
        <thead><tr><th>No.</th><th>Nama Produk</th><th>Qty</th><th>Satuan</th><th>Harga</th><th>Jumlah</th><th></th></tr></thead>
        <tbody>
          {group.items.map((x,i)=><tr key={x.id}>
            <td>{i+1}</td>
            <td><div className="table-product-name">{x.image_url&&<img src={x.image_url} alt={x.title}/>}<span><b>{x.title}</b><small>{x.category}</small></span></div></td>
            <td><div className="qty-control compact"><button onClick={()=>changeQty(x.id,-1)}><Minus size={14}/></button><span>{x.qty}</span><button onClick={()=>changeQty(x.id,1)}><Plus size={14}/></button></div></td>
            <td>Unit</td>
            <td>{x.numericPrice!=null?rupiahNumber(x.numericPrice):x.priceDisplay}</td>
            <td><strong>{x.numericPrice!=null?rupiahNumber(x.numericPrice*x.qty):x.priceDisplay}</strong></td>
            <td><button className="cart-remove icon-only" onClick={()=>remove(x.id)} title="Hapus"><Trash size={17}/></button></td>
          </tr>)}
          <tr className="table-total-row">
            <td colSpan="2">Total</td>
            <td>{group.items.reduce((n,x)=>n+x.qty,0)}</td>
            <td></td><td></td>
            <td>{rupiahNumber(unitSubtotal)}</td><td></td>
          </tr>
        </tbody>
      </table>
    </div>
  };

  return <section className="section cart-page"><div className="container">
    <div className="section-head">
      <div className="eyebrow gold">KERANJANG PESANAN</div>
      <h2>Produk & Jasa Pilihan Anda</h2>
      <p>Gabungkan produk atau jasa dari masing-masing unit bisnis, lalu cetak atau kirim pesanan ke admin.</p>
    </div>

    {cart.length===0 ? <div className="cart-empty"><ShoppingCart size={48}/><h3>Keranjang masih kosong</h3><p>Pilih produk atau jasa dari Accounting, Vape, atau Alat.</p><button className="btn btn-primary" onClick={()=>navigate('home')}>Lihat Unit Bisnis</button></div>
    : <div className="cart-layout">
      <div className="cart-items">
        {grouped.map(group=><div className="cart-group" key={group.unit}>
          <div className="cart-group-title"><span>{unitLabel(group.unit)}</span><b>{group.items.length} item</b></div>
          {(group.unit==='vape'||group.unit==='alat') ? renderProductTable(group) :
            group.items.map(x=><article className="cart-item" key={x.id}>
              <div className="cart-item-placeholder"><ClipboardList/></div>
              <div className="cart-item-copy">
                <small>{x.category||'Jasa'}</small><h3>{x.title}</h3>
                <p>{x.priceDisplay}</p>
                <div className="qty-control"><button onClick={()=>changeQty(x.id,-1)}><Minus size={15}/></button><span>{x.qty}</span><button onClick={()=>changeQty(x.id,1)}><Plus size={15}/></button></div>
              </div>
              <div className="cart-item-right">
                <strong>{x.numericPrice!=null?rupiahNumber(x.numericPrice*x.qty):x.priceDisplay}</strong>
                <button className="cart-remove" onClick={()=>remove(x.id)}><Trash size={17}/> Hapus</button>
              </div>
            </article>)
          }
        </div>)}
        <button className="cart-clear" onClick={clear}>Kosongkan Keranjang</button>
      </div>

      <aside className="cart-summary">
        <h3>Data Pemesan</h3>
        <p className="required-note">Semua data bertanda * wajib diisi sebelum pesanan dapat diproses.</p>
        <label>Nama *<input required value={customer.name} onChange={e=>updateCustomer('name',e.target.value)} placeholder="Nama pemesan"/></label>
        <label>Perusahaan *<input required value={customer.company} onChange={e=>updateCustomer('company',e.target.value)} placeholder="Nama PT / Toko / Instansi"/></label>
        <label>No. WhatsApp *<input required value={customer.phone} onChange={e=>updateCustomer('phone',e.target.value)} placeholder="08xxxxxxxxxx"/></label>
        <label>Email *<input type="email" required value={customer.email||''} onChange={e=>updateCustomer('email',e.target.value)} placeholder="nama@email.com"/></label>
        <label>Alamat *<textarea required rows="3" value={customer.address} onChange={e=>updateCustomer('address',e.target.value)} placeholder="Alamat pengiriman / perusahaan"/></label>
        <label>Catatan<textarea rows="3" value={customer.notes} onChange={e=>updateCustomer('notes',e.target.value)} placeholder="Catatan tambahan (opsional)"/></label>
        <div className="cart-total"><span>Total harga terhitung</span><strong>{rupiahNumber(numericTotal)}</strong>{hasNonNumeric&&<small>Belum termasuk item yang perlu penawaran.</small>}</div>
        <div className="cart-actions">
          <button className="btn btn-primary" disabled={!requiredOk} onClick={downloadPdf}><FileDown size={17}/> Download PDF</button>
          <button className="btn btn-ghost" disabled={!requiredOk} onClick={printPdf}><Printer size={17}/> Print / Save PDF</button>
          <button className="btn btn-gold" disabled={!requiredOk} onClick={sendWhatsApp}><Send size={17}/> Kirim via WhatsApp</button>
          <button className="btn btn-ghost" disabled={!requiredOk} onClick={sendEmail}><Mail size={17}/> Kirim via Email</button>
        </div>
        {!requiredOk&&<div className="cart-required-warning">Lengkapi seluruh Data Pemesan untuk mengaktifkan tombol proses.</div>}
        {msg&&<div className="cart-msg">{msg}</div>}
      </aside>
    </div>}
  </div></section>
}

function AdminPage(){
  const [token,setToken]=useState(()=>sessionStorage.getItem('aip_admin')||'');
  const [password,setPassword]=useState(''); const [items,setItems]=useState([]); const [tab,setTab]=useState('product'); const [msg,setMsg]=useState('');
  const blank={id:null,type:'product',unit:'vape',title:'',category:'Liquid',price:'',stock:'Tersedia',description:'',image_url:'',sort_order:0,active:1,client_name:''};
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
  return <section className="admin-shell"><aside className="admin-side"><BrandMark light compact/><div className="admin-menu"><button className={tab==='product'?'active':''} onClick={()=>{setTab('product');setForm({...blank,type:'product',unit:'vape',category:'Liquid',stock:'Tersedia',priceMode:'show'})}}><Package/>Produk</button><button className={tab==='experience'?'active':''} onClick={()=>{setTab('experience');setForm({...blank,type:'experience',unit:'accounting',category:accountingCategories[0],client_name:''})}}><BriefcaseBusiness/>Experience</button><button className={tab==='testimonial'?'active':''} onClick={()=>{setTab('testimonial');setForm({...blank,type:'testimonial',unit:'accounting',category:accountingCategories[0],client_name:''})}}><Star/>Testimoni</button></div><button className="admin-logout" onClick={logout}><LogOut/>Logout</button></aside><div className="admin-main"><div className="admin-title"><div><div className="eyebrow gold">ADMIN PANEL</div><h1>{tab==='product'?'Produk':tab==='experience'?'Experience':'Testimoni'}</h1></div><div className="admin-count">{visible.length} data</div></div><div className="admin-grid"><form className="admin-form" onSubmit={save}><h2>{form.id?'Edit':'Tambah'} {tab}</h2><label>Unit<select value={form.unit} onChange={e=>setForm({...form,unit:e.target.value,category:tab==='product'?(e.target.value==='vape'?'Liquid':'ATK'):form.category})}>{tab==='product'?<><option value="vape">ada in Vape</option><option value="alat">ada in Alat</option></>:<option value="accounting">ada in Accounting</option>}</select></label>
{tab!=='product'&&<label>Nama Client<input value={form.client_name||''} onChange={e=>setForm({...form,client_name:e.target.value})} placeholder="Contoh: PT Maju Jaya Sejahtera"/></label>}
<label>{tab==='product'?'Nama / Judul':'Nama Project / Jasa'}<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={tab==='product'?'Nama produk':'Contoh: Penyusunan Laporan Keuangan Bulanan'} required/></label>
<div className="form-row">
  <label>Kategori
    {tab==='product'
      ? <select value={form.category || (form.unit==='vape'?'Liquid':'ATK')} onChange={e=>setForm({...form,category:e.target.value})}>{(form.unit==='vape'?['Liquid','Device','Cartridge','Accessories','Bundle']:['ATK','Kertas','Filing','Printing','Pantry','Cleaning','General Supplies']).map(x=><option key={x} value={x}>{x}</option>)}</select>
      : <select value={form.category||accountingCategories[0]} onChange={e=>setForm({...form,category:e.target.value})}>{accountingCategories.map(x=><option key={x} value={x}>{x}</option>)}</select>
    }
  </label>
  {tab==='product'&&<label>Stok<select value={form.stock || 'Tersedia'} onChange={e=>setForm({...form,stock:e.target.value})}>{['Tersedia','Stok Terbatas','Pre-order','By Request','Habis'].map(x=><option key={x} value={x}>{x}</option>)}</select></label>}
</div>{tab==='product'&&<>
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
</>}{tab==='product'&&<label>Status Produk<select value={String(form.active ?? 1)} onChange={e=>setForm({...form,active:Number(e.target.value)})}><option value="1">Aktif — tampil di website</option><option value="0">Nonaktif — sembunyikan dari website</option></select></label>}<label>{tab==='testimonial'?'Isi Testimoni':'Deskripsi Detail'}<textarea rows="5" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder={tab==='testimonial'?'Tuliskan testimoni dari client...':'Jelaskan scope pekerjaan, hasil, dan detail project/jasa...'}/></label>{tab==='product'&&<div className="upload-box"><Upload/><div><b>Upload Foto Produk</b><small>JPG/PNG/WebP, maksimal 5 MB</small></div><input type="file" accept="image/*" onChange={e=>upload(e.target.files?.[0])}/>{form.image_url&&<img src={form.image_url}/>}</div>}<div className="form-actions"><button className="btn btn-primary"><Save size={17}/>{form.id?'Simpan Perubahan':'Simpan'}</button>{form.id&&<button type="button" className="btn btn-ghost" onClick={()=>setForm({...blank,type:tab,unit:tab==='product'?'vape':'accounting',category:tab==='product'?'Liquid':'',stock:tab==='product'?'Tersedia':'',priceMode:tab==='product'?'show':''})}>Batal Edit</button>}</div>{msg&&<div className="admin-msg">{msg}</div>}</form><div className="admin-list"><h2>Data Tersimpan</h2>{visible.length===0&&<div className="empty-state">Belum ada data. Tambahkan dari form di samping.</div>}{visible.map(x=><article className={`admin-item ${Number(x.active)===0?'inactive':''}`} key={x.id}>{x.image_url&&<img src={x.image_url}/>}<div><span>{x.unit} • {x.category||x.type}</span><h3>{x.title}</h3>{x.type!=='product'&&x.client_name&&<div className="admin-client-name">Client: {x.client_name}</div>}<p>{x.type==='product'?(x.price||x.description||'—'):(x.description||'—')} {x.type==='product'&&x.stock?` • ${x.stock}`:''}</p>{x.type==='product'&&<small className={`status-pill ${Number(x.active)===0?'off':'on'}`}>{Number(x.active)===0?<><EyeOff size={13}/> Nonaktif</>:<><Eye size={13}/> Aktif</>}</small>}</div><div className="item-actions"><button title="Edit" onClick={()=>edit(x)}><Pencil/></button><button title="Hapus" className="danger" onClick={()=>del(x)}><Trash2/></button></div></article>)}</div></div></div></section>
}

function App() {
  const [page,setPage] = useState(()=>pathToPage(window.location.pathname));
  const [cart,setCart] = useState(()=>{try{return JSON.parse(localStorage.getItem('aip_cart')||'[]')}catch{return []}});

  React.useEffect(()=>{localStorage.setItem('aip_cart',JSON.stringify(cart))},[cart]);
  React.useEffect(()=>{
    const pop=()=>setPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate',pop);
    return()=>window.removeEventListener('popstate',pop);
  },[]);

  const navigate=(target)=>{
    setPage(target);
    const path=pageToPath(target);
    if(window.location.pathname!==path) history.pushState({},'',path);
    window.scrollTo({top:0,behavior:'smooth'});
  };

  const addCartItem=(item)=>{
    setCart(prev=>{
      const found=prev.find(x=>x.id===item.id);
      if(found)return prev.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x);
      return [...prev,{...item,qty:1}];
    });
  };

  const addProduct=(p,unit)=>{
    const title=p.title||p.name||'Produk';
    addCartItem({
      id:`product-${unit}-${p.id||title}`,
      sourceId:p.id||null,
      kind:'product',
      unit,
      title,
      category:p.category||'Produk',
      price:p.price||'Info Produk',
      priceDisplay:formatPrice(p.price),
      numericPrice:numericPrice(p.price),
      image_url:p.image_url||'',
      description:p.description||''
    });
  };

  const addService=(s)=>{
    addCartItem({
      id:`service-accounting-${s.category}`,
      sourceId:null,
      kind:'service',
      unit:'accounting',
      title:s.title,
      category:s.category,
      price:'Minta Penawaran',
      priceDisplay:'Minta Penawaran',
      numericPrice:null,
      image_url:'',
      description:s.description||''
    });
  };

  const cartCount=cart.reduce((n,x)=>n+x.qty,0);
  const publicPage=page!=='admin';

  return <div className="app">
    {publicPage&&<Header page={page} navigate={navigate} cartCount={cartCount}/>}
    <main>
      {page==='home'&&<Home navigate={navigate}/>}
      {page==='accounting'&&<AccountingPage onAddService={addService}/>}
      {page==='vape'&&<VapePage onAddCart={addProduct}/>}
      {page==='alat'&&<AlatPage onAddCart={addProduct}/>}
      {page==='cart'&&<CartPage cart={cart} setCart={setCart} navigate={navigate}/>}
      {page==='admin'&&<AdminPage/>}
    </main>
    {publicPage&&<Footer navigate={navigate}/>}
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
