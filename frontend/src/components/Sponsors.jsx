// src/components/Sponsors.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "../supabase"

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from('sponsors')
        .select('id, nombre, logo_url')
        .order('nombre')
      setSponsors(data ?? [])
      setLoading(false)
    }
    cargar()
  }, [])

  if (loading || sponsors.length === 0) return null

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
        {sponsors.map(sponsor => (
          <motion.div
            key={sponsor.id}
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
          </motion.div>
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
