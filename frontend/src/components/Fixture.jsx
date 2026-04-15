// src/components/Fixture.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { torneos } from '../data/fixture'

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
// Son objetos que definen los estados de una animación.
// "initial" = cómo empieza, "animate" = cómo termina, "exit" = cómo sale

const fadeUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08, // cada hijo se anima 0.08s después del anterior
    },
  },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// --- SUBCOMPONENTE: detalle de un partido ---

function PartidoItem({ partido }) {
  const res = getResultado(partido.goles_kikines, partido.goles_rival)

  return (
    <div className="group border-b border-violet-900/20 last:border-b-0">

      {/* Fila principal */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-4">
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

      {/* Detalle con hover */}
      {(partido.goleadores.length > 0 || partido.asistidores.length > 0) && (
        <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
          <div className="px-5 pb-4 pt-1 bg-zinc-900/50 flex gap-8 flex-wrap border-t border-violet-900/20">

            <div>
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Goleadores
              </p>
              <ul className="flex flex-col gap-1">
                {partido.goleadores.map((g, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                    {g.enContra ? (
                      <span className="text-zinc-500 italic">Gol en contra</span>
                    ) : (
                      <>
                        {g.jugador}
                        {g.cantidad > 1 && <span className="text-violet-400 text-xs"> x{g.cantidad}</span>}
                        {g.penal && <span className="text-zinc-500 text-xs"> (P)</span>}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {partido.asistidores.length > 0 && (
              <div>
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Asistidores
                </p>
                <ul className="flex flex-col gap-1">
                  {partido.asistidores.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {a.jugador}
                      {a.cantidad > 1 && <span className="text-violet-400 text-xs"> x{a.cantidad}</span>}
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
    // motion.div reemplaza al div normal — le agrega capacidades de animación
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
              {torneo.serie && <span className="text-violet-500/70 mr-2">{torneo.serie}</span>}
              {calcStats(torneo.partidos)}
            </p>
          </div>
        </div>
        {/* El ícono rota con una transición de Framer Motion */}
        <motion.span
          animate={{ rotate: abierto ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-500 text-xs"
        >
          ▼
        </motion.span>
      </button>

      {/* AnimatePresence permite animar elementos cuando desaparecen del DOM */}
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
  return (
    <section id="fixture" className="py-20 px-4 max-w-3xl mx-auto">

      {/* Título animado al entrar al viewport */}
      {/* whileInView se activa cuando el elemento es visible en pantalla */}
      {/* viewport once:true significa que se anima solo la primera vez */}
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

      {/* Contenedor con stagger — anima los hijos en cascada */}
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

    </section>
  )
}