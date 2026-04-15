// src/admin/ListaPartidos.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function ListaPartidos() {
  const [torneos, setTorneos] = useState([])
  const [torneoId, setTorneoId] = useState('')
  const [partidos, setPartidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [eliminando, setEliminando] = useState(null)

  useEffect(() => {
    supabase.from('torneos').select('*').order('anio').then(({ data }) => {
      if (data) setTorneos(data)
    })
  }, [])

  useEffect(() => {
    if (!torneoId) { setPartidos([]); return }
    setLoading(true)
    supabase
      .from('partidos')
      .select(`
        *,
        goles(cantidad, penal, en_contra, jugadores(nombre, apellido)),
        asistencias(cantidad, jugadores(nombre, apellido))
      `)
      .eq('torneo_id', torneoId)
      .order('id')
      .then(({ data }) => {
        if (data) setPartidos(data)
        setLoading(false)
      })
  }, [torneoId])

  async function eliminarPartido(id) {
    if (!confirm('¿Seguro que querés eliminar este partido? Se borran también los goles y asistencias.')) return
    setEliminando(id)
    await supabase.from('partidos').delete().eq('id', id)
    setPartidos(p => p.filter(x => x.id !== id))
    setEliminando(null)
  }

  function getResultado(p) {
    if (p.goles_kikines > p.goles_rival) return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#4ade80' }
    if (p.goles_kikines === p.goles_rival) return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#facc15' }
    return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#f87171' }
  }

  const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }

  return (
    <div>
      <h2 className="text-xl font-black text-white mb-8">Ver partidos</h2>

      {/* Selector de torneo */}
      <select
        value={torneoId}
        onChange={e => setTorneoId(e.target.value)}
        className="w-full max-w-sm px-4 py-3 rounded-xl text-white text-sm outline-none mb-6"
        style={inputStyle}
      >
        <option value="">— Seleccioná un torneo —</option>
        {[...torneos].reverse().map(t => (
          <option key={t.id} value={t.id}>
            {t.nombre} {t.serie ? `· ${t.serie}` : ''}
          </option>
        ))}
      </select>

      {loading && <p className="text-gray-400 text-sm">Cargando partidos...</p>}

      {!loading && torneoId && partidos.length === 0 && (
        <p className="text-gray-500 text-sm">No hay partidos cargados en este torneo.</p>
      )}

      {/* Lista de partidos */}
      <div className="flex flex-col gap-3">
        {partidos.map(p => {
          const res = getResultado(p)
          return (
            <div
              key={p.id}
              className="rounded-xl p-4"
              style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{p.fase}</span>
                  <span className="text-white font-semibold">vs {p.rival}</span>
                  <span className="font-black text-sm" style={{ color: res.color }}>{res.texto}</span>
                  {p.penales && <span className="text-xs text-gray-400">({p.penales} pen.)</span>}
                </div>
                <button
                  onClick={() => eliminarPartido(p.id)}
                  disabled={eliminando === p.id}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  {eliminando === p.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>

              {/* Goles */}
              {p.goles?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {p.goles.map((g, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd' }}>
                      ⚽ {g.jugadores?.apellido} {g.cantidad > 1 ? `x${g.cantidad}` : ''}
                      {g.penal ? ' (P)' : ''}{g.en_contra ? ' (E/C)' : ''}
                    </span>
                  ))}
                </div>
              )}

              {/* Asistencias */}
              {p.asistencias?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {p.asistencias.map((a, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(30,30,50,0.6)', color: '#a1a1aa' }}>
                      🅰 {a.jugadores?.apellido} {a.cantidad > 1 ? `x${a.cantidad}` : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}