'use client'

import { FormEvent, useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase/client'

type Activity = { id:string; title:string; slug:string; date:string; category:string; excerpt:string; body:string; image:string }
type Agenda = { id:string; date:string; title:string; place:string }

export default function AdminDashboard() {
  const [ready,setReady]=useState(false), [email,setEmail]=useState('')
  const [activities,setActivities]=useState<Activity[]>([]), [agenda,setAgenda]=useState<Agenda[]>([])
  const [title,setTitle]=useState(''), [date,setDate]=useState(''), [category,setCategory]=useState('Kegiatan Desa')
  const [body,setBody]=useState(''), [image,setImage]=useState('')
  const [agendaTitle,setAgendaTitle]=useState(''), [agendaDate,setAgendaDate]=useState(''), [place,setPlace]=useState('')
  const [message,setMessage]=useState('')

  async function load() {
    const supabase=getSupabase()
    const {data:userData}=await supabase.auth.getUser()
    if(!userData.user){window.location.href='/admin';return}
    setEmail(userData.user.email||'')
    const a=await supabase.from('activities').select('*').order('created_at',{ascending:false})
    const g=await supabase.from('agenda').select('*').order('created_at',{ascending:false})
    setActivities((a.data||[]) as Activity[]); setAgenda((g.data||[]) as Agenda[])
    if(a.error) setMessage(a.error.message)
    setReady(true)
  }
  useEffect(()=>{load().catch(e=>setMessage(e.message))},[])

  async function addActivity(e:FormEvent){
    e.preventDefault(); setMessage('')
    const supabase=getSupabase()
    const slug=title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-')+'-'+Date.now()
    const {error}=await supabase.from('activities').insert({title,slug,date,category,excerpt:body.slice(0,160),body,image})
    if(error) setMessage(error.message)
    else {setTitle('');setDate('');setBody('');setImage('');setMessage('Kegiatan berhasil ditambahkan.');load()}
  }
  async function addAgenda(e:FormEvent){
    e.preventDefault(); const {error}=await getSupabase().from('agenda').insert({title:agendaTitle,date:agendaDate,place})
    if(error) setMessage(error.message)
    else {setAgendaTitle('');setAgendaDate('');setPlace('');setMessage('Agenda berhasil ditambahkan.');load()}
  }
  async function removeActivity(id:string){if(!confirm('Hapus kegiatan ini?'))return;const {error}=await getSupabase().from('activities').delete().eq('id',id);setMessage(error?error.message:'Kegiatan dihapus.');load()}
  async function removeAgenda(id:string){if(!confirm('Hapus agenda ini?'))return;const {error}=await getSupabase().from('agenda').delete().eq('id',id);setMessage(error?error.message:'Agenda dihapus.');load()}
  async function logout(){await getSupabase().auth.signOut();window.location.href='/admin'}

  if(!ready)return <main className="min-h-screen grid place-items-center">Memuat Admin...</main>
  return <main className="min-h-screen bg-slate-50">
    <header className="bg-white border-b sticky top-0 z-10"><div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
      <div><p className="font-bold text-slate-900">Admin Desa Mulyamekar</p><p className="text-xs text-slate-500">{email}</p></div>
      <button onClick={logout} className="rounded-lg border px-4 py-2 text-sm">Keluar</button>
    </div></header>
    <div className="max-w-7xl mx-auto p-5 space-y-6">
      {message&&<div className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 p-3">{message}</div>}
      <section className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={addActivity} className="bg-white rounded-2xl border p-6 space-y-4">
          <h2 className="text-xl font-bold">Tambah Kegiatan</h2>
          <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul kegiatan" className="w-full border rounded-xl p-3"/>
          <div className="grid grid-cols-2 gap-3"><input required value={date} onChange={e=>setDate(e.target.value)} placeholder="Tanggal" className="w-full border rounded-xl p-3"/><input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Kategori" className="w-full border rounded-xl p-3"/></div>
          <input value={image} onChange={e=>setImage(e.target.value)} placeholder="URL foto (opsional)" className="w-full border rounded-xl p-3"/>
          <textarea required value={body} onChange={e=>setBody(e.target.value)} placeholder="Isi kegiatan" rows={5} className="w-full border rounded-xl p-3"/>
          <button className="bg-emerald-700 text-white rounded-xl px-5 py-3 font-semibold">Simpan Kegiatan</button>
        </form>
        <form onSubmit={addAgenda} className="bg-white rounded-2xl border p-6 space-y-4">
          <h2 className="text-xl font-bold">Tambah Agenda</h2>
          <input required value={agendaTitle} onChange={e=>setAgendaTitle(e.target.value)} placeholder="Nama agenda" className="w-full border rounded-xl p-3"/>
          <input required value={agendaDate} onChange={e=>setAgendaDate(e.target.value)} placeholder="Tanggal / waktu" className="w-full border rounded-xl p-3"/>
          <input value={place} onChange={e=>setPlace(e.target.value)} placeholder="Lokasi" className="w-full border rounded-xl p-3"/>
          <button className="bg-emerald-700 text-white rounded-xl px-5 py-3 font-semibold">Simpan Agenda</button>
        </form>
      </section>
      <section className="bg-white rounded-2xl border p-6"><h2 className="text-xl font-bold mb-4">Kegiatan Terbaru</h2>
        <div className="space-y-3">{activities.map(x=><div key={x.id} className="border rounded-xl p-4 flex justify-between gap-4"><div><b>{x.title}</b><p className="text-sm text-slate-500">{x.date} · {x.category}</p></div><button onClick={()=>removeActivity(x.id)} className="text-red-600 text-sm">Hapus</button></div>)}{!activities.length&&<p className="text-slate-500">Belum ada kegiatan.</p>}</div>
      </section>
      <section className="bg-white rounded-2xl border p-6"><h2 className="text-xl font-bold mb-4">Agenda</h2>
        <div className="space-y-3">{agenda.map(x=><div key={x.id} className="border rounded-xl p-4 flex justify-between gap-4"><div><b>{x.title}</b><p className="text-sm text-slate-500">{x.date} · {x.place}</p></div><button onClick={()=>removeAgenda(x.id)} className="text-red-600 text-sm">Hapus</button></div>)}{!agenda.length&&<p className="text-slate-500">Belum ada agenda.</p>}</div>
      </section>
    </div>
  </main>
}
