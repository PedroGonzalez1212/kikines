// src/components/Footer.jsx
import { motion } from "framer-motion"
import logo from "../assets/logos/kik-aguila-sola.webp"

const links = [
  { label: "Quienes somos", id: "quienes-somos" },
  { label: "Fixture",       id: "fixture" },
  { label: "Rendimiento",   id: "rendimiento" },
  { label: "Plantel",       id: "plantel" },
  { label: "Goleadores",    id: "goleadores" },
  { label: "Galeria",       id: "galeria" },
  { label: "Sponsors",      id: "sponsors" },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="border-t border-violet-900/30 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-16">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Club Kikines" className="h-10 w-auto" />
              <span className="text-white font-black text-xl">Kikines</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Club de futbol amateur.
            </p>
            <a
              href="https://instagram.com/kikines__"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              <span>@kikines__</span>
            </a>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Navegacion
            </p>
            <ul className="flex flex-col gap-2">
              {links.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-zinc-400 hover:text-violet-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Club
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/admin"
                  className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
                >
                  Panel administrador
                </a>
              </li>
            </ul>
          </div>

        </motion.div>

        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
        />

        <motion.p
          className="text-center text-zinc-600 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {String.fromCharCode(169) + " " + anio + "Kikines · Cordoba, Argentina"}
        </motion.p>

      </div>
    </footer>
  )
}