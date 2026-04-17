// src/admin/GestionSponsors.jsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }
const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block"

// ─── Formulario agregar sponsor ───────────────────────────────────────────────
function FormularioSponsor({ onGuardado, onCancelar }) {
  const fileInputRef = useRef(null)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleLogoChange(e) {
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
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  async function handleGuardar() {
    setError(null)
    if (!nombre.trim()) {
      setError('El nombre del sponsor es obligatorio.')
      return
    }
    if (!logoFile) {
      setError('Seleccioná un logo antes de guardar.')
      return
    }

    setLoading(true)

    try {
      // 1. Subir logo a Storage
      const ext = logoFile.name.split('.').pop()
      const fileName = `${Date.now()}_${nombre.trim().toLowerCase().replace(/\s+/g, '_')}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('sponsors')
        .upload(fileName, logoFile)

      if (uploadError) throw new Error('Error al subir logo: ' + uploadError.message)

      // 2. Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('sponsors')
        .getPublicUrl(fileName)

      const logo_url = urlData?.publicUrl ?? null

      // 3. Insertar en tabla sponsors
      const { error: insertError } = await supabase
        .from('sponsors')
        .insert({ nombre: nombre.trim(), logo_url })

      if (insertError) throw new Error(insertError.message)

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
        <h2 className="text-xl font-black text-white">Agregar sponsor</h2>
      </div>

      <div className="flex flex-col gap-6">

        {/* Nombre */}
        <div>
          <label className={labelClass}>Nombre *</label>
          <input
            type="text"
            placeholder="Ej: Panadería Don Jorge"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Logo */}
        <div>
          <label className={labelClass}>Logo *</label>
          <div
            className="w-full h-40 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer transition-colors"
            style={{ background: 'rgba(124,58,237,0.08)', border: '2px dashed rgba(124,58,237,0.3)' }}
            onClick={() => fileInputRef.current?.click()}
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Preview logo"
                className="max-h-32 max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Hacé clic para seleccionar un logo</span>
              </div>
            )}
          </div>
          {logoFile && (
            <p className="text-xs text-zinc-500 mt-2">{logoFile.name}</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
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
            {loading ? 'Guardando...' : 'Agregar sponsor'}
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

// ─── Lista de sponsors ────────────────────────────────────────────────────────
function ListaSponsors({ sponsors, loading, error, onNuevo, onEliminar }) {
  if (loading) return (
    <p className="text-zinc-500 text-sm py-8">Cargando sponsors...</p>
  )

  if (error) return (
    <p className="text-red-400 text-sm py-8">Error: {error}</p>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-white">Sponsors</h2>
        <button
          onClick={onNuevo}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#7C3AED' }}
        >
          + Agregar sponsor
        </button>
      </div>

      {sponsors.length === 0 ? (
        <p className="text-zinc-500 text-sm py-8">No hay sponsors cargados todavía.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sponsors.map(sponsor => (
            <div
              key={sponsor.id}
              className="relative rounded-xl overflow-hidden group flex flex-col items-center justify-between p-4 gap-3"
              style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              {/* Logo */}
              <div className="w-full h-24 flex items-center justify-center">
                {sponsor.logo_url ? (
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.nombre}
                    className="max-h-20 max-w-full object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-zinc-600"
                    style={{ background: 'rgba(124,58,237,0.1)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Nombre */}
              <p className="text-white text-sm font-semibold text-center">{sponsor.nombre}</p>

              {/* Botón eliminar — visible en hover */}
              <button
                onClick={() => onEliminar(sponsor)}
                className="w-full py-1.5 rounded-lg text-xs font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function GestionSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vista, setVista] = useState('lista') // 'lista' | 'formulario'

  async function cargarSponsors() {
    setLoading(true)
    const { data, error } = await supabase
      .from('sponsors')
      .select('id, nombre, logo_url')
      .order('nombre')
    if (error) setError(error.message)
    else setSponsors(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    cargarSponsors()
  }, [])

  async function handleEliminar(sponsor) {
    if (!window.confirm(`¿Eliminás a ${sponsor.nombre} de los sponsors?`)) return

    try {
      if (sponsor.logo_url) {
        const url = new URL(sponsor.logo_url)
        const pathParts = url.pathname.split('/sponsors/')
        const fileName = pathParts[1]
        if (fileName) {
          await supabase.storage.from('sponsors').remove([fileName])
        }
      }

      await supabase.from('sponsors').delete().eq('id', sponsor.id)

      cargarSponsors()
    } catch (err) {
      console.error('Error al eliminar sponsor:', err)
    }
  }

  function handleGuardado() {
    setVista('lista')
    cargarSponsors()
  }

  if (vista === 'formulario') {
    return (
      <FormularioSponsor
        onGuardado={handleGuardado}
        onCancelar={() => setVista('lista')}
      />
    )
  }

  return (
    <ListaSponsors
      sponsors={sponsors}
      loading={loading}
      error={error}
      onNuevo={() => setVista('formulario')}
      onEliminar={handleEliminar}
    />
  )
}
