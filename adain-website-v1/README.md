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

## Deploy ke Cloudflare Pages

1. Push semua file project ini ke repository GitHub `adain-lab/adain-website`.
2. Di Cloudflare buka **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pilih repository `adain-lab/adain-website`.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Build output directory: `dist`.
7. Klik **Save and Deploy**.

## Yang perlu diganti sebelum go-live

Di `src/main.jsx`:

- `WA_URL` → ganti nomor WhatsApp asli.
- `TOKOPEDIA_URL` → ganti URL toko Tokopedia.
- `hello@adain.id` → ganti email resmi.
- nomor telepon dan alamat → ganti data resmi.

## Catatan

Logo di project masih dibuat sebagai SVG sederhana agar ringan dan langsung bisa jalan. Nanti dapat diganti dengan file logo final PNG/SVG tanpa mengubah struktur website.
