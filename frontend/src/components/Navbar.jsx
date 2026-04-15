import { useState, useEffect } from 'react'
import logo from '../assets/logos/kik-aguila-sola.webp'

const links = [
  { label: 'Quiénes somos', id: 'quienes-somos' },
  { label: 'Fixture', id: 'fixture' },
  { label: 'Rendimiento', id: 'rendimiento' },
  { label: 'Plantel', id: 'plantel' },
  { label: 'Goleadores', id: 'goleadores' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Sponsors', id: 'sponsors' },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (id) => {
    scrollToSection(id)
    setMenuAbierto(false)
  }

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#0a0a0a] border-b border-violet-900/40'
        : 'bg-transparent border-b border-transparent'
    }`}>

      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={logo} alt="Club Kikines" className="h-10 w-auto" />
          <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
            Kikines
          </span>
        </div>

        {/* Links — solo visible en desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleLinkClick(link.id)}
                className="px-3 py-2 text-sm text-gray-400 hover:text-violet-400 hover:bg-violet-950/40 rounded-md transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa — solo visible en mobile */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          aria-label="Abrir menú"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuAbierto ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Menú mobile desplegable */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuAbierto ? 'max-h-96' : 'max-h-0'}`}>
        <ul className={`flex flex-col px-6 pb-4 gap-1 border-t border-violet-900/40 ${
          scrolled ? 'bg-[#0a0a0a]' : 'bg-black/70 backdrop-blur-sm'
        }`}>
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left px-3 py-3 text-sm text-gray-400 hover:text-violet-400 hover:bg-violet-950/40 rounded-md transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}