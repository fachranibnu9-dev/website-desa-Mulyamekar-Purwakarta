 "use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { activities } from "@/lib/data";

export default function SearchActivities() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return activities.filter(a => `${a.title} ${a.category} ${a.excerpt}`.toLowerCase().includes(s));
  }, [q]);
  return <div className="relative">
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <Search className="ml-2 text-slate-400" size={21}/>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari kegiatan, berita, atau informasi..." className="min-w-0 flex-1 bg-transparent p-2 outline-none"/>
      {q && <button onClick={()=>setQ("")} className="px-3 text-sm font-bold text-slate-500">Hapus</button>}
    </div>
    {q && <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {results.length ? results.map(a=><Link key={a.slug} href={`/berita/${a.slug}`} className="block border-b border-slate-100 p-4 last:border-0 hover:bg-slate-50"><div className="text-xs font-bold text-emerald-700">{a.category} · {a.date}</div><div className="mt-1 font-bold">{a.title}</div></Link>) : <div className="p-5 text-sm text-slate-500">Belum ada informasi yang cocok dengan pencarian.</div>}
    </div>}
  </div>;
}