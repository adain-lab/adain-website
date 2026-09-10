# ada in Project V4.6 — CRUD + Visitor Counter

Update:
- Produk di Admin dapat Edit.
- Produk dapat Hapus dengan konfirmasi nama produk.
- Saat produk dihapus, foto R2 terkait juga ikut dibersihkan.
- Status Produk: Aktif / Nonaktif.
- Produk Nonaktif tetap ada di Admin tetapi tidak tampil di website publik.
- Tombol Simpan berubah menjadi “Simpan Perubahan” saat edit.
- Homepage menampilkan:
  - Pengunjung Hari Ini
  - Total Kunjungan Unik Harian
- Counter memakai ID anonim di browser dan hash per hari; tidak menyimpan nama/email/IP pengguna.

Cara update:
1. Replace isi folder GitHub `adain-website-v1`.
2. Commit.
3. Tunggu Cloudflare deploy otomatis.
4. Ctrl+F5.
5. Tidak perlu membuat tabel D1 manual; Worker melakukan migrasi otomatis saat API dipanggil.
