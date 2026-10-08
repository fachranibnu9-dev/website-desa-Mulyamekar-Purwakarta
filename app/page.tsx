import Link from "next/link";
import { ArrowRight, CalendarDays, Images, MapPin } from "lucide-react";
import SearchActivities from "@/components/SearchActivities";
import { getActivities } from "@/lib/public-data";

export default async function Home() {
  const activities = await getActivities();
  return <main>
    <section className="bg-emerald-800 text-white">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div><div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Website Informasi Desa Mulyamekar</div><h1 className="text-4xl font-black tracking-tight md:text-6xl">Informasi Desa, dekat dengan masyarakat.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">Temukan berita, kegiatan, agenda, dokumentasi, potensi, dan informasi Desa Mulyamekar dalam satu website.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/berita" className="btn bg-white text-emerald-800">Lihat Kegiatan <ArrowRight size={17}/></Link><Link href="/profil" className="btn border border-white/30 text-white">Profil Desa</Link></div></div>
        <div className="rounded-3xl bg-white/10 p-5"><div className="mb-3 font-bold">Cari informasi desa</div><SearchActivities/><div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm"><div className="rounded-2xl bg-white/10 p-4"><CalendarDays className="mx-auto mb-2"/><b>Agenda</b></div><div className="rounded-2xl bg-white/10 p-4"><Images className="mx-auto mb-2"/><b>Galeri</b></div><div className="rounded-2xl bg-white/10 p-4"><MapPin className="mx-auto mb-2"/><b>Desa</b></div></div></div>
      </div>
    </section>
    <section className="container-page py-14">
      <div className="flex items-end justify-between gap-4"><div><div className="text-sm font-black uppercase tracking-wider text-emerald-700">Terbaru</div><h2 className="mt-1 text-3xl font-black">Kegiatan Desa</h2></div><Link href="/berita" className="font-bold text-emerald-700">Lihat semua →</Link></div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{activities.map(a=><Link href={`/berita/${a.slug}`} key={a.slug} className="card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"><img src={a.image} alt="" className="h-40 w-full object-cover"/><div className="p-5"><div className="text-xs font-bold text-emerald-700">{a.category}</div><h3 className="mt-2 font-black leading-6">{a.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{a.excerpt}</p><div className="mt-4 text-xs text-slate-400">{a.date}</div></div></Link>)}</div>
    </section>
  </main>;
}