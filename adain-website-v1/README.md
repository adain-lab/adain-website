# ada in Project V5.1 — One-Time Cart + Order History + Customer Database

Update:
1. Keranjang tidak lagi disimpan di localStorage.
   - Saat website direload, keranjang otomatis kosong.
   - Cocok untuk pengunjung tanpa login / one-time order.
2. Data pemesan pada checkout juga hanya berlaku pada sesi halaman saat itu.
3. Setiap aksi proses (Download PDF, Print, WhatsApp, Email) otomatis mencatat pesanan ke D1.
4. Checkout ID unik mencegah satu pesanan tercatat ganda saat pengguna menekan beberapa tombol.
5. Admin memiliki menu baru:
   - Pesanan: histori semua pesanan, detail item, total, status.
   - Pemesan: database nama, perusahaan, WA, email, alamat, jumlah pesanan, tanggal terakhir.
6. Status pesanan:
   - Baru
   - Diproses
   - Tidak Diproses
7. Customer dideduplikasi berdasarkan kombinasi No. WhatsApp + Email.
8. Semua tabel database dibuat otomatis, tidak perlu SQL manual.
