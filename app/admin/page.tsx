'use client'

import { FormEvent, useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const supabase = getSupabase()
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) window.location.href = '/admin/dashboard'
      })
    } catch {}
  }, [])

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = getSupabase()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      window.location.href = '/admin/dashboard'
    } catch (err: any) {
      setError(err?.message || 'Email atau password tidak benar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border shadow-sm p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-700">ADMIN DESA</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Desa Mulyamekar</h1>
          <p className="text-slate-500 mt-2">Masuk untuk mengelola kegiatan dan agenda website.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email admin</span>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input required type="password" value={password} onChange={e=>setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
          </label>
          {error && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-3 text-sm">{error}</div>}
          <button disabled={loading} className="w-full rounded-xl bg-emerald-700 text-white py-3 font-semibold disabled:opacity-60">
            {loading ? 'Memeriksa...' : 'Masuk ke Admin'}
          </button>
        </form>
        <a href="/" className="block text-center mt-6 text-sm text-slate-500 hover:text-emerald-700">← Kembali ke website</a>
      </div>
    </main>
  )
}
