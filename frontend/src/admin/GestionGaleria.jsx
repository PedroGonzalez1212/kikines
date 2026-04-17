// src/admin/GestionGaleria.jsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
const inputStyle = { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }
const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block"

// ─── Formulario subir foto ────────────────────────────────────────────────────
function FormularioFoto({ onGuardado, onCancelar }) {
  const fileInputRef = useRef(null)
  const [fotoFile, setFotoFile] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [descripcion, setDescripcion] = useState('')
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
    if (!fotoFile) {
      setError('Seleccioná una foto antes de guardar.')
      return
    }

    setLoading(true)

    try {
      // 1. Subir foto a Storage
      const ext = fotoFile.name.split('.').pop()
      const fileName = `${Date.now()}_galeria.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('galeria')
        .upload(fileName, fotoFile)

      if (uploadError) throw new Error('Error al subir foto: ' + uploadError.message)

      // 2. Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('galeria')
        .getPublicUrl(fileName)

      const foto_url = urlData?.publicUrl ?? null

      // 3. Insertar en tabla galeria
      const { error: insertError } = await supabase
        .from('galeria')
        .insert({ foto_url, descripcion: descripcion.trim() || null })

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
        <h2 className="text-xl font-black text-white">Subir foto</h2>
      </div>

      <div className="flex flex-col gap-6">

        {/* Preview */}
        <div>
          <label className={labelClass}>Foto *</label>
          <div
            className="w-full h-48 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer transition-colors"
            style={{ background: 'rgba(124,58,237,0.08)', border: '2px dashed rgba(124,58,237,0.3)' }}
            onClick={() => fileInputRef.current?.click()}
          >
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Hacé clic para seleccionar una foto</span>
              </div>
            )}
          </div>
          {fotoFile && (
            <p className="text-xs text-zinc-500 mt-2">{fotoFile.name}</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="hidden"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className={labelClass}>Descripción (opcional)</label>
          <input
            type="text"
            placeholder="Ej: Final del torneo apertura 2024"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            className={inputClass}
            style={inputStyle}
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
            {loading ? 'Subiendo...' : 'Subir foto'}
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

// ─── Grid de fotos ────────────────────────────────────────────────────────────
function ListaGaleria({ fotos, loading, error, onNueva, onEliminar }) {
  if (loading) return (
    <p className="text-zinc-500 text-sm py-8">Cargando galería...</p>
  )

  if (error) return (
    <p className="text-red-400 text-sm py-8">Error: {error}</p>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-white">Galería</h2>
        <button
          onClick={onNueva}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#7C3AED' }}
        >
          + Subir foto
        </button>
      </div>

      {fotos.length === 0 ? (
        <p className="text-zinc-500 text-sm py-8">No hay fotos en la galería todavía.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotos.map(foto => (
            <div
              key={foto.id}
              className="relative rounded-xl overflow-hidden group"
              style={{ border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <img
                src={foto.foto_url}
                alt={foto.descripcion ?? 'Foto galería'}
                className="w-full h-40 object-cover"
              />

              {/* Overlay con descripción y botón eliminar */}
              <div className="absolute inset-0 flex flex-col justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
              >
                {foto.descripcion && (
                  <p className="text-white text-xs px-3 pb-2 leading-tight">{foto.descripcion}</p>
                )}
                <button
                  onClick={() => onEliminar(foto)}
                  className="mx-3 mb-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function GestionGaleria() {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vista, setVista] = useState('lista') // 'lista' | 'formulario'
  const [eliminando, setEliminando] = useState(null) // id de foto en proceso

  async function cargarFotos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('galeria')
      .select('id, foto_url, descripcion')
      .order('id', { ascending: false })
    if (error) setError(error.message)
    else setFotos(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    cargarFotos()
  }, [])

  async function handleEliminar(foto) {
    if (!window.confirm(`¿Eliminás esta foto${foto.descripcion ? ` (${foto.descripcion})` : ''}?`)) return

    setEliminando(foto.id)

    try {
      // Extraer nombre del archivo desde la URL pública
      const url = new URL(foto.foto_url)
      const pathParts = url.pathname.split('/galeria/')
      const fileName = pathParts[1]

      if (fileName) {
        await supabase.storage.from('galeria').remove([fileName])
      }

      await supabase.from('galeria').delete().eq('id', foto.id)

      cargarFotos()
    } finally {
      setEliminando(null)
    }
  }

  function handleGuardado() {
    setVista('lista')
    cargarFotos()
  }

  if (vista === 'formulario') {
    return (
      <FormularioFoto
        onGuardado={handleGuardado}
        onCancelar={() => setVista('lista')}
      />
    )
  }

  return (
    <ListaGaleria
      fotos={fotos}
      loading={loading || eliminando !== null}
      error={error}
      onNueva={() => setVista('formulario')}
      onEliminar={handleEliminar}
    />
  )
}
