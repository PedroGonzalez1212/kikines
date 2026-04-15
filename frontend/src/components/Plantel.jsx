// src/components/Plantel.jsx
import { motion } from "framer-motion"

// ─── DATOS ESTÁTICOS (temporales — se reemplazarán por fetch a Supabase) ─────
const DT = {
  nombre: "Santi Moyano",
  foto_url: null,
}

const JUGADORES = [
  // Arqueros
  { id: 1,  nombre: "Arquero",     numero: 1,  posicion: "Arquero" },
  // Defensores
  { id: 2,  nombre: "Sarmiento",   numero: 2,  posicion: "Defensor" },
  { id: 3,  nombre: "Ponce",       numero: 3,  posicion: "Defensor" },
  { id: 4,  nombre: "Correa",      numero: 4,  posicion: "Defensor" },
  { id: 5,  nombre: "Peralta",     numero: 16, posicion: "Defensor" },
  // Mediocampistas
  { id: 6,  nombre: "Egea",        numero: 5,  posicion: "Mediocampista" },
  { id: 7,  nombre: "Maiquez",     numero: 6,  posicion: "Mediocampista" },
  { id: 8,  nombre: "Bambozzi",    numero: 8,  posicion: "Mediocampista" },
  { id: 9,  nombre: "Lizarraga",   numero: 14, posicion: "Mediocampista" },
  { id: 10, nombre: "Gonzalez L",  numero: 17, posicion: "Mediocampista" },
  { id: 11, nombre: "Vasconi",     numero: 18, posicion: "Mediocampista" },
  // Delanteros
  { id: 12, nombre: "Demaría",     numero: 7,  posicion: "Delantero" },
  { id: 13, nombre: "Bianco",      numero: 10, posicion: "Delantero" },
  { id: 14, nombre: "Vazquez",     numero: 11, posicion: "Delantero" },
  { id: 15, nombre: "Otero",       numero: 15, posicion: "Delantero" },
  { id: 16, nombre: "Pernochi",    numero: 9,  posicion: "Delantero" },
  { id: 17, nombre: "Miranda",     numero: 19, posicion: "Delantero" },
]

const ORDEN_POSICION = ["Arquero", "Defensor", "Mediocampista", "Delantero"]

const JUGADORES_ORDENADOS = [...JUGADORES].sort((a, b) => {
  const posA = ORDEN_POSICION.indexOf(a.posicion)
  const posB = ORDEN_POSICION.indexOf(b.posicion)
  if (posA !== posB) return posA - posB
  return a.numero - b.numero
})

// Color por posición
const POSICION_COLOR = {
  "Arquero":        { bg: "rgba(234,179,8,0.15)",   text: "#EAB308" },
  "Defensor":       { bg: "rgba(59,130,246,0.15)",  text: "#60A5FA" },
  "Mediocampista":  { bg: "rgba(124,58,237,0.15)",  text: "#A78BFA" },
  "Delantero":      { bg: "rgba(239,68,68,0.15)",   text: "#F87171" },
}

// ─── AVATAR PLACEHOLDER ───────────────────────────────────────────────────────
// Muestra las iniciales del jugador cuando no hay foto
function Avatar({ nombre, size = "md", esDT = false }) {
  const iniciales = nombre
    .split(" ")
    .map(p => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const sizes = {
    sm: "w-16 h-16 text-lg",
    md: "w-20 h-20 text-xl",
    lg: "w-28 h-28 text-3xl",
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-black shrink-0`}
      style={{
        background: esDT
          ? "linear-gradient(135deg, #7C3AED, #C084FC)"
          : "linear-gradient(135deg, #27272a, #3f3f46)",
        border: esDT ? "3px solid #A855F7" : "2px solid rgba(124,58,237,0.3)",
      }}
    >
      <span style={{ color: esDT ? "#fff" : "#a1a1aa" }}>{iniciales}</span>
    </div>
  )
}

// ─── CARD DEL DT ─────────────────────────────────────────────────────────────
function CardDT({ dt }) {
  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }}
      className="relative rounded-2xl p-6 flex items-center gap-6 mb-10"
      style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
        border: "1px solid rgba(124,58,237,0.35)",
      }}
    >
      {/* Detalle decorativo */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
        style={{ background: "linear-gradient(180deg, #7C3AED, #C084FC)" }}
      />

      {dt.foto_url ? (
        <img
          src={dt.foto_url}
          alt={dt.nombre}
          className="w-28 h-28 rounded-full object-cover shrink-0"
          style={{ border: "3px solid #A855F7" }}
        />
      ) : (
        <Avatar nombre={dt.nombre} size="lg" esDT />
      )}

      <div>
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#A855F7" }}
        >
          Director Técnico
        </span>
        <h3 className="text-2xl font-black text-white mt-1">{dt.nombre}</h3>
      </div>
    </motion.div>
  )
}

// ─── CARD DE JUGADOR ─────────────────────────────────────────────────────────
function CardJugador({ jugador }) {
  const colores = POSICION_COLOR[jugador.posicion] || POSICION_COLOR["Mediocampista"]

  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Número de camiseta */}
      <span
        className="text-xs font-black"
        style={{ color: "rgba(124,58,237,0.5)" }}
      >
        #{jugador.numero}
      </span>

      {/* Foto o avatar */}
      {jugador.foto_url ? (
        <img
          src={jugador.foto_url}
          alt={jugador.nombre}
          className="w-20 h-20 rounded-full object-cover"
          style={{ border: "2px solid rgba(124,58,237,0.3)" }}
        />
      ) : (
        <Avatar nombre={jugador.nombre} size="md" />
      )}

      {/* Nombre */}
      <p className="text-white font-bold text-sm text-center">{jugador.nombre}</p>

      {/* Posición */}
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: colores.bg, color: colores.text }}
      >
        {jugador.posicion}
      </span>
    </motion.div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Plantel() {
  return (
    <section id="plantel" className="py-20 px-4 max-w-5xl mx-auto">

      {/* Título */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white">
          El <span className="text-violet-500">Plantel</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Cuerpo técnico y jugadores del club
        </p>
      </motion.div>

      {/* Card DT */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <CardDT dt={DT} />
      </motion.div>

      {/* Grid de jugadores */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {JUGADORES_ORDENADOS.map(jugador => (
          <CardJugador key={jugador.id} jugador={jugador} />
        ))}
      </motion.div>

    </section>
  )
}