# ada in Project V4 — Binding Fix

Perbaikan:
- D1 `DB` sekarang menunjuk eksplisit ke `adain-website-db`.
- R2 `MEDIA` sekarang menunjuk eksplisit ke `adain-website-media`.
- Route `/media/*` diperbaiki agar foto dari R2 benar-benar bisa ditampilkan.
- Tidak lagi mengandalkan inherited binding.

Upload/replace isi folder ini ke folder GitHub `adain-website-v1`, lalu Commit.
Cloudflare build/deploy command tetap sama.

Setelah deploy berhasil, tambahkan secret `ADMIN_PASSWORD` di Cloudflare Worker sebelum login Admin.
