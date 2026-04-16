import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../supabase'

// ── Animaciones ──────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Colores por posición ──────────────────────────────────────
const posicionColor = {
  Arquero:    'text-yellow-400  border-yellow-400/30  bg-yellow-400/10',
  Defensor:   'text-blue-400   border-blue-400/30    bg-blue-400/10',
  Mediocampista: 'text-green-400 border-green-400/30  bg-green-400/10',
  Delantero:  'text-red-400    border-red-400/30     bg-red-400/10',
  DT:         'text-purple-400 border-purple-400/30  bg-purple-400/10',
}

const posicionColorDefault = 'text-violet-400 border-violet-400/30 bg-violet-400/10'

function getPosicionColor(posicion) {
  if (!posicion) return posicionColorDefault
  const key = Object.keys(posicionColor).find(
    (k) => posicion.toLowerCase().includes(k.toLowerCase())
  )
  return key ? posicionColor[key] : posicionColorDefault
}

const posicionOrden = {
  arquero: 1,
  defensor: 2,
  mediocampista: 3,
  delantero: 4,
}

function ordenarPlantel(jugadores) {
  return [...jugadores].sort((a, b) => {
    const posA = posicionOrden[a.posicion?.toLowerCase()] ?? 99
    const posB = posicionOrden[b.posicion?.toLowerCase()] ?? 99
    if (posA !== posB) return posA - posB
    return (a.numero_camiseta ?? 999) - (b.numero_camiseta ?? 999)
  })
}

// ── Avatar placeholder con iniciales ─────────────────────────
function AvatarPlaceholder({ nombre, apellido, size = 'normal' }) {
  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
  const sizeClasses =
    size === 'dt'
      ? 'w-28 h-28 text-3xl'
      : 'w-24 h-24 text-2xl'

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-bold
        bg-gradient-to-br from-violet-700 to-purple-900 text-white border-2 border-violet-500/40
        select-none`}
    >
      {iniciales || '?'}
    </div>
  )
}

// ── Card de jugador ───────────────────────────────────────────
function PlayerCard({ jugador }) {
  const { nombre, apellido, numero_camiseta, posicion, foto_url } = jugador
  const colorClass = getPosicionColor(posicion)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]
        backdrop-blur-sm hover:border-violet-500/30 hover:bg-white/[0.06]
        transition-colors duration-300 group flex flex-col items-center p-6 gap-4"
    >
      {/* Número decorativo de fondo */}
      {numero_camiseta != null && (
        <span
          className="absolute -top-3 -right-1 font-black text-[6rem] leading-none
            text-white/[0.04] select-none pointer-events-none group-hover:text-violet-500/10
            transition-colors duration-300"
        >
          {numero_camiseta}
        </span>
      )}

      {/* Foto o avatar */}
      <div className="relative z-10">
        {foto_url ? (
          <img
            src={foto_url}
            alt={`${nombre} ${apellido}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-violet-500/40
              group-hover:border-violet-400/70 transition-colors duration-300"
          />
        ) : (
          <AvatarPlaceholder nombre={nombre} apellido={apellido} />
        )}
      </div>

      {/* Info */}
      <div className="relative z-10 text-center space-y-1">
        {numero_camiseta != null && (
          <p className="text-xs font-semibold text-violet-400/70 tracking-widest uppercase">
            #{numero_camiseta}
          </p>
        )}
        <h3 className="font-bold text-white text-base leading-tight">
          {nombre} {apellido}
        </h3>
        <span
          className={`inline-block text-xs font-semibold px-3 py-0.5 rounded-full
            border ${colorClass}`}
        >
          {posicion ?? 'Sin posición'}
        </span>
      </div>
    </motion.div>
  )
}

// ── Card del DT (destacada) ───────────────────────────────────
function DTCard({ jugador }) {
  const { nombre, apellido, foto_url } = jugador

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-violet-500/30
        bg-gradient-to-br from-violet-950/60 to-purple-950/40 backdrop-blur-sm
        hover:border-violet-400/50 transition-all duration-300
        flex flex-col sm:flex-row items-center gap-6 p-8 max-w-sm mx-auto w-full"
    >
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />

      {foto_url ? (
        <img
          src={foto_url}
          alt={`${nombre} ${apellido}`}
          className="relative z-10 w-28 h-28 rounded-full object-cover
            border-2 border-violet-400/60 flex-shrink-0"
        />
      ) : (
        <div className="relative z-10 flex-shrink-0">
          <AvatarPlaceholder nombre={nombre} apellido={apellido} size="dt" />
        </div>
      )}

      <div className="relative z-10 text-center sm:text-left space-y-1">
        <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase">
          Director Técnico
        </p>
        <h3 className="text-2xl font-black text-white">
          {nombre} {apellido}
        </h3>
        <span className="inline-block text-xs font-semibold px-3 py-0.5 rounded-full
          border text-purple-400 border-purple-400/30 bg-purple-400/10">
          DT
        </span>
      </div>
    </motion.div>
  )
}

// ── Skeleton loading ──────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 flex flex-col items-center gap-4 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-white/10" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <div className="h-3 w-16 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/10 rounded" />
        <div className="h-5 w-20 bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────
export default function Plantel() {
  const [jugadores, setJugadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchJugadores() {
      setLoading(true)
      const { data, error } = await supabase
        .from('jugadores')
        .select('*')
        .eq('activo', true)
        .order('apellido')

      if (error) {
        setError(error.message)
      } else {
        setJugadores(data ?? [])
      }
      setLoading(false)
    }

    fetchJugadores()
  }, [])

  // Separar DT del resto
  const dt = jugadores.find(
    (j) => j.posicion?.toLowerCase() === 'dt'
  )
  const plantel = ordenarPlantel(
    jugadores.filter((j) => j.posicion?.toLowerCase() !== 'dt')
  )

  return (
    <section id="plantel" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
          bg-violet-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Título */}
        <motion.div
          className="text-center mb-16 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <p className="text-xs font-semibold text-violet-400 tracking-[0.3em] uppercase">
            Temporada actual
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            El{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              Plantel
            </span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Los jugadores que visten los colores del Club Kikines
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 text-sm mb-8">
            Error al cargar el plantel: {error}
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Contenido cargado */}
        {!loading && !error && (
          <>
            {/* DT */}
            {dt && (
              <motion.div
                className="mb-12 flex justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                <DTCard jugador={dt} />
              </motion.div>
            )}

            {/* Separador */}
            {dt && plantel.length > 0 && (
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">
                  Jugadores
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            )}

            {/* Grilla de jugadores */}
            {plantel.length > 0 && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                {plantel.map((jugador) => (
                  <PlayerCard key={jugador.id} jugador={jugador} />
                ))}
              </motion.div>
            )}

            {/* Estado vacío */}
            {!dt && plantel.length === 0 && (
              <p className="text-center text-zinc-500 py-16">
                No hay jugadores cargados aún.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}