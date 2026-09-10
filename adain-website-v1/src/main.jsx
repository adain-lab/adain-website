import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ChevronRight, Calculator, Store, BriefcaseBusiness,
  ShieldCheck, Headphones, Boxes, TrendingUp, MessageCircle,
  Mail, Phone, MapPin, ArrowRight
} from 'lucide-react';
import './styles.css';

const WA_URL = 'https://wa.me/62818777802';
const TOKOPEDIA_URL = '#';

function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark ${compact ? 'compact' : ''}`} aria-label="ada in">
      <svg viewBox="0 0 180 82" role="img" aria-label="AIP ada in">
        <path d="M12 54 L40 10 L68 54" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M87 10 L87 54" fill="none" stroke="#c99016" strokeWidth="6" strokeLinecap="round"/>
        <path d="M105 14 H145 Q160 14 160 28 Q160 42 145 42 H113 M113 48 V54" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="10" y="77" fontSize="20" fontFamily="Arial, sans-serif" fill="currentColor">ada in</text>
      </svg>
    </div>
  );
}

const units = [
  {
    id: 'accounting',
    title: 'ada in Accounting',
    kicker: 'Akuntansi • Keuangan • Pajak',
    desc: 'Solusi profesional untuk pembukuan, laporan keuangan, perpajakan, payroll, dan pendampingan administrasi bisnis.',
    cta: 'Lihat Layanan',
    icon: Calculator,
    href: '#accounting'
  },
  {
    id: 'vape',
    title: 'ada in Vape',
    kicker: 'Retail • Vape Store',
    desc: 'Retail online untuk liquid, device, cartridge, dan aksesoris vape dari berbagai brand pilihan.',
    cta: 'Belanja Sekarang',
    icon: Store,
    href: TOKOPEDIA_URL
  },
  {
    id: 'alat',
    title: 'ada in Alat',
    kicker: 'ATK • Office Supplies • General Supplies',
    desc: 'Kebutuhan kantor dan operasional bisnis: ATK, kertas, filing, pantry, kebersihan, serta general supplies.',
    cta: 'Lihat Produk',
    icon: BriefcaseBusiness,
    href: '#alat'
  }
];

function App() {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="logo-link" href="#home" onClick={(e)=>{e.preventDefault();go('#home')}}>
            <BrandMark compact />
          </a>
          <div className="desktop-nav">
            <button onClick={()=>go('#home')}>Home</button>
            <button onClick={()=>go('#units')}>Business Units</button>
            <button onClick={()=>go('#about')}>About Us</button>
            <button onClick={()=>go('#contact')}>Contact</button>
          </div>
          <a className="btn btn-primary desktop-cta" href={WA_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={18}/> Hubungi Kami
          </a>
          <button className="menu-btn" onClick={()=>setOpen(v=>!v)} aria-label="Menu">
            {open ? <X/> : <Menu/>}
          </button>
        </nav>
        {open && (
          <div className="mobile-menu">
            <button onClick={()=>go('#home')}>Home</button>
            <button onClick={()=>go('#units')}>Business Units</button>
            <button onClick={()=>go('#about')}>About Us</button>
            <button onClick={()=>go('#contact')}>Contact</button>
            <a href={WA_URL} target="_blank" rel="noreferrer">Hubungi Kami</a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">ADA IN PROJECT</div>
              <h1>Satu Brand,<br/><span>Berbagai Solusi</span></h1>
              <p>ada in Project adalah ekosistem bisnis yang hadir untuk memberikan solusi terbaik di berbagai kebutuhan Anda — dari keuangan, retail hingga kebutuhan kantor.</p>
              <div className="trust-line">TERPERCAYA • PROFESIONAL • BERKEMBANG BERSAMA</div>
              <div className="hero-actions">
                <button className="btn btn-gold" onClick={()=>go('#units')}>Lihat Unit Bisnis <ArrowRight size={18}/></button>
                <a className="btn btn-ghost" href={WA_URL} target="_blank" rel="noreferrer">Konsultasi</a>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-card big">
                <BrandMark />
                <div className="hero-tag">MORE THAN BUSINESS<br/>A BETTER TOMORROW</div>
              </div>
              <div className="hero-quote">Solusi untuk<br/>langkah lebih baik.</div>
            </div>
          </div>
        </section>

        <section id="units" className="section units-section">
          <div className="container">
            <div className="section-head center">
              <div className="eyebrow gold">UNIT BISNIS KAMI</div>
              <h2>Temukan Solusi yang Anda Butuhkan</h2>
              <p>Tiga unit bisnis dengan identitas berbeda, tetap dalam satu keluarga <strong>ada in Project</strong>.</p>
            </div>
            <div className="unit-grid">
              {units.map(({id,title,kicker,desc,cta,icon:Icon,href}) => (
                <article className={`unit-card ${id}`} key={id}>
                  <div className="unit-icon"><Icon size={34}/></div>
                  <div className="unit-label">AIP / ada in</div>
                  <h3>{title}</h3>
                  <div className="unit-kicker">{kicker}</div>
                  <p>{desc}</p>
                  {href.startsWith('#') ? (
                    <button className="card-cta" onClick={()=>go(href)}>{cta}<ChevronRight size={18}/></button>
                  ) : (
                    <a className="card-cta" href={href}>{cta}<ChevronRight size={18}/></a>
                  )}
                </article>
              ))}
            </div>

            <div className="benefit-row">
              <div><ShieldCheck/><span><b>Terpercaya</b><small>Produk & layanan terpilih</small></span></div>
              <div><Headphones/><span><b>Dukungan</b><small>Responsif dan profesional</small></span></div>
              <div><Boxes/><span><b>Beragam Solusi</b><small>Satu ekosistem kebutuhan</small></span></div>
              <div><TrendingUp/><span><b>Berkembang</b><small>Bersama pelanggan</small></span></div>
            </div>
          </div>
        </section>

        <section id="accounting" className="section detail-section">
          <div className="container detail-grid">
            <div>
              <div className="eyebrow gold">ADA IN ACCOUNTING</div>
              <h2>Keuangan Lebih Tertib, Bisnis Lebih Fokus</h2>
              <p>Dirancang untuk UMKM, startup, dan perusahaan yang membutuhkan dukungan akuntansi, keuangan, pajak, payroll, serta administrasi yang rapi dan dapat dipertanggungjawabkan.</p>
              <div className="tag-list"><span>Bookkeeping</span><span>Financial Report</span><span>Tax</span><span>Payroll</span><span>Consulting</span></div>
              <a className="btn btn-primary" href={WA_URL} target="_blank" rel="noreferrer">Konsultasi Accounting</a>
            </div>
            <div className="feature-panel accounting-panel">
              <Calculator size={70}/>
              <h3>Akuntansi • Keuangan • Pajak</h3>
              <p>Rapi, akurat, dan mudah dipahami.</p>
            </div>
          </div>
        </section>

        <section id="vape" className="section detail-section dark-section">
          <div className="container detail-grid reverse-mobile">
            <div className="feature-panel vape-panel">
              <Store size={70}/>
              <h3>Retail • Vape Store</h3>
              <p>Pilihan produk untuk kebutuhan retail online.</p>
            </div>
            <div>
              <div className="eyebrow gold">ADA IN VAPE</div>
              <h2>Retail Online dalam Satu Brand</h2>
              <p>Menjadi kanal retail online untuk liquid, device, cartridge, dan aksesori vape. Halaman ini dapat diarahkan ke marketplace atau katalog produk sesuai kebutuhan.</p>
              <div className="tag-list"><span>Liquid</span><span>Device</span><span>Cartridge</span><span>Accessories</span></div>
              <a className="btn btn-gold" href={TOKOPEDIA_URL}>Buka Marketplace</a>
            </div>
          </div>
        </section>

        <section id="alat" className="section detail-section">
          <div className="container detail-grid">
            <div>
              <div className="eyebrow gold">ADA IN ALAT</div>
              <h2>Kebutuhan Kantor, Lebih Praktis</h2>
              <p>Unit pengadaan untuk ATK, perlengkapan kantor, kebutuhan pantry, kebersihan, filing, printing, dan general supplies untuk kebutuhan operasional harian perusahaan.</p>
              <div className="tag-list"><span>ATK</span><span>Office Supplies</span><span>Pantry</span><span>Cleaning</span><span>General Supplies</span></div>
              <a className="btn btn-primary" href={WA_URL} target="_blank" rel="noreferrer">Minta Penawaran</a>
            </div>
            <div className="feature-panel alat-panel">
              <BriefcaseBusiness size={70}/>
              <h3>ATK • Office Supplies</h3>
              <p>Untuk kebutuhan kantor dan operasional.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div>
              <div className="eyebrow gold">TENTANG ADA IN PROJECT</div>
              <h2>Lebih dari Sekadar Bisnis</h2>
              <p><strong>ada in Project</strong> hadir sebagai ekosistem bisnis yang menghubungkan kebutuhan profesional dan gaya hidup dalam satu identitas. Kami tumbuh melalui integritas, pelayanan, dan solusi yang relevan.</p>
            </div>
            <blockquote>“Karena setiap kebutuhan, selalu ada solusinya di ada in Project.”</blockquote>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <div className="eyebrow gold">HUBUNGI KAMI</div>
              <h2>Ada yang Bisa Kami Bantu?</h2>
              <p>Hubungi tim ada in untuk konsultasi layanan, permintaan penawaran, atau informasi mengenai unit bisnis kami.</p>
              <div className="contact-list">
                <a href={WA_URL} target="_blank" rel="noreferrer"><Phone size={18}/> 0818 777 802</a>
                <a href="mailto:projectadain@gmail.com"><Mail size={18}/> projectadain@gmail.com</a>
                <span><MapPin size={18}/> Indonesia</span>
              </div>
            </div>
            <div className="contact-card">
              <h3>Mulai dari sini</h3>
              <p>Pilih kebutuhan Anda dan tim kami akan mengarahkan ke unit bisnis yang tepat.</p>
              <a className="btn btn-gold full" href={WA_URL} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><BrandMark compact/><p>ada in Project • One Brand. Multiple Solutions.</p></div>
          <div className="footer-links">
            <button onClick={()=>go('#home')}>Home</button>
            <button onClick={()=>go('#units')}>Business Units</button>
            <button onClick={()=>go('#about')}>About Us</button>
            <button onClick={()=>go('#contact')}>Contact</button>
          </div>
          <div className="socials"><span className="social-text">IG</span><span className="social-text">in</span></div>
        </div>
        <div className="container copyright">© 2026 ada in Project. All rights reserved.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
