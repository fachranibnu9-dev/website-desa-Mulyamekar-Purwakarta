import Link from "next/link";
import { Search } from "lucide-react";

const links = [
  ["Beranda", "/"],
  ["Profil", "/profil"],
  ["Pemerintahan", "/pemerintahan"],
  ["Kegiatan", "/berita"],
  ["Agenda", "/agenda"],
  ["Galeri", "/galeri"],
  ["Potensi", "/potensi"],
  ["Transparansi", "/transparansi"],
  ["Kontak", "/kontak"]
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-lg font-black text-white">DM</div>
          <div>
            <div className="font-black leading-tight text-slate-900">Desa Mulyamekar</div>
            <div className="text-xs text-slate-500">Babakancikao · Purwakarta</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">{label}</Link>)}
        </nav>
        <Link href="/berita" className="btn bg-emerald-700 text-sm text-white hover:bg-emerald-800"><Search size={17}/>Cari Informasi</Link>
      </div>
      <div className="overflow-x-auto border-t border-slate-100 lg:hidden">
        <nav className="container-page flex min-w-max gap-1 py-2">
          {links.map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600">{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}