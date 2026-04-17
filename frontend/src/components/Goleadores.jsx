import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePartidos } from "../hooks/usePartidos";

// REEMPLAZAR la función procesarEstadisticas entera por esta:
function procesarEstadisticas(torneos, torneoId) {
  const golesMap = {}
  const asistMap = {}

  const lista =
    torneoId === "todos"
      ? torneos
      : torneos.filter((t) => String(t.id) === String(torneoId))

  lista.forEach((torneo) => {
    torneo.partidos.forEach((partido) => {
      partido.goles?.forEach(({ jugadores, cantidad, en_contra }) => {
        if (en_contra || !jugadores) return
        const n = `${jugadores.nombre} ${jugadores.apellido}`
        golesMap[n] = (golesMap[n] || 0) + cantidad
      })
      partido.asistencias?.forEach(({ jugadores, cantidad }) => {
        if (!jugadores) return
        const n = `${jugadores.nombre} ${jugadores.apellido}`
        asistMap[n] = (asistMap[n] || 0) + cantidad
      })
    })
  })

  const ordenar = (mapa) =>
    Object.entries(mapa)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total)

  return { goleadores: ordenar(golesMap), asistidores: ordenar(asistMap) }
}

// ─── BARRA ANIMADA ────────────────────────────────────────────────────────────
function BarraJugador({ jugador, posicion, total, maxTotal, delay }) {
  const [ancho, setAncho] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAncho((total / maxTotal) * 100), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAncho(0);
    const timer = setTimeout(() => {
      setAncho((total / maxTotal) * 100);
    }, delay + 50);
    return () => clearTimeout(timer);
  }, [total, maxTotal]);

  const esPodio = posicion <= 3;

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <span
        className="text-sm font-bold w-5 text-right shrink-0"
        style={{ color: esPodio ? "#A855F7" : "#52525b" }}
      >
        {posicion}
      </span>

      <span
        className="text-sm font-medium w-32 shrink-0 truncate transition-colors duration-200 group-hover:text-purple-400"
        style={{ color: esPodio ? "#e4e4e7" : "#a1a1aa" }}
      >
        {jugador}
      </span>

      <div
        className="flex-1 relative h-7 rounded-full overflow-hidden"
        style={{ background: "rgba(124,58,237,0.10)" }}
      >
        <div
          className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700 ease-out"
          style={{
            width: `${ancho}%`,
            background:
              posicion === 1
                ? "linear-gradient(90deg, #6D28D9, #C084FC)"
                : posicion === 2
                ? "linear-gradient(90deg, #5B21B6, #A855F7)"
                : posicion === 3
                ? "linear-gradient(90deg, #4C1D95, #8B5CF6)"
                : "linear-gradient(90deg, #3B1278, #7C3AED)",
            minWidth: ancho > 0 ? "2rem" : "0",
          }}
        >
          {ancho > 12 && (
            <span className="text-white text-xs font-bold">{total}</span>
          )}
        </div>
        {ancho <= 12 && ancho > 0 && (
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold"
            style={{ color: "#A855F7" }}
          >
            {total}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Goleadores() {
  const { torneos, loading, error } = usePartidos()
  const [tab, setTab] = useState("goleadores")
  const [torneoSeleccionado, setTorneoSeleccionado] = useState("todos")

  const estadisticas = procesarEstadisticas(torneos, torneoSeleccionado)
  const lista = estadisticas[tab] ?? []
  const maxTotal = lista[0]?.total ?? 1
  
  if (loading) return (
    <section id="goleadores" className="min-h-screen py-24 px-4 flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full" />
    </section>
  )
  
  if (error) return (
    <section id="goleadores" className="min-h-screen py-24 px-4 flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <p className="text-red-400 text-sm">Error al cargar datos: {error}</p>
    </section>
  )

  return (
    <section
      id="goleadores"
      className="min-h-screen py-24 px-4"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <div className="mb-10">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#7C3AED" }}
          >
            Estadísticas
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Goleadores &{" "}
            <span style={{ color: "#A855F7" }}>Asistidores</span>
          </h2>
        </div>

        {/* Filtro por torneo */}
        <div className="mb-6">
          <select
            value={torneoSeleccionado}
            onChange={(e) => setTorneoSeleccionado(e.target.value)}
            className="text-sm font-medium rounded-xl px-4 py-2 outline-none cursor-pointer transition-all duration-200 appearance-none"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#e4e4e7",
              colorScheme: "dark",
            }}
          >
            <option value="todos" style={{ background: '#1a0a2e', color: '#a1a1aa' }}>Todos los torneos</option>
            {torneos.map((t) => (
              <option key={t.id} value={t.id} style={{ background: '#1a0a2e', color: '#ffffff' }}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "goleadores", label: "⚽ Goleadores" },
            { key: "asistidores", label: "🅰 Asistidores" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                tab === key
                  ? {
                      background: "rgba(124,58,237,0.9)",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                    }
                  : {
                      background: "rgba(124,58,237,0.1)",
                      color: "#a1a1aa",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Lista de jugadores */}
        <div className="flex flex-col gap-3">
          {lista.length === 0 ? (
            <p className="text-center py-12" style={{ color: "#52525b" }}>
              No hay datos para este torneo.
            </p>
          ) : (
            lista.map((jugador, index) => (
              <BarraJugador
                key={`${tab}-${torneoSeleccionado}-${jugador.nombre}`}
                jugador={jugador.nombre}
                posicion={index + 1}
                total={jugador.total}
                maxTotal={maxTotal}
                delay={index * 50}
              />
            ))
          )}
        </div>

        {/* Totales */}
        {lista.length > 0 && (
          <div
            className="mt-10 pt-6 flex gap-8"
            style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#52525b" }}>
                {tab === "goleadores" ? "Total de goles" : "Total de asistencias"}
              </p>
              <p className="text-2xl font-black" style={{ color: "#A855F7" }}>
                {lista.reduce((acc, j) => acc + j.total, 0)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#52525b" }}>
                Jugadores
              </p>
              <p className="text-2xl font-black text-white">{lista.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}