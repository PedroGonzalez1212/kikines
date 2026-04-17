// src/admin/ListaPartidos.jsx
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../supabase'

const inputStyle = {
  background: 'rgba(124,58,237,0.1)',
  border: '1px solid rgba(124,58,237,0.3)',
}

const inputClass =
  'w-full px-3 py-2 rounded-lg text-white text-sm outline-none focus:border-violet-400 transition-colors'

export default function ListaPartidos() {
  const [torneos, setTorneos] = useState([])
  const [torneoId, setTorneoId] = useState('')
  const [partidos, setPartidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [eliminando, setEliminando] = useState(null)

  // ── Estado del modal de edición ──────────────────────────────────────────
  const [editando, setEditando] = useState(null)         // partido completo
  const [editForm, setEditForm] = useState({})           // campos base editables
  const [editGoles, setEditGoles] = useState([])         // goles existentes en BD
  const [editAsistencias, setEditAsistencias] = useState([]) // asistencias existentes en BD
  const [golesEliminar, setGolesEliminar] = useState(new Set())           // IDs a eliminar
  const [asistenciasEliminar, setAsistenciasEliminar] = useState(new Set())
  const [golesNuevos, setGolesNuevos] = useState([])     // pendientes de insertar
  const [asistenciasNuevas, setAsistenciasNuevas] = useState([])

  const [nuevoGol, setNuevoGol] = useState({ jugador_id: '', cantidad: 1, penal: false, en_contra: false })
  const [nuevaAsistencia, setNuevaAsistencia] = useState({ jugador_id: '', cantidad: 1 })

  const [jugadores, setJugadores] = useState([])
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [errorEdit, setErrorEdit] = useState(null)

  // ── Carga inicial ────────────────────────────────────────────────────────
  useEffect(() => {
    supabase
      .from('torneos')
      .select('id, nombre, serie, anio')
      .order('anio')
      .then(({ data }) => { if (data) setTorneos(data) })
  }, [])

  useEffect(() => {
    if (!torneoId) { setPartidos([]); return }
    cargarPartidos()
  }, [torneoId])

  async function cargarPartidos() {
    setLoading(true)
    const { data } = await supabase
      .from('partidos')
      .select(`
        id, fase, rival, goles_kikines, goles_rival, penales, torneo_id,
        goles(id, cantidad, penal, en_contra, jugadores(nombre, apellido)),
        asistencias(id, cantidad, jugadores(nombre, apellido))
      `)
      .eq('torneo_id', torneoId)
      .order('id')
    if (data) setPartidos(data)
    setLoading(false)
  }

  // ── Eliminar partido ─────────────────────────────────────────────────────
  async function eliminarPartido(id) {
    if (!confirm('¿Seguro que querés eliminar este partido? Se borran también los goles y asistencias.')) return
    setEliminando(id)
    await supabase.from('partidos').delete().eq('id', id)
    setPartidos(p => p.filter(x => x.id !== id))
    setEliminando(null)
  }

  // ── Abrir modal de edición ───────────────────────────────────────────────
  async function abrirEdicion(partido) {
    setEditando(partido)
    setEditForm({
      rival: partido.rival ?? '',
      fase: partido.fase ?? '',
      goles_kikines: partido.goles_kikines ?? 0,
      goles_rival: partido.goles_rival ?? 0,
      penales: partido.penales ?? '',
    })
    setGolesEliminar(new Set())
    setAsistenciasEliminar(new Set())
    setGolesNuevos([])
    setAsistenciasNuevas([])
    setNuevoGol({ jugador_id: '', cantidad: 1, penal: false, en_contra: false })
    setNuevaAsistencia({ jugador_id: '', cantidad: 1 })
    setErrorEdit(null)
    setLoadingEdit(true)

    const [{ data: golesData }, { data: asistData }, { data: jugData }] = await Promise.all([
      supabase
        .from('goles')
        .select('id, jugador_id, cantidad, penal, en_contra, jugadores(nombre, apellido)')
        .eq('partido_id', partido.id),
      supabase
        .from('asistencias')
        .select('id, jugador_id, cantidad, jugadores(nombre, apellido)')
        .eq('partido_id', partido.id),
      supabase
        .from('jugadores')
        .select('id, nombre, apellido')
        .eq('activo', true)
        .order('apellido'),
    ])

    if (golesData) setEditGoles(golesData)
    if (asistData) setEditAsistencias(asistData)
    if (jugData) setJugadores(jugData)
    setLoadingEdit(false)
  }

  function cerrarEdicion() {
    setEditando(null)
  }

  // ── Marcar gol/asistencia para eliminar ──────────────────────────────────
  function toggleEliminarGol(id) {
    setGolesEliminar(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleEliminarAsistencia(id) {
    setAsistenciasEliminar(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Agregar gol/asistencia pendiente ─────────────────────────────────────
  function agregarGolNuevo() {
    if (!nuevoGol.jugador_id) return
    setGolesNuevos(prev => [...prev, { ...nuevoGol, cantidad: Number(nuevoGol.cantidad) }])
    setNuevoGol({ jugador_id: '', cantidad: 1, penal: false, en_contra: false })
  }

  function agregarAsistenciaNueva() {
    if (!nuevaAsistencia.jugador_id) return
    setAsistenciasNuevas(prev => [...prev, { ...nuevaAsistencia, cantidad: Number(nuevaAsistencia.cantidad) }])
    setNuevaAsistencia({ jugador_id: '', cantidad: 1 })
  }

  // ── Guardar cambios ──────────────────────────────────────────────────────
  async function guardarCambios() {
    setGuardando(true)
    setErrorEdit(null)
    try {
      // 1. Actualizar partido base
      const { error: errPartido } = await supabase
        .from('partidos')
        .update({
          rival: editForm.rival,
          fase: editForm.fase,
          goles_kikines: Number(editForm.goles_kikines),
          goles_rival: Number(editForm.goles_rival),
          penales: editForm.penales || null,
        })
        .eq('id', editando.id)
      if (errPartido) throw errPartido

      // 2. Eliminar goles marcados
      if (golesEliminar.size > 0) {
        const { error: errDelGoles } = await supabase
          .from('goles')
          .delete()
          .in('id', [...golesEliminar])
        if (errDelGoles) throw errDelGoles
      }

      // 3. Eliminar asistencias marcadas
      if (asistenciasEliminar.size > 0) {
        const { error: errDelAsist } = await supabase
          .from('asistencias')
          .delete()
          .in('id', [...asistenciasEliminar])
        if (errDelAsist) throw errDelAsist
      }

      // 4. Insertar goles nuevos
      if (golesNuevos.length > 0) {
        const { error: errInsGoles } = await supabase
          .from('goles')
          .insert(golesNuevos.map(g => ({ ...g, partido_id: editando.id })))
        if (errInsGoles) throw errInsGoles
      }

      // 5. Insertar asistencias nuevas
      if (asistenciasNuevas.length > 0) {
        const { error: errInsAsist } = await supabase
          .from('asistencias')
          .insert(asistenciasNuevas.map(a => ({ ...a, partido_id: editando.id })))
        if (errInsAsist) throw errInsAsist
      }

      cerrarEdicion()
      await cargarPartidos()
    } catch (err) {
      setErrorEdit(err.message ?? 'Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  // ── Helpers de display ────────────────────────────────────────────────────
  function getResultado(p) {
    if (p.goles_kikines > p.goles_rival)  return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#4ade80' }
    if (p.goles_kikines === p.goles_rival) return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#facc15' }
    return { texto: `${p.goles_kikines} - ${p.goles_rival}`, color: '#f87171' }
  }

  function nombreJugador(id) {
    const j = jugadores.find(j => j.id === id)
    return j ? `${j.apellido}, ${j.nombre}` : '—'
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <h2 className="text-xl font-black text-white mb-8">Ver partidos</h2>

      {/* Selector de torneo */}
      <select
        value={torneoId}
        onChange={e => setTorneoId(e.target.value)}
        className="w-full max-w-sm px-4 py-3 rounded-xl text-white text-sm outline-none mb-6 appearance-none"
        style={{ ...inputStyle, colorScheme: 'dark' }}
      >
        <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Seleccioná un torneo —</option>
        {[...torneos].reverse().map(t => (
          <option key={t.id} value={t.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>
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
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-gray-500">{p.fase}</span>
                  <span className="text-white font-semibold">vs {p.rival}</span>
                  <span className="font-black text-sm" style={{ color: res.color }}>{res.texto}</span>
                  {p.penales && <span className="text-xs text-gray-400">({p.penales} pen.)</span>}
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <button
                    onClick={() => abrirEdicion(p)}
                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarPartido(p.id)}
                    disabled={eliminando === p.id}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    {eliminando === p.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </div>

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

      {/* ── Modal de edición ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editando && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={e => { if (e.target === e.currentTarget) cerrarEdicion() }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
              style={{ background: '#111', border: '1px solid rgba(124,58,237,0.35)' }}
            >
              <h3 className="text-lg font-black text-white mb-5">
                Editando: vs {editando.rival}
              </h3>

              {loadingEdit ? (
                <p className="text-gray-400 text-sm py-8 text-center">Cargando datos...</p>
              ) : (
                <>
                  {/* ── Datos base ────────────────────────────────────────── */}
                  <section className="mb-6">
                    <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">
                      Datos del partido
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-400 mb-1 block">Rival</label>
                        <input
                          type="text"
                          value={editForm.rival}
                          onChange={e => setEditForm(f => ({ ...f, rival: e.target.value }))}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-400 mb-1 block">Fase</label>
                        <input
                          type="text"
                          value={editForm.fase}
                          onChange={e => setEditForm(f => ({ ...f, fase: e.target.value }))}
                          placeholder="Ej: Fecha 1, Final…"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Goles Kikines</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.goles_kikines}
                          onChange={e => setEditForm(f => ({ ...f, goles_kikines: e.target.value }))}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Goles Rival</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.goles_rival}
                          onChange={e => setEditForm(f => ({ ...f, goles_rival: e.target.value }))}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-400 mb-1 block">Penales (opcional, ej: 3-2)</label>
                        <input
                          type="text"
                          value={editForm.penales}
                          onChange={e => setEditForm(f => ({ ...f, penales: e.target.value }))}
                          placeholder="Dejar vacío si no hubo"
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </section>

                  {/* ── Goles ─────────────────────────────────────────────── */}
                  <section className="mb-6">
                    <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">
                      Goles
                    </h4>

                    {/* Goles existentes */}
                    {editGoles.length === 0 && golesNuevos.length === 0 && (
                      <p className="text-xs text-gray-500 mb-3">Sin goles registrados.</p>
                    )}

                    <div className="flex flex-col gap-1.5 mb-3">
                      {editGoles.map(g => {
                        const marcado = golesEliminar.has(g.id)
                        return (
                          <div
                            key={g.id}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                            style={{
                              background: marcado ? 'rgba(239,68,68,0.08)' : 'rgba(124,58,237,0.1)',
                              border: `1px solid ${marcado ? 'rgba(239,68,68,0.3)' : 'rgba(124,58,237,0.2)'}`,
                              opacity: marcado ? 0.6 : 1,
                            }}
                          >
                            <span style={{ color: marcado ? '#f87171' : '#c4b5fd' }}>
                              ⚽ {g.jugadores?.apellido}, {g.jugadores?.nombre}
                              {g.cantidad > 1 ? ` x${g.cantidad}` : ''}
                              {g.penal ? ' · Penal' : ''}
                              {g.en_contra ? ' · En contra' : ''}
                            </span>
                            <button
                              onClick={() => toggleEliminarGol(g.id)}
                              className="text-xs ml-3 transition-colors"
                              style={{ color: marcado ? '#f87171' : '#a1a1aa' }}
                            >
                              {marcado ? 'Deshacer' : 'Eliminar'}
                            </button>
                          </div>
                        )
                      })}

                      {/* Goles pendientes de agregar */}
                      {golesNuevos.map((g, i) => (
                        <div
                          key={`nuevo-gol-${i}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                          style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}
                        >
                          <span style={{ color: '#86efac' }}>
                            ⚽ + {nombreJugador(g.jugador_id)}
                            {g.cantidad > 1 ? ` x${g.cantidad}` : ''}
                            {g.penal ? ' · Penal' : ''}
                            {g.en_contra ? ' · En contra' : ''}
                          </span>
                          <button
                            onClick={() => setGolesNuevos(prev => prev.filter((_, j) => j !== i))}
                            className="text-xs text-red-400 hover:text-red-300 ml-3 transition-colors"
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Agregar gol nuevo */}
                    <div
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(124,58,237,0.06)', border: '1px dashed rgba(124,58,237,0.25)' }}
                    >
                      <p className="text-xs text-gray-500 mb-2">Agregar gol</p>
                      <div className="flex flex-wrap gap-2 items-end">
                        <select
                          value={nuevoGol.jugador_id}
                          onChange={e => setNuevoGol(g => ({ ...g, jugador_id: e.target.value }))}
                          className="flex-1 min-w-[140px] px-3 py-2 rounded-lg text-white text-xs outline-none appearance-none"
                          style={{ ...inputStyle, colorScheme: 'dark' }}
                        >
                          <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Jugador —</option>
                          {jugadores.map(j => (
                            <option key={j.id} value={j.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>{j.apellido}, {j.nombre}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={nuevoGol.cantidad}
                          onChange={e => setNuevoGol(g => ({ ...g, cantidad: e.target.value }))}
                          className="w-16 px-3 py-2 rounded-lg text-white text-xs outline-none"
                          style={inputStyle}
                          title="Cantidad"
                        />
                        <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={nuevoGol.penal}
                            onChange={e => setNuevoGol(g => ({ ...g, penal: e.target.checked }))}
                            className="accent-violet-500"
                          />
                          Penal
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={nuevoGol.en_contra}
                            onChange={e => setNuevoGol(g => ({ ...g, en_contra: e.target.checked }))}
                            className="accent-violet-500"
                          />
                          E/C
                        </label>
                        <button
                          onClick={agregarGolNuevo}
                          disabled={!nuevoGol.jugador_id}
                          className="px-3 py-2 rounded-lg text-xs font-semibold transition-opacity disabled:opacity-40"
                          style={{ background: 'rgba(124,58,237,0.4)', color: '#e9d5ff' }}
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* ── Asistencias ───────────────────────────────────────── */}
                  <section className="mb-6">
                    <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">
                      Asistencias
                    </h4>

                    {editAsistencias.length === 0 && asistenciasNuevas.length === 0 && (
                      <p className="text-xs text-gray-500 mb-3">Sin asistencias registradas.</p>
                    )}

                    <div className="flex flex-col gap-1.5 mb-3">
                      {editAsistencias.map(a => {
                        const marcado = asistenciasEliminar.has(a.id)
                        return (
                          <div
                            key={a.id}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                            style={{
                              background: marcado ? 'rgba(239,68,68,0.08)' : 'rgba(30,30,50,0.5)',
                              border: `1px solid ${marcado ? 'rgba(239,68,68,0.3)' : 'rgba(124,58,237,0.15)'}`,
                              opacity: marcado ? 0.6 : 1,
                            }}
                          >
                            <span style={{ color: marcado ? '#f87171' : '#a1a1aa' }}>
                              🅰 {a.jugadores?.apellido}, {a.jugadores?.nombre}
                              {a.cantidad > 1 ? ` x${a.cantidad}` : ''}
                            </span>
                            <button
                              onClick={() => toggleEliminarAsistencia(a.id)}
                              className="text-xs ml-3 transition-colors"
                              style={{ color: marcado ? '#f87171' : '#a1a1aa' }}
                            >
                              {marcado ? 'Deshacer' : 'Eliminar'}
                            </button>
                          </div>
                        )
                      })}

                      {/* Asistencias pendientes de agregar */}
                      {asistenciasNuevas.map((a, i) => (
                        <div
                          key={`nueva-asist-${i}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                          style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}
                        >
                          <span style={{ color: '#86efac' }}>
                            🅰 + {nombreJugador(a.jugador_id)}
                            {a.cantidad > 1 ? ` x${a.cantidad}` : ''}
                          </span>
                          <button
                            onClick={() => setAsistenciasNuevas(prev => prev.filter((_, j) => j !== i))}
                            className="text-xs text-red-400 hover:text-red-300 ml-3 transition-colors"
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Agregar asistencia nueva */}
                    <div
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(124,58,237,0.06)', border: '1px dashed rgba(124,58,237,0.25)' }}
                    >
                      <p className="text-xs text-gray-500 mb-2">Agregar asistencia</p>
                      <div className="flex flex-wrap gap-2 items-end">
                        <select
                          value={nuevaAsistencia.jugador_id}
                          onChange={e => setNuevaAsistencia(a => ({ ...a, jugador_id: e.target.value }))}
                          className="flex-1 min-w-[140px] px-3 py-2 rounded-lg text-white text-xs outline-none appearance-none"
                          style={{ ...inputStyle, colorScheme: 'dark' }}
                        >
                          <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Jugador —</option>
                          {jugadores.map(j => (
                            <option key={j.id} value={j.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>{j.apellido}, {j.nombre}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={nuevaAsistencia.cantidad}
                          onChange={e => setNuevaAsistencia(a => ({ ...a, cantidad: e.target.value }))}
                          className="w-16 px-3 py-2 rounded-lg text-white text-xs outline-none"
                          style={inputStyle}
                          title="Cantidad"
                        />
                        <button
                          onClick={agregarAsistenciaNueva}
                          disabled={!nuevaAsistencia.jugador_id}
                          className="px-3 py-2 rounded-lg text-xs font-semibold transition-opacity disabled:opacity-40"
                          style={{ background: 'rgba(124,58,237,0.4)', color: '#e9d5ff' }}
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* ── Error ─────────────────────────────────────────────── */}
                  {errorEdit && (
                    <p className="text-sm text-red-400 mb-4 px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      {errorEdit}
                    </p>
                  )}

                  {/* ── Acciones ──────────────────────────────────────────── */}
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      onClick={cerrarEdicion}
                      disabled={guardando}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors disabled:opacity-40"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={guardarCambios}
                      disabled={guardando}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg,#7C3AED,#6d28d9)' }}
                    >
                      {guardando ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
