// src/hooks/usePartidos.js
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

/**
 * Custom hook que trae todos los torneos con sus partidos,
 * goles y asistencias anidados desde Supabase.
 *
 * Retorna:
 *   - torneos: array con la estructura completa
 *   - loading: boolean mientras se cargan los datos
 *   - error: string con el mensaje de error, o null
 */
export function usePartidos() {
  const [torneos, setTorneos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      const { data, error: sbError } = await supabase
        .from('torneos')
        .select(`
          id,
          nombre,
          serie,
          anio,
          partidos (
            id,
            fase,
            rival,
            goles_kikines,
            goles_rival,
            penales,
            goles (
              id,
              cantidad,
              penal,
              en_contra,
              jugadores ( id, nombre, apellido )
            ),
            asistencias (
              id,
              cantidad,
              jugadores ( id, nombre, apellido )
            )
          )
        `)
        .order('anio', { ascending: true })
        .order('id', { referencedTable: 'partidos', ascending: true })

      if (sbError) {
        setError(sbError.message)
        setLoading(false)
        return
      }

      setTorneos(data || [])
      setLoading(false)
    }

    fetchData()
  }, []) // [] = solo se ejecuta una vez, cuando el componente que usa este hook se monta

  return { torneos, loading, error }
}