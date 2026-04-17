// src/admin/CargarPartido.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

// ─── SELECTOR DE JUGADOR ──────────────────────────────────────────────────────
function SelectorJugador({ jugadores, valor, onChange, placeholder }) {
  return (
    <select
      value={valor}
      onChange={e => onChange(e.target.value)}
      className="flex-1 px-3 py-2 rounded-lg text-sm text-white outline-none appearance-none"
      style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', colorScheme: 'dark' }}
    >
      <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— {placeholder} —</option>
      {jugadores.map(j => (
        <option key={j.id} value={j.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>
          #{j.numero_camiseta} {j.nombre} {j.apellido}
        </option>
      ))}
    </select>
  )
}

// ─── FILA DE GOL ─────────────────────────────────────────────────────────────
function FilaGol({ gol, jugadores, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <SelectorJugador
        jugadores={jugadores}
        valor={gol.jugador_id}
        onChange={v => onChange({ ...gol, jugador_id: v })}
        placeholder="Jugador"
      />
      <input
        type="number"
        min="1"
        max="9"
        value={gol.cantidad}
        onChange={e => onChange({ ...gol, cantidad: parseInt(e.target.value) || 1 })}
        className="w-14 px-2 py-2 rounded-lg text-sm text-white text-center outline-none"
        style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
      />
      <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={gol.penal}
          onChange={e => onChange({ ...gol, penal: e.target.checked })}
          className="accent-violet-500"
        />
        Penal
      </label>
      <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={gol.en_contra}
          onChange={e => onChange({ ...gol, en_contra: e.target.checked })}
          className="accent-violet-500"
        />
        E/C
      </label>
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-300 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

// ─── FILA DE ASISTENCIA ───────────────────────────────────────────────────────
function FilaAsistencia({ asistencia, jugadores, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <SelectorJugador
        jugadores={jugadores}
        valor={asistencia.jugador_id}
        onChange={v => onChange({ ...asistencia, jugador_id: v })}
        placeholder="Jugador"
      />
      <input
        type="number"
        min="1"
        max="9"
        value={asistencia.cantidad}
        onChange={e => onChange({ ...asistencia, cantidad: parseInt(e.target.value) || 1 })}
        className="w-14 px-2 py-2 rounded-lg text-sm text-white text-center outline-none"
        style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
      />
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-300 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function CargarPartido() {
  const [torneos, setTorneos] = useState([])
  const [jugadores, setJugadores] = useState([])
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    torneo_id: '',
    fase: '',
    rival: '',
    goles_kikines: '',
    goles_rival: '',
    penales: '',
    goles: [],
    asistencias: [],
  })

  // Cargar torneos y jugadores al montar
  useEffect(() => {
    supabase.from('torneos').select('id, nombre, serie, anio').order('anio').then(({ data }) => {
      if (data) setTorneos(data)
    })
    supabase.from('jugadores').select('id, nombre, apellido, numero_camiseta').eq('activo', true).order('apellido').then(({ data }) => {
      if (data) setJugadores(data)
    })
  }, [])

  function agregarGol() {
    setForm(f => ({
      ...f,
      goles: [...f.goles, { jugador_id: '', cantidad: 1, penal: false, en_contra: false }]
    }))
  }

  function agregarAsistencia() {
    setForm(f => ({
      ...f,
      asistencias: [...f.asistencias, { jugador_id: '', cantidad: 1 }]
    }))
  }

  function actualizarGol(index, nuevo) {
    setForm(f => {
      const goles = [...f.goles]
      goles[index] = nuevo
      return { ...f, goles }
    })
  }

  function actualizarAsistencia(index, nuevo) {
    setForm(f => {
      const asistencias = [...f.asistencias]
      asistencias[index] = nuevo
      return { ...f, asistencias }
    })
  }

  function eliminarGol(index) {
    setForm(f => ({ ...f, goles: f.goles.filter((_, i) => i !== index) }))
  }

  function eliminarAsistencia(index) {
    setForm(f => ({ ...f, asistencias: f.asistencias.filter((_, i) => i !== index) }))
  }

  async function guardar() {
    setError(null)
    if (!form.torneo_id || !form.fase || !form.rival || form.goles_kikines === '' || form.goles_rival === '') {
      setError('Completá todos los campos obligatorios.')
      return
    }

    setLoading(true)

    // 1. Insertar partido
    const { data: partido, error: errorPartido } = await supabase
      .from('partidos')
      .insert({
        torneo_id: parseInt(form.torneo_id),
        fase: form.fase,
        rival: form.rival,
        goles_kikines: parseInt(form.goles_kikines),
        goles_rival: parseInt(form.goles_rival),
        penales: form.penales || null,
      })
      .select()
      .single()

    if (errorPartido) {
      setError('Error al guardar el partido: ' + errorPartido.message)
      setLoading(false)
      return
    }

    // 2. Insertar goles
    const golesValidos = form.goles.filter(g => g.jugador_id)
    if (golesValidos.length > 0) {
      const { error: errorGoles } = await supabase.from('goles').insert(
        golesValidos.map(g => ({
          partido_id: partido.id,
          jugador_id: parseInt(g.jugador_id),
          cantidad: g.cantidad,
          penal: g.penal,
          en_contra: g.en_contra,
        }))
      )
      if (errorGoles) {
        setError('Partido guardado pero error en goles: ' + errorGoles.message)
        setLoading(false)
        return
      }
    }

    // 3. Insertar asistencias
    const asistenciasValidas = form.asistencias.filter(a => a.jugador_id)
    if (asistenciasValidas.length > 0) {
      const { error: errorAsistencias } = await supabase.from('asistencias').insert(
        asistenciasValidas.map(a => ({
          partido_id: partido.id,
          jugador_id: parseInt(a.jugador_id),
          cantidad: a.cantidad,
        }))
      )
      if (errorAsistencias) {
        setError('Partido guardado pero error en asistencias: ' + errorAsistencias.message)
        setLoading(false)
        return
      }
    }

    // Éxito — limpiar formulario
    setExito(true)
    setForm({
      torneo_id: '',
      fase: '',
      rival: '',
      goles_kikines: '',
      goles_rival: '',
      penales: '',
      goles: [],
      asistencias: [],
    })
    setLoading(false)
    setTimeout(() => setExito(false), 3000)
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
  const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }
  const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block"

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-black text-white mb-8">Cargar partido</h2>

      <div className="flex flex-col gap-6">

        {/* Torneo */}
        <div>
          <label className={labelClass}>Torneo *</label>
          <select
            value={form.torneo_id}
            onChange={e => setForm(f => ({ ...f, torneo_id: e.target.value }))}
            className={inputClass + ' appearance-none'}
            style={{ ...inputStyle, colorScheme: 'dark' }}
          >
            <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Seleccioná un torneo —</option>
            {[...torneos].reverse().map(t => (
              <option key={t.id} value={t.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>
                {t.nombre} {t.serie ? `· ${t.serie}` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Fase y Rival */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Fase *</label>
            <input
              type="text"
              placeholder="Ej: Fecha 7, Cuartos..."
              value={form.fase}
              onChange={e => setForm(f => ({ ...f, fase: e.target.value }))}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Rival *</label>
            <input
              type="text"
              placeholder="Nombre del rival"
              value={form.rival}
              onChange={e => setForm(f => ({ ...f, rival: e.target.value }))}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Resultado */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Goles Kikines *</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.goles_kikines}
              onChange={e => setForm(f => ({ ...f, goles_kikines: e.target.value }))}
              className={inputClass + ' text-center'}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Goles rival *</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.goles_rival}
              onChange={e => setForm(f => ({ ...f, goles_rival: e.target.value }))}
              className={inputClass + ' text-center'}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Penales</label>
            <input
              type="text"
              placeholder="Ej: 5-4"
              value={form.penales}
              onChange={e => setForm(f => ({ ...f, penales: e.target.value }))}
              className={inputClass + ' text-center'}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Goles */}
        <div>
          <label className={labelClass}>Goleadores</label>
          <div className="flex flex-col gap-2 mb-2">
            {form.goles.map((gol, i) => (
              <FilaGol
                key={i}
                gol={gol}
                jugadores={jugadores}
                onChange={nuevo => actualizarGol(i, nuevo)}
                onRemove={() => eliminarGol(i)}
              />
            ))}
          </div>
          <button
            onClick={agregarGol}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            + Agregar goleador
          </button>
        </div>

        {/* Asistencias */}
        <div>
          <label className={labelClass}>Asistencias</label>
          <div className="flex flex-col gap-2 mb-2">
            {form.asistencias.map((a, i) => (
              <FilaAsistencia
                key={i}
                asistencia={a}
                jugadores={jugadores}
                onChange={nuevo => actualizarAsistencia(i, nuevo)}
                onRemove={() => eliminarAsistencia(i)}
              />
            ))}
          </div>
          <button
            onClick={agregarAsistencia}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            + Agregar asistencia
          </button>
        </div>

        {/* Error y éxito */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        {exito && (
          <p className="text-green-400 text-sm">✓ Partido guardado correctamente</p>
        )}

        {/* Botón guardar */}
        <button
          onClick={guardar}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all"
          style={{ background: loading ? 'rgba(124,58,237,0.4)' : '#7C3AED' }}
        >
          {loading ? 'Guardando...' : 'Guardar partido'}
        </button>

      </div>
    </div>
  )
}