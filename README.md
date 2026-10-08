# Website Desa Mulyamekar

Website informasi publik Desa Mulyamekar, Kecamatan Babakancikao, Kabupaten Purwakarta, Jawa Barat.

## Konsep
Website ini sengaja dibuat sederhana untuk masyarakat:
- Beranda
- Pencarian informasi langsung di website
- Kegiatan & berita
- Detail kegiatan
- Agenda
- Galeri
- Profil desa
- Pemerintahan
- Potensi desa
- Transparansi
- Kontak

Tidak menggunakan Supabase, login warga, database, WhatsApp API, atau aplikasi eksternal.

## Menjalankan
Pastikan Node.js terpasang.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk produksi:
```bash
npm run build
npm start
```

## Mengubah isi website
Data kegiatan contoh berada di:
`lib/data.ts`

Ganti judul, tanggal, kategori, deskripsi, dan gambar sesuai kegiatan Desa Mulyamekar.
Gambar contoh berada di:
`public/images/`

Untuk logo resmi, ganti bagian logo `DM` pada:
`components/public/Navbar.tsx`
dengan file logo resmi desa/kabupaten.
