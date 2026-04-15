// src/components/Rendimiento.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { FIXTURE_DATA } from "./Goleadores";



// ─── LÓGICA DE DATOS ─────────────────────────────────────────────────────────
function calcularStats(fixture, torneoId) {
  let ganados = 0, empatados = 0, perdidos = 0;
  let golesFavor = 0, golesContra = 0;

  const torneosFiltrados =
    torneoId === "todos"
      ? fixture
      : fixture.filter((t) => t.id === parseInt(torneoId));

  torneosFiltrados.forEach((torneo) => {
    torneo.fechas.forEach((fecha) => {
      fecha.partidos.forEach(({ goles_kikines: gk, goles_rival: gr }) => {
        if (gk === null || gr === null) return;
        golesFavor += gk;
        golesContra += gr;
        if (gk > gr) ganados++;
        else if (gk === gr) empatados++;
        else perdidos++;
      });
    });
  });

  const jugados = ganados + empatados + perdidos;
  return { ganados, empatados, perdidos, jugados, golesFavor, golesContra };
}

// Arma los datos para el gráfico de barras por torneo
function calcularPorTorneo(fixture) {
  return fixture.map((torneo) => {
    let g = 0, e = 0, p = 0;
    torneo.fechas.forEach((fecha) => {
      fecha.partidos.forEach(({ goles_kikines: gk, goles_rival: gr }) => {
        if (gk === null || gr === null) return;
        if (gk > gr) g++;
        else if (gk === gr) e++;
        else p++;
      });
    });
    // Nombre corto para que entre en el eje X
    const nombre = torneo.nombre.replace("LIGUILLA", "LIG").replace("CLAUSURA", "CL").replace("APERTURA", "AP");
    return { nombre, Ganados: g, Empatados: e, Perdidos: p };
  });
}

// ─── TOOLTIP PERSONALIZADO ────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm"
      style={{ background: "#18181b", border: "1px solid rgba(124,58,237,0.4)" }}
    >
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.fill }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

// ─── TARJETA DE ESTADÍSTICA ───────────────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
      className="rounded-2xl p-5 flex flex-col gap-1"
      style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)" }}
    >
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</span>
      <span className="text-4xl font-black" style={{ color }}>{value}</span>
      {sub && <span className="text-xs text-zinc-600">{sub}</span>}
    </motion.div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Rendimiento() {
  const [torneoId, setTorneoId] = useState("todos");

  const stats = calcularStats(FIXTURE_DATA, torneoId);
  const datosGrafico = calcularPorTorneo(FIXTURE_DATA);

  const pct = (n) =>
    stats.jugados > 0 ? Math.round((n / stats.jugados) * 100) : 0;

  return (
    <section id="rendimiento" className="py-20 px-4 max-w-5xl mx-auto">

      {/* Título */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white">
          Rendimiento <span className="text-violet-500">del equipo</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Estadísticas de resultados a lo largo de los torneos
        </p>
      </motion.div>

      {/* Selector de torneo */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <select
          value={torneoId}
          onChange={(e) => setTorneoId(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
        >
          <option value="todos">Todos los torneos</option>
          {[...FIXTURE_DATA].reverse().map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Tarjetas de stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12"
        variants={{ animate: { transition: { staggerChildren: 0.07 } } }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <StatCard label="Jugados"    value={stats.jugados}      color="#a1a1aa" />
        <StatCard label="Ganados"    value={stats.ganados}      color="#4ade80" sub={`${pct(stats.ganados)}%`} />
        <StatCard label="Empatados"  value={stats.empatados}    color="#facc15" sub={`${pct(stats.empatados)}%`} />
        <StatCard label="Perdidos"   value={stats.perdidos}     color="#f87171" sub={`${pct(stats.perdidos)}%`} />
        <StatCard label="GF"         value={stats.golesFavor}   color="#a78bfa" sub="Goles a favor" />
        <StatCard label="GC"         value={stats.golesContra}  color="#f87171" sub="Goles en contra" />
      </motion.div>

      {/* Gráfico de barras — solo visible en "Todos los torneos" */}
      {torneoId === "todos" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl p-6"
          style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}
        >
          <p className="text-sm font-semibold text-zinc-400 mb-6 uppercase tracking-wider">
            Resultados por torneo
          </p>
          {/* ResponsiveContainer hace que el gráfico se adapte al ancho del contenedor */}
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={datosGrafico} barCategoryGap="30%" barGap={3}>
              {/* XAxis = eje horizontal con los nombres de torneos */}
              <XAxis
                dataKey="nombre"
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              {/* YAxis = eje vertical con números */}
              <YAxis
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124,58,237,0.05)" }} />
              {/* Cada <Bar> es una columna. dataKey conecta con la propiedad del objeto de datos */}
              <Bar dataKey="Ganados"   fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Empatados" fill="#facc15" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Perdidos"  fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Leyenda manual */}
          <div className="flex gap-5 mt-4 justify-center">
            {[
              { label: "Ganados",   color: "#4ade80" },
              { label: "Empatados", color: "#facc15" },
              { label: "Perdidos",  color: "#f87171" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                <span className="text-xs text-zinc-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vista de torneo individual: mini resumen visual */}
      {torneoId !== "todos" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-6"
          style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}
        >
          <p className="text-sm font-semibold text-zinc-400 mb-5 uppercase tracking-wider">
            Distribución de resultados
          </p>
          <div className="flex flex-col gap-4">
            {[
              { label: "Ganados",   value: stats.ganados,   color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
              { label: "Empatados", value: stats.empatados, color: "#facc15", bg: "rgba(250,204,21,0.15)" },
              { label: "Perdidos",  value: stats.perdidos,  color: "#f87171", bg: "rgba(248,113,113,0.15)" },
            ].map(({ label, value, color, bg }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color }} className="font-semibold">{label}</span>
                  <span className="text-zinc-500">{value} partido{value !== 1 ? "s" : ""} · {pct(value)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct(value)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </section>
  );
}