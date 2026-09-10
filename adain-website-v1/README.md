# ada in Project V4.1 — Login Fix

Perbaikan:
- Password dari Cloudflare Secret dan input login dinormalisasi (spasi awal/akhir diabaikan).
- Password tidak lagi dikirim kembali sebagai token sesi.
- Admin menggunakan session token HMAC 12 jam.
- Endpoint diagnosis aman `/api/admin-status` hanya menunjukkan apakah Secret terbaca dan panjang karakter, tanpa menampilkan password.
- D1 dan R2 binding tetap sama.

Cara update:
1. Replace isi folder GitHub `adain-website-v1` dengan isi folder ini.
2. Commit.
3. Tunggu Cloudflare deploy otomatis selesai.
4. Refresh website dengan Ctrl+F5.
5. Login Admin menggunakan password yang tersimpan di `ADMIN_PASSWORD`.

Jika masih gagal, buka:
`https://adain-website.projectadain.workers.dev/api/admin-status`
dan cek `secretConfigured` harus `true`.
