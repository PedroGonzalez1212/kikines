// src/components/Galeria.jsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── DATOS ESTÁTICOS (temporales — se reemplazarán por fetch a Supabase) ─────
// Mezclamos proporciones para simular fotos reales verticales y horizontales
const FOTOS = [
  { id: 1,  url: "https://picsum.photos/seed/kikines1/600/400",  descripcion: "Foto del equipo" },
  { id: 2,  url: "https://picsum.photos/seed/kikines2/400/600",  descripcion: "Partido de local" },
  { id: 3,  url: "https://picsum.photos/seed/kikines3/600/400",  descripcion: "Festejo de gol" },
  { id: 4,  url: "https://picsum.photos/seed/kikines4/400/600",  descripcion: "Entrenamiento" },
  { id: 5,  url: "https://picsum.photos/seed/kikines5/600/400",  descripcion: "Pretemporada" },
  { id: 6,  url: "https://picsum.photos/seed/kikines6/600/400",  descripcion: "Final del torneo" },
  { id: 7,  url: "https://picsum.photos/seed/kikines7/400/600",  descripcion: "Tercer tiempo" },
  { id: 8,  url: "https://picsum.photos/seed/kikines8/600/400",  descripcion: "Cancha de local" },
  { id: 9,  url: "https://picsum.photos/seed/kikines9/400/600",  descripcion: "Equipo 2024" },
]

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ fotos, indice, onCerrar, onAnterior, onSiguiente }) {
  function handleFondo(e) {
    if (e.target === e.currentTarget) onCerrar()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleFondo}
    >
      <button
        onClick={onCerrar}
        className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors text-3xl leading-none"
      >
        ×
      </button>

      {indice > 0 && (
        <button
          onClick={onAnterior}
          className="absolute left-4 md:left-8 text-zinc-400 hover:text-white transition-colors text-4xl leading-none"
        >
          ‹
        </button>
      )}

      <motion.div
        key={indice}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-3 max-w-3xl w-full"
      >
        <img
          src={fotos[indice].url}
          alt={fotos[indice].descripcion}
          className="w-full rounded-xl object-contain"
          style={{ maxHeight: "80vh" }}
        />
        {fotos[indice].descripcion && (
          <p className="text-zinc-400 text-sm">{fotos[indice].descripcion}</p>
        )}
        <p className="text-zinc-600 text-xs">{indice + 1} / {fotos.length}</p>
      </motion.div>

      {indice < fotos.length - 1 && (
        <button
          onClick={onSiguiente}
          className="absolute right-4 md:right-8 text-zinc-400 hover:text-white transition-colors text-4xl leading-none"
        >
          ›
        </button>
      )}
    </motion.div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Galeria() {
  const [indiceAbierto, setIndiceAbierto] = useState(null)

  function abrir(indice) { setIndiceAbierto(indice) }
  function cerrar() { setIndiceAbierto(null) }
  function anterior() { setIndiceAbierto(i => Math.max(0, i - 1)) }
  function siguiente() { setIndiceAbierto(i => Math.min(FOTOS.length - 1, i + 1)) }

  return (
    <section id="galeria" className="py-20 px-4 max-w-5xl mx-auto">

      {/* Título */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white">
          Galería <span className="text-violet-500">de fotos</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Momentos del club a lo largo de los torneos
        </p>
      </motion.div>

      {/*
        CSS Columns — divide el contenedor en 3 columnas verticales.
        Cada foto cae en la columna más corta, respetando su proporción.
        "break-inside-avoid" evita que una foto se corte entre dos columnas.
      */}
      <motion.div
        style={{ columnCount: 3, columnGap: "1rem" }}
        className="sm:[column-count:2] md:[column-count:3] [column-count:1]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {FOTOS.map((foto, indice) => (
          <motion.div
            key={foto.id}
            className="relative rounded-xl overflow-hidden cursor-pointer group mb-4"
            style={{ breakInside: "avoid" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: indice * 0.05 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            onClick={() => abrir(indice)}
          >
            <img
              src={foto.url}
              alt={foto.descripcion}
              className="w-full h-auto block"
            />
            {/* Overlay con descripción al hacer hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {foto.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {indiceAbierto !== null && (
          <Lightbox
            fotos={FOTOS}
            indice={indiceAbierto}
            onCerrar={cerrar}
            onAnterior={anterior}
            onSiguiente={siguiente}
          />
        )}
      </AnimatePresence>

    </section>
  )
}