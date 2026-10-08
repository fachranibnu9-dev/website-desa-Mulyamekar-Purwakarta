import Link from "next/link";

export default function Footer() {
  return <footer className="mt-16 bg-slate-950 text-slate-300">
    <div className="container-page grid gap-8 py-12 md:grid-cols-3">
      <div><div className="text-lg font-black text-white">Desa Mulyamekar</div><p className="mt-2 text-sm leading-6">Website informasi dan dokumentasi kegiatan Desa Mulyamekar, Kecamatan Babakancikao, Kabupaten Purwakarta, Jawa Barat.</p></div>
      <div><div className="font-bold text-white">Informasi</div><div className="mt-3 grid gap-2 text-sm"><Link href="/profil">Profil Desa</Link><Link href="/pemerintahan">Pemerintahan</Link><Link href="/berita">Kegiatan & Berita</Link><Link href="/galeri">Galeri</Link></div></div>
      <div><div className="font-bold text-white">Kontak Desa</div><p className="mt-3 text-sm leading-6">Desa Mulyamekar<br/>Kecamatan Babakancikao<br/>Kabupaten Purwakarta, Jawa Barat</p></div>
    </div>
    <div className="border-t border-slate-800 py-4 text-center text-xs">© 2026 Desa Mulyamekar. Website informasi masyarakat.</div>
  </footer>;
}