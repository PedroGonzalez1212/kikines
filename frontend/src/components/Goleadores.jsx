import { useState, useEffect, useRef } from "react";

// ─── FIXTURE REAL (generado desde kikines_actualizado.xlsx) ──────────────────
// 7 torneos: LIGUILLA 23, CLAUSURA 23, APERTURA 24, CLAUSURA 24,
//            APERTURA 25, CLAUSURA 25, APERTURA 26
// Cuando conectes el backend, reemplazás este array por un fetch a tu API.

export const FIXTURE_DATA = [
  {
    id: 1, nombre: "LIGUILLA 23", anio: 2023,
    fechas: [
      { id: 1, numero_fecha: "Fecha 1", partidos: [{ id: 1, rival: "Aston Birra", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 2 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
      { id: 2, numero_fecha: "Fecha 2", partidos: [{ id: 2, rival: "Parquelona", goles_kikines: 1, goles_rival: 3, goleadores: [{ jugador: "Zulueta", cantidad: 1 }], asistidores: [] }] },
      { id: 3, numero_fecha: "Fecha 3", partidos: [{ id: 3, rival: "Cidecor", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Sibilla", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
      { id: 4, numero_fecha: "Cuartos", partidos: [{ id: 4, rival: "Tomba Libre", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Bianco", cantidad: 2 }, { jugador: "Bobán", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Ponce", cantidad: 1 }, { jugador: "Egea", cantidad: 1 }] }] },
      { id: 5, numero_fecha: "Semis", partidos: [{ id: 5, rival: "Aston Birra", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Lizarraga", cantidad: 1 }, { jugador: "Egea", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
      { id: 6, numero_fecha: "Final", partidos: [{ id: 6, rival: "La Vuelta", goles_kikines: 1, goles_rival: 1, goleadores: [{ jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
    ]
  },
  {
    id: 2, nombre: "CLAUSURA 23", anio: 2023,
    fechas: [
      { id: 7, numero_fecha: "Fecha 1", partidos: [{ id: 7, rival: "Border", goles_kikines: 1, goles_rival: 2, goleadores: [{ jugador: "Otero", cantidad: 1 }], asistidores: [{ jugador: "Demaría", cantidad: 1 }] }] },
      { id: 8, numero_fecha: "Fecha 2", partidos: [{ id: 8, rival: "Gárgolas", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Otero", cantidad: 1 }, { jugador: "Maiquez", cantidad: 1 }], asistidores: [{ jugador: "Demaría", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }] }] },
      { id: 9, numero_fecha: "Fecha 3", partidos: [{ id: 9, rival: "Per Saltum", goles_kikines: 5, goles_rival: 1, goleadores: [{ jugador: "Lizarraga", cantidad: 1 }, { jugador: "Otero", cantidad: 2 }, { jugador: "Egea", cantidad: 1 }, { jugador: "Mala", cantidad: 1 }], asistidores: [{ jugador: "Del Franco", cantidad: 1 }, { jugador: "Bianco", cantidad: 2 }] }] },
      { id: 10, numero_fecha: "Fecha 4", partidos: [{ id: 10, rival: "Pope", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Maiquez", cantidad: 1 }, { jugador: "Egea", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi I", cantidad: 1 }, { jugador: "Ledesma", cantidad: 1 }] }] },
      { id: 11, numero_fecha: "Fecha 5", partidos: [{ id: 11, rival: "Yeri", goles_kikines: 0, goles_rival: 3, goleadores: [], asistidores: [] }] },
      { id: 12, numero_fecha: "Fecha 6", partidos: [{ id: 12, rival: "Cuota Fija", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Bobán", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Vazquez", cantidad: 1 }] }] },
      { id: 13, numero_fecha: "Fecha 7", partidos: [{ id: 13, rival: "Acme", goles_kikines: 0, goles_rival: 1, goleadores: [], asistidores: [] }] },
      { id: 14, numero_fecha: "Fecha 8", partidos: [{ id: 14, rival: "Torino", goles_kikines: 6, goles_rival: 3, goleadores: [{ jugador: "Maiquez", cantidad: 1 }, { jugador: "Vazquez", cantidad: 3 }, { jugador: "Mala", cantidad: 1 }, { jugador: "Egea", cantidad: 1 }], asistidores: [{ jugador: "Egea", cantidad: 2 }, { jugador: "Bambozzi I", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }, { jugador: "Gonzalez", cantidad: 1 }] }] },
      { id: 15, numero_fecha: "Fecha 9", partidos: [{ id: 15, rival: "La Vuelta", goles_kikines: 1, goles_rival: 2, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }], asistidores: [] }] },
      { id: 16, numero_fecha: "Fecha 10", partidos: [{ id: 16, rival: "Fratelli", goles_kikines: 4, goles_rival: 1, goleadores: [{ jugador: "Sucheki", cantidad: 1 }, { jugador: "Otero", cantidad: 1 }, { jugador: "Vazquez", cantidad: 1 }], asistidores: [{ jugador: "Del Franco", cantidad: 1 }, { jugador: "Gonzalez", cantidad: 1 }] }] },
      { id: 17, numero_fecha: "Fecha 11", partidos: [{ id: 17, rival: "Corona", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Egea", cantidad: 1 }, { jugador: "Otero", cantidad: 1 }], asistidores: [{ jugador: "Russo", cantidad: 1 }] }] },
      { id: 18, numero_fecha: "Fecha 12", partidos: [{ id: 18, rival: "Trinidad y EV", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }], asistidores: [] }] },
      { id: 19, numero_fecha: "Fecha 13", partidos: [{ id: 19, rival: "La Aldea", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Vazquez", cantidad: 2 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }] }] },
      { id: 20, numero_fecha: "Fecha 14", partidos: [{ id: 20, rival: "Vodka Jrs", goles_kikines: 2, goles_rival: 2, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Mala", cantidad: 1 }], asistidores: [] }] },
      { id: 21, numero_fecha: "Fecha 15", partidos: [{ id: 21, rival: "La Esencia", goles_kikines: 2, goles_rival: 2, goleadores: [{ jugador: "Bianco", cantidad: 1 }, { jugador: "Maiquez", cantidad: 1 }], asistidores: [{ jugador: "Tirao", cantidad: 1 }] }] },
      { id: 22, numero_fecha: "Cuartos", partidos: [{ id: 22, rival: "Acme", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 2 }], asistidores: [{ jugador: "Lizarraga", cantidad: 1 }, { jugador: "Egea", cantidad: 1 }] }] },
      { id: 23, numero_fecha: "Semis", partidos: [{ id: 23, rival: "La Vuelta", goles_kikines: 4, goles_rival: 1, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Vazquez", cantidad: 1 }, { jugador: "Tirao", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Cravero", cantidad: 1 }] }] },
      { id: 24, numero_fecha: "Final", partidos: [{ id: 24, rival: "Border", goles_kikines: 4, goles_rival: 1, goleadores: [{ jugador: "Sarmiento", cantidad: 1 }, { jugador: "Lizarraga", cantidad: 1 }, { jugador: "Bianco", cantidad: 2 }], asistidores: [{ jugador: "Bambozzi", cantidad: 2 }, { jugador: "Cravero", cantidad: 1 }] }] },
    ]
  },
  {
    id: 3, nombre: "APERTURA 24", anio: 2024,
    fechas: [
      { id: 25, numero_fecha: "Fecha 1", partidos: [{ id: 25, rival: "Yeri", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Vazquez", cantidad: 1 }] }] },
      { id: 26, numero_fecha: "Fecha 2", partidos: [{ id: 26, rival: "Gárgolas", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Sarmiento", cantidad: 1 }, { jugador: "Correa", cantidad: 1 }], asistidores: [{ jugador: "Egea", cantidad: 1 }] }] },
      { id: 27, numero_fecha: "Fecha 3", partidos: [{ id: 27, rival: "Detenidos", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 28, numero_fecha: "Fecha 4", partidos: [{ id: 28, rival: "Alayama", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }], asistidores: [] }] },
      { id: 29, numero_fecha: "Fecha 5", partidos: [{ id: 29, rival: "El Ajuste", goles_kikines: 0, goles_rival: 2, goleadores: [], asistidores: [] }] },
      { id: 30, numero_fecha: "Fecha 6", partidos: [{ id: 30, rival: "Córdoba", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Pernochi", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }] }] },
      { id: 31, numero_fecha: "Fecha 7", partidos: [{ id: 31, rival: "Per Saltum", goles_kikines: 5, goles_rival: 0, goleadores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Miranda", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }, { jugador: "Vasconi", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Arias", cantidad: 1 }] }] },
      { id: 32, numero_fecha: "Fecha 8", partidos: [{ id: 32, rival: "Alberdianos", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bambozzi", cantidad: 2 }], asistidores: [] }] },
      { id: 33, numero_fecha: "Fecha 9", partidos: [{ id: 33, rival: "Smoke City", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 34, numero_fecha: "Fecha 10", partidos: [{ id: 34, rival: "Acme", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }, { jugador: "Vasconi", cantidad: 1 }], asistidores: [] }] },
      { id: 35, numero_fecha: "Fecha 11", partidos: [{ id: 35, rival: "La Cábala", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }, { jugador: "Demaría", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }] }] },
      { id: 36, numero_fecha: "Fecha 12", partidos: [{ id: 36, rival: "Los Magios", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Correa", cantidad: 2 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Pernochi", cantidad: 1 }] }] },
      { id: 37, numero_fecha: "Fecha 13", partidos: [{ id: 37, rival: "Graduados", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Correa", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Miranda", cantidad: 1 }] }] },
      { id: 38, numero_fecha: "Cuartos", partidos: [{ id: 38, rival: "Gárgolas", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 2 }], asistidores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Vazquez", cantidad: 1 }, { jugador: "Vasconi", cantidad: 1 }] }] },
      { id: 39, numero_fecha: "Semifinales", partidos: [{ id: 39, rival: "Que Broncón", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 40, numero_fecha: "Final", partidos: [{ id: 40, rival: "Detenidos", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
    ]
  },
  {
    id: 4, nombre: "CLAUSURA 24", anio: 2024,
    fechas: [
      { id: 41, numero_fecha: "Fecha 1", partidos: [{ id: 41, rival: "San Lorenzo", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Pernochi", cantidad: 1 }] }] },
      { id: 42, numero_fecha: "Fecha 2", partidos: [{ id: 42, rival: "La Bocha", goles_kikines: 1, goles_rival: 2, goleadores: [{ jugador: "Correa", cantidad: 1 }], asistidores: [{ jugador: "Gonzalez", cantidad: 1 }] }] },
      { id: 43, numero_fecha: "Fecha 3", partidos: [{ id: 43, rival: "Corralito", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bambozzi", cantidad: 1 }, { jugador: "Del Franco", cantidad: 1 }], asistidores: [{ jugador: "Peralta", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }] }] },
      { id: 44, numero_fecha: "Fecha 4", partidos: [{ id: 44, rival: "El Pasaje", goles_kikines: 5, goles_rival: 3, goleadores: [{ jugador: "Correa", cantidad: 2 }, { jugador: "Bambozzi", cantidad: 1 }, { jugador: "Bianco", cantidad: 2 }], asistidores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }] }] },
      { id: 45, numero_fecha: "Fecha 5", partidos: [{ id: 45, rival: "Zebra", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 46, numero_fecha: "Fecha 6a", partidos: [{ id: 46, rival: "Mario Bross", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 47, numero_fecha: "Fecha 6b", partidos: [{ id: 47, rival: "La Unión", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Vazquez", cantidad: 1 }], asistidores: [{ jugador: "Correa", cantidad: 1 }] }] },
      { id: 48, numero_fecha: "Fecha 7", partidos: [{ id: 48, rival: "El Fortín", goles_kikines: 2, goles_rival: 3, goleadores: [{ jugador: "Correa", cantidad: 1 }, { jugador: "Peralta", cantidad: 1 }], asistidores: [] }] },
      { id: 49, numero_fecha: "Fecha 8", partidos: [{ id: 49, rival: "África", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Vazquez", cantidad: 1 }, { jugador: "Correa", cantidad: 1 }], asistidores: [{ jugador: "Bianco", cantidad: 1 }] }] },
      { id: 50, numero_fecha: "Fecha 9", partidos: [{ id: 50, rival: "Código", goles_kikines: 1, goles_rival: 2, goleadores: [{ jugador: "Sibilla J", cantidad: 1 }], asistidores: [] }] },
      { id: 51, numero_fecha: "Fecha 10", partidos: [{ id: 51, rival: "Un Equipo", goles_kikines: 9, goles_rival: 1, goleadores: [], asistidores: [] }] },
      { id: 52, numero_fecha: "Fecha 12", partidos: [{ id: 52, rival: "La Colonia", goles_kikines: 1, goles_rival: 1, goleadores: [], asistidores: [] }] },
      { id: 53, numero_fecha: "Fecha 13", partidos: [{ id: 53, rival: "Centenario", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Maiquez", cantidad: 1 }], asistidores: [{ jugador: "Vasconi", cantidad: 1 }] }] },
      { id: 54, numero_fecha: "Cuartos", partidos: [{ id: 54, rival: "La Bocha", goles_kikines: 0, goles_rival: 2, goleadores: [], asistidores: [] }] },
    ]
  },
  {
    id: 5, nombre: "APERTURA 25", anio: 2025,
    fechas: [
      { id: 55, numero_fecha: "Fecha 1", partidos: [{ id: 55, rival: "Yeri", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Bianco", cantidad: 1 }, { jugador: "Gonzalez L", cantidad: 1 }, { jugador: "Maiquez", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 56, numero_fecha: "Fecha 2", partidos: [{ id: 56, rival: "La Bocha", goles_kikines: 0, goles_rival: 1, goleadores: [], asistidores: [] }] },
      { id: 57, numero_fecha: "Fecha 3", partidos: [{ id: 57, rival: "San Lorenzo", goles_kikines: 0, goles_rival: 4, goleadores: [], asistidores: [] }] },
      { id: 58, numero_fecha: "Fecha 4", partidos: [{ id: 58, rival: "La Colonia", goles_kikines: 3, goles_rival: 1, goleadores: [{ jugador: "Bianco", cantidad: 2 }, { jugador: "Peralta", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 59, numero_fecha: "Fecha 5", partidos: [{ id: 59, rival: "Play Time", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 60, numero_fecha: "Fecha 6", partidos: [{ id: 60, rival: "Detenidos", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
      { id: 61, numero_fecha: "Fecha 7", partidos: [{ id: 61, rival: "Centenario", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Maiquez", cantidad: 1 }], asistidores: [{ jugador: "Pernochi", cantidad: 1 }] }] },
      { id: 62, numero_fecha: "Fecha 8", partidos: [{ id: 62, rival: "OCB", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Vazquez", cantidad: 2 }], asistidores: [{ jugador: "Bianco", cantidad: 1 }] }] },
      { id: 63, numero_fecha: "Fecha 9", partidos: [{ id: 63, rival: "Que Broncón", goles_kikines: 0, goles_rival: 1, goleadores: [], asistidores: [] }] },
      { id: 64, numero_fecha: "Fecha 10", partidos: [{ id: 64, rival: "El Pasaje", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 2 }, { jugador: "Demaría", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 65, numero_fecha: "Fecha 11", partidos: [{ id: 65, rival: "Deportivo Cristal", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 2 }, { jugador: "Vazquez", cantidad: 1 }], asistidores: [{ jugador: "Gonzalez P", cantidad: 1 }] }] },
      { id: 66, numero_fecha: "Fecha 12", partidos: [{ id: 66, rival: "Recreativo", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 1 }], asistidores: [{ jugador: "Peralta", cantidad: 1 }] }] },
      { id: 67, numero_fecha: "Fecha 13", partidos: [{ id: 67, rival: "Imperial", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 2 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 68, numero_fecha: "Cuartos", partidos: [{ id: 68, rival: "Detenidos", goles_kikines: 1, goles_rival: 1, goleadores: [{ jugador: "Gonzalez L", cantidad: 1 }], asistidores: [{ jugador: "Gonzalez P", cantidad: 1 }] }] },
    ]
  },
  {
    id: 6, nombre: "CLAUSURA 25", anio: 2025,
    fechas: [
      { id: 69, numero_fecha: "Fecha 1", partidos: [{ id: 69, rival: "La Farsa", goles_kikines: 4, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 2 }, { jugador: "Demaría", cantidad: 1 }], asistidores: [] }] },
      { id: 70, numero_fecha: "Fecha 2", partidos: [{ id: 70, rival: "Atl. Laboulaye", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }, { jugador: "Vasconi", cantidad: 1 }], asistidores: [{ jugador: "Demaría", cantidad: 1 }] }] },
      { id: 71, numero_fecha: "Fecha 3", partidos: [{ id: 71, rival: "La Castilla", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Demaría", cantidad: 1 }, { jugador: "Miranda", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }, { jugador: "Causa", cantidad: 1 }] }] },
      { id: 72, numero_fecha: "Fecha 4", partidos: [{ id: 72, rival: "La Rabona", goles_kikines: 1, goles_rival: 3, goleadores: [{ jugador: "Montaldo", cantidad: 1 }], asistidores: [{ jugador: "Maiquez", cantidad: 1 }] }] },
      { id: 73, numero_fecha: "Fecha 5", partidos: [{ id: 73, rival: "La Bocha", goles_kikines: 3, goles_rival: 2, goleadores: [{ jugador: "Demaría", cantidad: 2 }, { jugador: "Ponce", cantidad: 1 }], asistidores: [{ jugador: "Bianco", cantidad: 1 }] }] },
      { id: 74, numero_fecha: "Fecha 6", partidos: [{ id: 74, rival: "El Eterno", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Sarmiento", cantidad: 1 }, { jugador: "Gonzalez L", cantidad: 1 }], asistidores: [{ jugador: "Pernochi", cantidad: 1 }] }] },
      { id: 75, numero_fecha: "Fecha 7", partidos: [{ id: 75, rival: "Impresentables", goles_kikines: 4, goles_rival: 1, goleadores: [{ jugador: "Sarmiento", cantidad: 1 }, { jugador: "Demaría", cantidad: 2 }, { jugador: "Demaría F", cantidad: 1 }], asistidores: [{ jugador: "Bianco", cantidad: 1 }] }] },
      { id: 76, numero_fecha: "Fecha 8", partidos: [{ id: 76, rival: "La Acade", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 1 }, { jugador: "Lizio", cantidad: 1 }], asistidores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Correa", cantidad: 1 }] }] },
      { id: 77, numero_fecha: "Fecha 9", partidos: [{ id: 77, rival: "Defensa y J", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 2 }, { jugador: "Pernochi", cantidad: 1 }], asistidores: [] }] },
      { id: 78, numero_fecha: "Fecha 10", partidos: [{ id: 78, rival: "Los Titos", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }], asistidores: [] }] },
      { id: 79, numero_fecha: "Fecha 11", partidos: [{ id: 79, rival: "Bajo Fianza", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 1 }], asistidores: [{ jugador: "Bianco", cantidad: 1 }] }] },
      { id: 80, numero_fecha: "Fecha 12", partidos: [{ id: 80, rival: "Veni", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Demaría", cantidad: 2 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
      { id: 81, numero_fecha: "Fecha 13", partidos: [{ id: 81, rival: "Calcio", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Pernochi", cantidad: 1 }, { jugador: "Bambozzi", cantidad: 1 }], asistidores: [{ jugador: "Causa", cantidad: 1 }, { jugador: "Lizio", cantidad: 1 }] }] },
      { id: 82, numero_fecha: "Fecha 14", partidos: [{ id: 82, rival: "Codigo", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Ponce", cantidad: 1 }, { jugador: "Demaría", cantidad: 1 }], asistidores: [{ jugador: "Causa", cantidad: 1 }] }] },
      { id: 83, numero_fecha: "Fecha 15", partidos: [{ id: 83, rival: "El Fortín", goles_kikines: 2, goles_rival: 0, goleadores: [{ jugador: "Ponce", cantidad: 1 }, { jugador: "Lizarraga", cantidad: 1 }], asistidores: [{ jugador: "Demaría", cantidad: 1 }] }] },
      { id: 84, numero_fecha: "Cuartos", partidos: [{ id: 84, rival: "Bajo Fianza", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Bianco", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
    ]
  },
  {
    id: 7, nombre: "APERTURA 26", anio: 2026,
    fechas: [
      { id: 85, numero_fecha: "Fecha 1", partidos: [{ id: 85, rival: "Saprissa", goles_kikines: 2, goles_rival: 3, goleadores: [{ jugador: "Demaría J", cantidad: 1 }, { jugador: "Villamea", cantidad: 1 }], asistidores: [{ jugador: "Villamea", cantidad: 1 }, { jugador: "Ponce", cantidad: 1 }] }] },
      { id: 86, numero_fecha: "Fecha 2", partidos: [{ id: 86, rival: "Vieja Escuela", goles_kikines: 3, goles_rival: 0, goleadores: [{ jugador: "Demaría F", cantidad: 1 }, { jugador: "Bianco", cantidad: 1 }, { jugador: "Demaría J", cantidad: 1 }], asistidores: [{ jugador: "Miranda", cantidad: 1 }] }] },
      { id: 87, numero_fecha: "Fecha 3", partidos: [{ id: 87, rival: "Promesa", goles_kikines: 0, goles_rival: 2, goleadores: [], asistidores: [] }] },
      { id: 88, numero_fecha: "Fecha 4", partidos: [{ id: 88, rival: "Borregos", goles_kikines: 1, goles_rival: 0, goleadores: [{ jugador: "Pernochi", cantidad: 1 }], asistidores: [{ jugador: "Vasconi", cantidad: 1 }] }] },
      { id: 89, numero_fecha: "Fecha 5", partidos: [{ id: 89, rival: "La Pausa", goles_kikines: 0, goles_rival: 0, goleadores: [], asistidores: [] }] },
      { id: 90, numero_fecha: "Fecha 6", partidos: [{ id: 90, rival: "Codigo", goles_kikines: 2, goles_rival: 1, goleadores: [{ jugador: "Sarmiento", cantidad: 1 }, { jugador: "Correa", cantidad: 1 }], asistidores: [{ jugador: "Ponce", cantidad: 1 }] }] },
    ]
  },
];

// ─── NORMALIZAR NOMBRES ───────────────────────────────────────────────────────
// Unifica variantes del mismo jugador escritas diferente en el Excel
function normalizar(nombre) {
  const mapa = {
    "demaria": "Demaría",
    "demaría": "Demaría",
    "gonzalez": "Gonzalez",
    "vacsconi": "Vasconi",
  };
  const key = nombre.toLowerCase().trim();
  return mapa[key] || nombre;
}

// ─── PROCESAR ESTADÍSTICAS DESDE FIXTURE ─────────────────────────────────────
function procesarEstadisticas(fixture, torneoId) {
  const golesMap = {};
  const asistMap = {};

  const torneos =
    torneoId === "todos"
      ? fixture
      : fixture.filter((t) => String(t.id) === String(torneoId));

  torneos.forEach((torneo) => {
    torneo.fechas.forEach((fecha) => {
      fecha.partidos.forEach((partido) => {
        partido.goleadores.forEach(({ jugador, cantidad }) => {
          const n = normalizar(jugador);
          golesMap[n] = (golesMap[n] || 0) + cantidad;
        });
        partido.asistidores.forEach(({ jugador, cantidad }) => {
          const n = normalizar(jugador);
          asistMap[n] = (asistMap[n] || 0) + cantidad;
        });
      });
    });
  });

  const ordenar = (mapa) =>
    Object.entries(mapa)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total);

  return {
    goleadores: ordenar(golesMap),
    asistidores: ordenar(asistMap),
  };
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
export default function Goleadores({ fixture = FIXTURE_DATA }) {
  const [tab, setTab] = useState("goleadores");
  const [torneoSeleccionado, setTorneoSeleccionado] = useState("todos");

  const estadisticas = procesarEstadisticas(fixture, torneoSeleccionado);
  const lista =
    tab === "goleadores" ? estadisticas.goleadores : estadisticas.asistidores;
  const maxTotal = lista[0]?.total || 1;

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
            className="text-sm font-medium rounded-xl px-4 py-2 outline-none cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#e4e4e7",
            }}
          >
            <option value="todos">Todos los torneos</option>
            {fixture.map((t) => (
              <option key={t.id} value={t.id}>
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