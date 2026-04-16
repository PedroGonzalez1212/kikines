import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabase'

// ─── Variantes de animación ────────────────────────────────────────────────────

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const lightboxImageVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.2 },
  },
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function Galeria() {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Teclado: Escape + flechas
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedPhoto) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedPhoto, currentIndex, fotos])

  // Bloquear scroll del body cuando el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedPhoto])

  // Carga de datos desde Supabase
  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const { data, error } = await supabase
          .from('galeria')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setFotos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFotos()
  }, [])

  const openLightbox = (foto, index) => {
    setSelectedPhoto(foto)
    setCurrentIndex(index)
  }

  const closeLightbox = () => setSelectedPhoto(null)

  const navigate = (direction) => {
    const newIndex = (currentIndex + direction + fotos.length) % fotos.length
    setCurrentIndex(newIndex)
    setSelectedPhoto(fotos[newIndex])
  }

  // ─── Loading skeleton ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <section id="galeria" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="h-3 w-36 bg-white/5 rounded animate-pulse mx-auto mb-4" />
            <div className="h-10 w-40 bg-white/5 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="w-16 h-1 bg-white/5 rounded-full mx-auto" />
          </div>
          {/* Skeleton masonry con alturas variadas */}
          <div style={{ columns: 'auto', columnWidth: '280px', columnGap: '12px' }}>
            {[180, 260, 140, 220, 300, 160, 240, 190, 270].map((h, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/5 rounded-xl mb-3"
                style={{ height: `${h}px`, breakInside: 'avoid' }}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ─── Error ─────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <section id="galeria" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400 text-sm">Error al cargar la galería: {error}</p>
        </div>
      </section>
    )
  }

  // ─── Render principal ──────────────────────────────────────────────────────

  return (
    <>
      <section id="galeria" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">

          {/* Encabezado */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-violet-400 mb-3">
              Momentos del club
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Galería
            </h2>
            <div className="w-16 h-1 bg-violet-500 mx-auto rounded-full" />
          </motion.div>

          {/* Estado vacío */}
          {fotos.length === 0 ? (
            <p className="text-center text-zinc-500 text-sm py-16">
              Todavía no hay fotos en la galería.
            </p>
          ) : (
            /*
             * Layout Masonry con CSS `columns`
             * ──────────────────────────────────────────────────────────────
             * `columnWidth: '280px'` → el browser calcula cuántas columnas
             * entran en el ancho disponible. En mobile entra 1, en tablet 2,
             * en desktop 3 o más — totalmente automático y responsive.
             *
             * `breakInside: 'avoid'` en cada item → evita que una foto
             * se parta entre dos columnas.
             *
             * `h-auto` en la imagen → respeta la proporción original de
             * cada foto, sin recorte. Eso es lo que genera el efecto masonry.
             * ──────────────────────────────────────────────────────────────
             */
            <div
              style={{
                columns: 'auto',
                columnWidth: '280px',
                columnGap: '12px',
              }}
            >
              {fotos.map((foto, index) => (
                <motion.button
                  key={foto.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  onClick={() => openLightbox(foto, index)}
                  className="group relative w-full mb-3 rounded-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  style={{ breakInside: 'avoid', display: 'block' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={foto.foto_url}
                    alt={foto.descripcion || 'Foto del club'}
                    // h-auto es clave: la imagen mantiene su proporción real
                    // No hay recorte, no hay aspect-square — eso es masonry
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay en hover */}
                  <div className="absolute inset-0 bg-violet-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
                    <svg
                      className="w-7 h-7 text-white/90 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    {foto.descripcion && (
                      <p className="text-white/90 text-xs text-center leading-snug line-clamp-2">
                        {foto.descripcion}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="lightbox-overlay"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm px-4"
            onClick={closeLightbox}
          >
            <motion.div
              key={selectedPhoto.id}
              variants={lightboxImageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.foto_url}
                alt={selectedPhoto.descripcion || 'Foto del club'}
                className="w-full max-h-[82vh] object-contain rounded-xl shadow-2xl shadow-black"
              />

              {selectedPhoto.descripcion && (
                <p className="text-center text-zinc-400 text-sm mt-4 px-2">
                  {selectedPhoto.descripcion}
                </p>
              )}

              <p className="text-center text-zinc-600 text-xs mt-2">
                {currentIndex + 1} / {fotos.length}
              </p>
            </motion.div>

            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Cerrar galería"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flecha izquierda */}
            {fotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Foto anterior"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Flecha derecha */}
            {fotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                aria-label="Foto siguiente"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}