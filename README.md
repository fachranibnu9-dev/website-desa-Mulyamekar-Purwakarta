# Website Desa Mulyamekar — Publik + Admin

Versi ini mempertahankan website publik sederhana dan menambahkan `/admin` untuk pengelola. Admin dapat login, menambah/mengubah/menghapus kegiatan dan agenda, serta upload foto.

## Supabase
Supabase dipakai hanya sebagai backend di belakang website agar login dan data admin tersimpan permanen. Warga tidak perlu akun.

1. Buat project gratis di https://supabase.com/
2. Jalankan `supabase-schema.sql` di SQL Editor.
3. Authentication > Users > buat satu user admin email/password.
4. Storage > buat bucket `gallery` dan aktifkan Public bucket.
5. Ambil Project URL dan anon/publishable key.
6. Di Vercel tambahkan environment variables `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Lokal
`npm install` lalu `npm run dev`. Admin: `/admin`.

Jangan pernah upload `.env.local` atau password admin ke GitHub.
