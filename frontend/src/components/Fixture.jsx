// src/components/Fixture.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePartidos } from "../hooks/usePartidos"

// --- HELPERS ---

function getResultado(gk, gr) {
  if (gk === null || gr === null)
    return { texto: "—", color: "text-zinc-500", badge: "Pendiente", badgeColor: "bg-zinc-800 text-zinc-400" }
  if (gk > gr)
    return { texto: `${gk} - ${gr}`, color: "text-green-400", badge: "Victoria", badgeColor: "bg-green-950/60 text-green-400 border border-green-800/40" }
  if (gk === gr)
    return { texto: `${gk} - ${gr}`, color: "text-yellow-400", badge: "Empate", badgeColor: "bg-yellow-950/60 text-yellow-400 border border-yellow-800/40" }
  return { texto: `${gk} - ${gr}`, color: "text-red-400", badge: "Derrota", badgeColor: "bg-red-950/60 text-red-400 border border-red-800/40" }
}

function calcStats(partidos) {
  let g = 0, e = 0, d = 0
  partidos.forEach(({ goles_kikines: gk, goles_rival: gr }) => {
    if (gk === null || gr === null) return
    if (gk > gr) g++
    else if (gk === gr) e++
    else d++
  })
  return `${partidos.length} PJ · ${g}G ${e}E ${d}P`
}

// --- VARIANTES DE ANIMACIÓN ---

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

// --- SUBCOMPONENTE: fila de partido ---

function PartidoRow({ partido }) {
  const [hovered, setHovered] = useState(false)
  const res = getResultado(partido.goles_kikines, partido.goles_rival)
  const goles = partido.goles || []
  const asistencias = partido.asistencias || []

  return (
    <motion.div
      variants={rowVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-b border-zinc-800/50 last:border-b-0"
    >
      {/* Fila principal */}
      <div className="flex items-center justify-between px-5 py-4 gap-4 cursor-default">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <span className="text-xs text-zinc-500 w-20 shrink-0 truncate">
            {partido.fase}
          </span>
          <span className="text-sm font-semibold text-white truncate">
            vs {partido.rival}
          </span>
          {partido.penales && (
            <span className="text-xs text-zinc-500 shrink-0">
              pen. {partido.penales}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-sm font-bold tabular-nums ${res.color}`}>
            {res.texto}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${res.badgeColor}`}>
            {res.badge}
          </span>
        </div>
      </div>

      {/* Panel expandido con Framer Motion */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-3 border-t border-zinc-800/40 bg-zinc-900/50 flex gap-10 flex-wrap">

              {/* Goleadores */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-2.5">
                  Goleadores
                </p>
                {goles.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {goles.map((g, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                        {g.en_contra ? (
                          <span className="text-zinc-500 italic">Gol en contra</span>
                        ) : (
                          <>
                            {g.jugadores
                              ? `${g.jugadores.apellido || g.jugadores.nombre}`
                              : "Jugador desconocido"}
                            {g.cantidad > 1 && (
                              <span className="text-violet-400 text-xs ml-0.5">x{g.cantidad}</span>
                            )}
                            {g.penal && (
                              <span className="text-zinc-500 text-xs ml-0.5">(P)</span>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-600">Sin registro</p>
                )}
              </div>

              {/* Asistidores */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-2.5">
                  Asistidores
                </p>
                {asistencias.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {asistencias.map((a, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                        {a.jugadores
                          ? `${a.jugadores.apellido || a.jugadores.nombre}`
                          : "Jugador desconocido"}
                        {a.cantidad > 1 && (
                          <span className="text-violet-400 text-xs ml-0.5">x{a.cantidad}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-600">Sin registro</p>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// --- COMPONENTE PRINCIPAL ---

export default function Fixture() {
  const { torneos, loading, error } = usePartidos()
  const [torneoActivo, setTorneoActivo] = useState(null)

  // Más reciente primero — sin modificar el array original
  const torneosOrdenados = [...torneos].reverse()

  // Selección activa: explícita o primer torneo por defecto
  const torneoActivoId = torneoActivo ?? torneosOrdenados[0]?.id
  const torneoSeleccionado = torneosOrdenados.find((t) => t.id === torneoActivoId)

  return (
    <section id="fixture" style={{ backgroundColor: "#0a0a0a" }} className="py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B5CF6] mb-3"
          >
            Competencia
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold text-white"
          >
            Fixture
          </motion.h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-zinc-500 text-sm py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full"
            />
            Cargando partidos...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-400 text-sm py-4 px-4 rounded-lg border border-red-900/30 bg-red-950/20">
            Error al cargar los datos: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Tabs de torneos — fuera del motion.div para evitar overflow clipping */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 pb-4 mb-6"
            >
              {torneosOrdenados.map((torneo) => (
                <button
                  key={torneo.id}
                  onClick={() => setTorneoActivo(torneo.id)}
                  className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    torneoActivoId === torneo.id
                      ? "text-white"
                      : "text-[#A1A1AA] border border-zinc-700 hover:border-violet-700/60 hover:text-zinc-200"
                  }`}
                >
                  {torneoActivoId === torneo.id && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-[#7C3AED]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {torneo.nombre}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Stats del torneo seleccionado */}
            <AnimatePresence mode="wait">
              {torneoSeleccionado && (
                <motion.div
                  key={`stats-${torneoActivoId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5"
                >
                  <p className="text-xs text-zinc-500">
                    {torneoSeleccionado.serie && (
                      <span className="text-[#8B5CF6]/70 mr-2">{torneoSeleccionado.serie}</span>
                    )}
                    {calcStats(torneoSeleccionado.partidos)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de partidos */}
            <AnimatePresence mode="wait">
              {torneoSeleccionado && (
                <motion.div
                  key={torneoActivoId}
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="rounded-xl overflow-hidden border border-zinc-800/50"
                  style={{ backgroundColor: "#111111" }}
                >
                  {torneoSeleccionado.partidos.map((partido) => (
                    <PartidoRow key={partido.id} partido={partido} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </>
        )}

      </div>
    </section>
  )
}
