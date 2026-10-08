 "use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { activities } from "@/lib/data";

export default function BeritaPage() {
  const [q,setQ]=useState("");
  const filtered=useMemo(()=>activities.filter(a=>`${a.title} ${a.category} ${a.excerpt}`.toLowerCase().includes(q.toLowerCase())),[q]);
  return <main className="container-page py-14"><div className="max-w-3xl"><div className="text-sm font-black uppercase tracking-wider text-emerald-700">Kegiatan & Berita</div><h1 className="mt-2 text-4xl font-black">Informasi kegiatan Desa Mulyamekar</h1><p className="mt-3 text-slate-500">Gunakan pencarian untuk menemukan dokumentasi kegiatan yang ingin Anda lihat.</p></div><div className="mt-7 flex items-center gap-3 rounded-2xl border bg-white p-3"><Search className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari kegiatan atau berita..." className="flex-1 outline-none"/></div><div className="mt-8 grid gap-6 md:grid-cols-2">{filtered.map(a=><Link href={`/berita/${a.slug}`} key={a.slug} className="card overflow-hidden md:flex"><img src={a.image} alt="" className="h-52 w-full object-cover md:h-auto md:w-48"/><div className="p-5"><div className="text-xs font-bold text-emerald-700">{a.category} · {a.date}</div><h2 className="mt-2 text-xl font-black">{a.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{a.excerpt}</p></div></Link>)}</div>{!filtered.length&&<div className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-500">Informasi tidak ditemukan.</div>}</main>;
}