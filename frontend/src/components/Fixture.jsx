// src/components/Fixture.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePartidos } from "../hooks/usePartidos"

// --- HELPERS ---

function getResultado(gk, gr) {
  if (gk > gr) return { texto: `${gk} - ${gr}`, color: "text-green-400" }
  if (gk === gr) return { texto: `${gk} - ${gr}`, color: "text-yellow-400" }
  return { texto: `${gk} - ${gr}`, color: "text-red-400" }
}

function calcStats(partidos) {
  let g = 0, e = 0, d = 0
  partidos.forEach(({ goles_kikines: gk, goles_rival: gr }) => {
    if (gk === null || gr === null) return
    if (gk > gr) g++
    else if (gk === gr) e++
    else d++
  })
  return `${partidos.length} partidos · ${g}G ${e}E ${d}P`
}

// --- VARIANTES DE ANIMACIÓN ---

const fadeUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// --- SUBCOMPONENTE: detalle de un partido ---

function PartidoItem({ partido }) {
  const res = getResultado(partido.goles_kikines, partido.goles_rival)

  // Supabase devuelve partido.goles y partido.asistencias
  // Cada gol tiene: cantidad, penal, en_contra, jugadores: { nombre, apellido }
  const goles = partido.goles || []
  const asistencias = partido.asistencias || []

  const tieneDetalle = goles.length > 0 || asistencias.length > 0

  return (
    <div className="group border-b border-violet-900/20 last:border-b-0">

      {/* Fila principal */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-medium text-zinc-500 w-24 shrink-0">
            {partido.fase}
          </span>
          <span className="text-sm font-medium text-white">
            vs {partido.rival}
          </span>
          <span className={`text-sm font-bold ${res.color}`}>
            {res.texto}
          </span>
          {partido.penales && (
            <span className="text-xs text-zinc-500">
              (pen. {partido.penales})
            </span>
          )}
        </div>
      </div>

      {/* Detalle con hover — solo si hay goles o asistencias */}
      {tieneDetalle && (
        <div className="max-h-0 overflow-hidden group-hover:max-h-60 transition-all duration-300 ease-in-out">
          <div className="px-5 pb-4 pt-1 bg-zinc-900/50 flex gap-8 flex-wrap border-t border-violet-900/20">

            {goles.length > 0 && (
              <div>
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Goleadores
                </p>
                <ul className="flex flex-col gap-1">
                  {goles.map((g, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {g.en_contra ? (
                        <span className="text-zinc-500 italic">Gol en contra</span>
                      ) : (
                        <>
                          {g.jugadores
                            ? `${g.jugadores.nombre} ${g.jugadores.apellido}`
                            : "Jugador desconocido"}
                          {g.cantidad > 1 && (
                            <span className="text-violet-400 text-xs"> x{g.cantidad}</span>
                          )}
                          {g.penal && (
                            <span className="text-zinc-500 text-xs"> (P)</span>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {asistencias.length > 0 && (
              <div>
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Asistencias
                </p>
                <ul className="flex flex-col gap-1">
                  {asistencias.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {a.jugadores
                        ? `${a.jugadores.nombre} ${a.jugadores.apellido}`
                        : "Jugador desconocido"}
                      {a.cantidad > 1 && (
                        <span className="text-violet-400 text-xs"> x{a.cantidad}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

// --- SUBCOMPONENTE: un torneo completo ---

function TorneoCard({ torneo }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border border-violet-900/30 rounded-xl overflow-hidden mb-3"
    >
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900 hover:bg-zinc-800/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-violet-950 text-violet-400 border border-violet-800/50">
            {torneo.anio}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{torneo.nombre}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {torneo.serie && (
                <span className="text-violet-500/70 mr-2">{torneo.serie}</span>
              )}
              {calcStats(torneo.partidos)}
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: abierto ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-500 text-xs"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-violet-900/20 bg-zinc-950">
              {torneo.partidos.map((partido) => (
                <PartidoItem key={partido.id} partido={partido} />
              ))}
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

  return (
    <section id="fixture" className="py-20 px-4 max-w-3xl mx-auto">

      {/* Título */}
      <motion.div
        className="mb-10"
        variants={fadeUpVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white">
          Fixture <span className="text-violet-500">&amp; Resultados</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Historial de torneos, fechas y partidos del club
        </p>
      </motion.div>

      {/* Estado de carga */}
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

      {/* Estado de error */}
      {error && (
        <div className="text-red-400 text-sm py-4 px-4 rounded-lg border border-red-900/30 bg-red-950/20">
          Error al cargar los datos: {error}
        </div>
      )}

      {/* Lista de torneos — más reciente primero */}
      {!loading && !error && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[...torneos].reverse().map((torneo) => (
            <TorneoCard key={torneo.id} torneo={torneo} />
          ))}
        </motion.div>
      )}

    </section>
  )
}