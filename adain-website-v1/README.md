# ada in Project Website V3

Website V3 dengan 3 halaman unit bisnis:

- **ada in Accounting** — layanan + contoh Experience/Project
- **ada in Vape** — katalog contoh + filter kategori + WhatsApp
- **ada in Alat** — katalog ATK/Office Supplies + filter + Request Quotation

## Kontak
- WhatsApp: 0818 777 802
- Email: projectadain@gmail.com

## Build
```bash
npm install
npm run build
```

## Cloudflare
Build command:
```bash
cd adain-website-v1 && npm install && npm run build
```

Deploy command:
```bash
cd adain-website-v1 && npx wrangler deploy
```

> Saat upload ke GitHub, isi folder V3 ini tetap ditempatkan pada folder repo `adain-website-v1` agar setting Cloudflare yang sekarang tidak perlu diubah.

## Tahap berikutnya
V4 dapat ditambahkan admin panel + database supaya produk, harga, stok, foto, experience, dan testimoni bisa dikelola tanpa edit GitHub.
