// src/admin/AdminLayout.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import Login from './Login'
import CargarPartido from './CargarPartido'
import CrearTorneo from './CrearTorneo'
import ListaPartidos from './ListaPartidos'
import GestionJugadores from './GestionJugadores'
import GestionGaleria from './GestionGaleria'
import GestionSponsors from './GestionSponsors'

const SECCIONES = [
  { key: 'partidos', label: 'Cargar partido' },
  { key: 'torneos', label: 'Crear torneo' },
  { key: 'lista', label: 'Ver partidos' },
  { key: 'jugadores', label: 'Jugadores' },
  { key: 'galeria', label: 'Galería' },
  { key: 'sponsors', label: 'Sponsors' },
]

export default function AdminLayout() {
  const [session, setSession] = useState(undefined)
  const [seccion, setSeccion] = useState('partidos')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-violet-400">Cargando...</p>
      </div>
    )
  }

  if (!session) return <Login />

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-violet-500 text-xs font-bold tracking-widest uppercase mb-1">Panel Admin</p>
            <h1 className="text-xl sm:text-2xl font-black text-white">Club Kikines</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Navegación */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-violet-900/30 pb-4">
          {SECCIONES.map(s => (
            <button
              key={s.key}
              onClick={() => setSeccion(s.key)}
              className="px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all"
              style={seccion === s.key
                ? { background: 'rgba(124,58,237,0.9)', color: '#fff' }
                : { background: 'rgba(124,58,237,0.1)', color: '#a1a1aa' }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {seccion === 'partidos' && <CargarPartido />}
        {seccion === 'torneos' && <CrearTorneo />}
        {seccion === 'lista' && <ListaPartidos />}
        {seccion === 'jugadores' && <GestionJugadores />}
        {seccion === 'galeria' && <GestionGaleria />}
        {seccion === 'sponsors' && <GestionSponsors />}

      </div>
    </div>
  )
}