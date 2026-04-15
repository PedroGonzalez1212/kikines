// src/components/Sponsors.jsx
import { motion } from "framer-motion"

// ─── DATOS ESTÁTICOS (temporales — se reemplazarán por fetch a Supabase) ─────
const SPONSORS = [
  { id: 1, nombre: "Sponsor 1", logo_url: "https://picsum.photos/seed/sp1/200/100", url: "https://google.com" },
  { id: 2, nombre: "Sponsor 2", logo_url: "https://picsum.photos/seed/sp2/200/100", url: "https://google.com" },
  { id: 3, nombre: "Sponsor 3", logo_url: "https://picsum.photos/seed/sp3/200/100", url: "https://google.com" },
  { id: 4, nombre: "Sponsor 4", logo_url: "https://picsum.photos/seed/sp4/200/100", url: "https://google.com" },
  { id: 5, nombre: "Sponsor 5", logo_url: "https://picsum.photos/seed/sp5/200/100", url: "https://google.com" },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-20 px-4 max-w-5xl mx-auto">

      {/* Título */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white">
          Nuestros <span className="text-violet-500">Sponsors</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Gracias a quienes hacen posible al club
        </p>
      </motion.div>

      {/* Separador superior */}
      <div
        className="w-full h-px mb-12"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
      />

      {/* Logos en fila */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {SPONSORS.map(sponsor => (
          <motion.a
            key={sponsor.id}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            className="block"
            title={sponsor.nombre}
          >
            <img
              src={sponsor.logo_url}
              alt={sponsor.nombre}
              className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              style={{ opacity: 0.6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Separador inferior */}
      <div
        className="w-full h-px mt-12"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
      />

    </section>
  )
}