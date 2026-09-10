# ada in Project V4.6.1 — D1 Migration Fix

Perbaikan:
- Binding DB/R2 tetap sama.
- Migrasi kolom `active` dibuat lebih aman untuk database lama.
- Menghapus ketergantungan pada `PRAGMA table_info()` yang bisa bermasalah pada runtime tertentu.
- Jika kolom `active` sudah ada, error duplicate column otomatis diabaikan.
- Tabel visitor tetap dibuat otomatis.
- Endpoint diagnosis baru: `/api/db-status`.

Cara update:
1. Replace isi folder GitHub `adain-website-v1`.
2. Commit.
3. Tunggu Cloudflare deploy.
4. Buka `/api/db-status`.
5. Jika `ok:true`, Admin sudah bisa simpan produk.
