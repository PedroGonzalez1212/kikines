// src/admin/CrearTorneo.jsx
import { useState } from 'react'
import { supabase } from '../supabase'

const SERIES = ['Serie A', 'Serie B', 'Serie C', 'Serie D', 'Serie E', 'Liguilla']

export default function CrearTorneo() {
  const [form, setForm] = useState({ nombre: '', serie: '', anio: new Date().getFullYear() })
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)
  const [error, setError] = useState(null)

  const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
  const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }
  const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block"

  async function guardar() {
    setError(null)
    if (!form.nombre || !form.anio) {
      setError('Completá nombre y año.')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('torneos').insert({
      nombre: form.nombre,
      serie: form.serie || null,
      anio: parseInt(form.anio),
    })
    if (error) {
      setError('Error: ' + error.message)
    } else {
      setExito(true)
      setForm({ nombre: '', serie: '', anio: new Date().getFullYear() })
      setTimeout(() => setExito(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-black text-white mb-8">Crear torneo</h2>

      <div className="flex flex-col gap-6">

        <div>
          <label className={labelClass}>Nombre *</label>
          <input
            type="text"
            placeholder="Ej: Clausura 26"
            value={form.nombre}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Serie</label>
            <select
              value={form.serie}
              onChange={e => setForm(f => ({ ...f, serie: e.target.value }))}
              className={inputClass + ' appearance-none'}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            >
              <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Sin serie —</option>
              {SERIES.map(s => (
                <option key={s} value={s} style={{ background: '#1a0a2e', color: '#ffffff' }}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Año *</label>
            <input
              type="number"
              min="2020"
              max="2100"
              value={form.anio}
              onChange={e => setForm(f => ({ ...f, anio: e.target.value }))}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {exito && <p className="text-green-400 text-sm">✓ Torneo creado correctamente</p>}

        <button
          onClick={guardar}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all"
          style={{ background: loading ? 'rgba(124,58,237,0.4)' : '#7C3AED' }}
        >
          {loading ? 'Guardando...' : 'Crear torneo'}
        </button>

      </div>
    </div>
  )
}