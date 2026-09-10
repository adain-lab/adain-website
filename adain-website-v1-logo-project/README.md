# ada in Website V1

Website company profile untuk master brand **ada in** dengan 3 unit bisnis:

- **ada in Accounting** — Akuntansi • Keuangan • Pajak
- **ada in Vape** — Retail • Vape Store
- **ada in Alat** — ATK • Office Supplies • General Supplies

## Jalankan di komputer

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

Output build berada di folder `dist`.

## Deploy ke Cloudflare Workers (Static Assets)

Project ini memakai Cloudflare Workers Static Assets melalui `wrangler.jsonc`.

### Build command di Cloudflare

```bash
cd adain-website-v1 && npm install && npm run build
```

### Deploy command di Cloudflare

```bash
cd adain-website-v1 && npx wrangler deploy
```

`wrangler.jsonc` akan mengambil hasil build dari folder `dist` dan mempublikasikannya sebagai static website.

## Yang perlu diganti sebelum go-live

Di `src/main.jsx`:

- `WA_URL` → ganti nomor WhatsApp asli.
- `TOKOPEDIA_URL` → ganti URL toko Tokopedia.
- `hello@adain.id` → ganti email resmi.
- nomor telepon dan alamat → ganti data resmi.

## Catatan

Logo di project masih dibuat sebagai SVG sederhana agar ringan dan langsung bisa jalan. Nanti dapat diganti dengan file logo final PNG/SVG tanpa mengubah struktur website.
