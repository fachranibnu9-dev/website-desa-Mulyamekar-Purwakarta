import { notFound } from "next/navigation";
import Link from "next/link";
import { activities } from "@/lib/data";

export function generateStaticParams(){return activities.map(a=>({slug:a.slug}));}
export default async function Detail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const item=activities.find(a=>a.slug===slug); if(!item) notFound();
  return <main className="container-page py-14"><Link href="/berita" className="font-bold text-emerald-700">← Kembali ke kegiatan</Link><article className="mx-auto mt-6 max-w-4xl"><img src={item.image} alt="" className="h-72 w-full rounded-3xl object-cover md:h-96"/><div className="mt-7"><div className="text-sm font-bold text-emerald-700">{item.category} · {item.date}</div><h1 className="mt-2 text-4xl font-black leading-tight">{item.title}</h1><p className="mt-6 text-lg leading-8 text-slate-600">{item.body}</p></div></article></main>;
}