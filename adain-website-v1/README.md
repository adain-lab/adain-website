# ada in Project V4.9 — Cart + PDF Order

Update utama:
1. Menu Admin dihapus dari navbar publik dan footer publik.
2. Admin tetap dapat diakses langsung melalui `/admin`.
3. Pengunjung dapat memasukkan:
   - Jasa Accounting
   - Produk ada in Vape
   - Produk ada in Alat
   ke satu keranjang.
4. Keranjang dikelompokkan per unit bisnis.
5. Qty dapat tambah/kurang dan item dapat dihapus.
6. Pengunjung dapat mengisi Nama, Perusahaan, No. WA, Alamat, dan Catatan.
7. Pesanan dapat:
   - Download PDF
   - Print / Save PDF
   - Share PDF melalui Web Share API bila perangkat mendukung
   - Fallback: PDF didownload dan WhatsApp admin dibuka dengan ringkasan pesanan.
8. Harga numerik dijumlahkan; item "Hubungi Kami/Minta Penawaran" ditandai untuk konfirmasi admin.

Catatan WhatsApp:
Browser desktop tidak mengizinkan website menempelkan file PDF langsung ke chat WhatsApp secara otomatis.
Pada perangkat yang mendukung Web Share API, PDF dapat dibagikan lewat menu Share dan pengguna dapat memilih WhatsApp.
Jika tidak didukung, sistem otomatis mengunduh PDF lalu membuka chat admin agar pengguna tinggal melampirkan file tersebut.

Cara update:
Replace isi folder GitHub `adain-website-v1`, commit, tunggu Cloudflare deploy, lalu Ctrl+F5.
