// src/admin/GestionJugadores.jsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero', 'DT']

const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }
const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block"

// ─── Avatar con iniciales ─────────────────────────────────────────────────────
function Avatar({ nombre, apellido, foto_url, size = 10 }) {
  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
  if (foto_url) {
    return (
      <img
        src={foto_url}
        alt={`${nombre} ${apellido}`}
        className={`w-${size} h-${size} rounded-full object-cover border border-violet-500/40`}
      />
    )
  }
  return (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center text-xs font-bold text-white border border-violet-500/40`}
      style={{ background: 'linear-gradient(135deg, #6D28D9, #4C1D95)' }}>
      {iniciales || '?'}
    </div>
  )
}

// ─── Formulario crear/editar ──────────────────────────────────────────────────
function FormularioJugador({ jugador, onGuardado, onCancelar }) {
  const esNuevo = !jugador
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    nombre: jugador?.nombre ?? '',
    apellido: jugador?.apellido ?? '',
    numero_camiseta: jugador?.numero_camiseta ?? '',
    posicion: jugador?.posicion ?? '',
    activo: jugador?.activo ?? true,
  })
  const [fotoFile, setFotoFile] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(jugador?.foto_url ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleFotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!tiposPermitidos.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG, WebP o GIF.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5 MB.')
      return
    }
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  async function handleGuardar() {
    setError(null)
    if (!form.nombre || !form.apellido) {
      setError('Nombre y apellido son obligatorios.')
      return
    }

    setLoading(true)

    try {
      let foto_url = jugador?.foto_url ?? null

      // 1. Si hay foto nueva, subirla a Storage
      if (fotoFile) {
        // Nombre del archivo: timestamp + nombre original para evitar colisiones
        const ext = fotoFile.name.split('.').pop()
        const fileName = `${Date.now()}_${form.apellido.toLowerCase()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('jugadores')
          .upload(fileName, fotoFile)

        if (uploadError) throw new Error('Error al subir foto: ' + uploadError.message)

        // 2. Obtener URL pública
        const { data: urlData } = supabase.storage
          .from('jugadores')
          .getPublicUrl(fileName)
        
        foto_url = urlData?.publicUrl ?? null
      }

      // 3. Preparar datos del jugador
      const datos = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        numero_camiseta: form.numero_camiseta !== '' ? parseInt(form.numero_camiseta) : null,
        posicion: form.posicion || null,
        activo: form.activo,
        foto_url,
      }

      // 4. Insertar o actualizar
      if (esNuevo) {
        const { error: insertError } = await supabase
          .from('jugadores')
          .insert(datos)
        if (insertError) throw new Error(insertError.message)
      } else {
        const { error: updateError } = await supabase
          .from('jugadores')
          .update(datos)
          .eq('id', jugador.id)
        if (updateError) throw new Error(updateError.message)
      }

      onGuardado()

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancelar}
          className="text-zinc-400 hover:text-white transition-colors text-sm"
        >
          ← Volver
        </button>
        <h2 className="text-xl font-black text-white">
          {esNuevo ? 'Agregar jugador' : `Editar — ${jugador.nombre} ${jugador.apellido}`}
        </h2>
      </div>

      <div className="flex flex-col gap-6">

        {/* Foto */}
        <div>
          <label className={labelClass}>Foto</label>
          <div className="flex items-center gap-4">
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border border-violet-500/40"
              />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-zinc-500 border border-violet-500/20"
                style={{ background: 'rgba(124,58,237,0.08)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}
              >
                {fotoPreview ? 'Cambiar foto' : 'Subir foto'}
              </button>
              {fotoFile && (
                <span className="text-xs text-zinc-500">{fotoFile.name}</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre *</label>
            <input
              type="text"
              placeholder="Ej: Juan"
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Apellido *</label>
            <input
              type="text"
              placeholder="Ej: Pérez"
              value={form.apellido}
              onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Número y Posición */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Número de camiseta</label>
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Ej: 10"
              value={form.numero_camiseta}
              onChange={e => setForm(f => ({ ...f, numero_camiseta: e.target.value }))}
              className={inputClass + ' text-center'}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass}>Posición</label>
            <select
              value={form.posicion}
              onChange={e => setForm(f => ({ ...f, posicion: e.target.value }))}
              className={inputClass + ' appearance-none'}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            >
              <option value="" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>— Sin posición —</option>
              {POSICIONES.map(p => (
                <option key={p} value={p} style={{ background: '#1a0a2e', color: '#ffffff' }}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Activo */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div
              onClick={() => setForm(f => ({ ...f, activo: !f.activo }))}
              className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
              style={{ background: form.activo ? '#7C3AED' : 'rgba(255,255,255,0.1)' }}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.activo ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-gray-300">
              {form.activo ? 'Jugador activo' : 'Jugador inactivo'}
            </span>
          </label>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={handleGuardar}
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-bold text-white transition-all"
            style={{ background: loading ? 'rgba(124,58,237,0.4)' : '#7C3AED' }}
          >
            {loading ? 'Guardando...' : esNuevo ? 'Agregar jugador' : 'Guardar cambios'}
          </button>
          <button
            onClick={onCancelar}
            className="px-6 py-3 rounded-xl font-semibold text-zinc-400 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── Lista de jugadores ───────────────────────────────────────────────────────
function ListaJugadores({ onEditar, onNuevo, jugadores, loading, error, onToggleActivo, onRecargar }) {

  const activos = jugadores.filter(j => j.activo)
  const inactivos = jugadores.filter(j => !j.activo)

  if (loading) return (
    <p className="text-zinc-500 text-sm py-8">Cargando jugadores...</p>
  )

  if (error) return (
    <p className="text-red-400 text-sm py-8">Error: {error}</p>
  )

  function GrupoJugadores({ titulo, lista }) {
    if (lista.length === 0) return null
    return (
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">{titulo}</p>
        <div className="flex flex-col gap-2">
          {lista.map(j => (
            <div
              key={j.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar nombre={j.nombre} apellido={j.apellido} foto_url={j.foto_url} size={10} />
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">
                    {j.nombre} {j.apellido}
                    {j.numero_camiseta && (
                      <span className="text-violet-400 text-xs ml-2">#{j.numero_camiseta}</span>
                    )}
                  </p>
                  <p className="text-zinc-500 text-xs">{j.posicion ?? 'Sin posición'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onEditar(j)}
                  className="text-xs px-3 py-1.5 rounded-lg text-violet-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(124,58,237,0.15)' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => onToggleActivo(j)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    background: j.activo ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
                    color: j.activo ? '#f87171' : '#4ade80',
                  }}
                >
                  {j.activo ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-white">Jugadores</h2>
        <button
          onClick={onNuevo}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#7C3AED' }}
        >
          + Agregar jugador
        </button>
      </div>

      {jugadores.length === 0 ? (
        <p className="text-zinc-500 text-sm py-8">No hay jugadores cargados aún.</p>
      ) : (
        <>
          <GrupoJugadores titulo={`Activos (${activos.length})`} lista={activos} />
          <GrupoJugadores titulo={`Inactivos (${inactivos.length})`} lista={inactivos} />
        </>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function GestionJugadores() {
  const [jugadores, setJugadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vista, setVista] = useState('lista') // 'lista' | 'formulario'
  const [jugadorEditando, setJugadorEditando] = useState(null)

  async function cargarJugadores() {
    setLoading(true)
    const { data, error } = await supabase
      .from('jugadores')
      .select('id, nombre, apellido, numero_camiseta, posicion, activo, foto_url')
      .order('apellido')
    if (error) setError(error.message)
    else setJugadores(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    cargarJugadores()
  }, [])

  async function toggleActivo(jugador) {
    await supabase
      .from('jugadores')
      .update({ activo: !jugador.activo })
      .eq('id', jugador.id)
    cargarJugadores()
  }

  function handleEditar(jugador) {
    setJugadorEditando(jugador)
    setVista('formulario')
  }

  function handleNuevo() {
    setJugadorEditando(null)
    setVista('formulario')
  }

  function handleGuardado() {
    setVista('lista')
    setJugadorEditando(null)
    cargarJugadores()
  }

  function handleCancelar() {
    setVista('lista')
    setJugadorEditando(null)
  }

  if (vista === 'formulario') {
    return (
      <FormularioJugador
        jugador={jugadorEditando}
        onGuardado={handleGuardado}
        onCancelar={handleCancelar}
      />
    )
  }

  return (
    <ListaJugadores
      jugadores={jugadores}
      loading={loading}
      error={error}
      onEditar={handleEditar}
      onNuevo={handleNuevo}
      onToggleActivo={toggleActivo}
      onRecargar={cargarJugadores}
    />
  )
}