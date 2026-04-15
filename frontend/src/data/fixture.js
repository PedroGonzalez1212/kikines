// src/data/fixture.js
// Datos del Club Kikines — generado desde Excel
// Para agregar un partido: agregar un objeto al array "partidos" del torneo correspondiente

export const torneos = [
  {
    id: 1,
    nombre: "Liguilla 23",
    anio: 2023,
    partidos: [
      {
        id: 1,
        fase: "Fecha 1",
        rival: "Aston Birra",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 2,
        fase: "Fecha 2",
        rival: "Parquelona",
        goles_kikines: 1,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Zulueta', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 3,
        fase: "Fecha 3",
        rival: "Cidecor",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Sibilla', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 4,
        fase: "Cuartos",
        rival: "Tomba Libre",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Bobán', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Ponce', cantidad: 1 },
          { jugador: 'Egea', cantidad: 1 },
        ],
      },
      {
        id: 5,
        fase: "Semis",
        rival: "Aston Birra",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Lizarraga', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Egea', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 6,
        fase: "Final",
        rival: "La Vuelta",
        goles_kikines: 1,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Clausura 23",
    anio: 2023,
    serie: "Serie E",
    partidos: [
      {
        id: 7,
        fase: "Fecha 1",
        rival: "Border",
        goles_kikines: 1,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Otero', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Demaría', cantidad: 1 },
        ],
      },
      {
        id: 8,
        fase: "Fecha 2",
        rival: "Gárgolas",
        goles_kikines: 3,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Otero', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Demaría', cantidad: 1 },
          { jugador: 'Bambozzi', cantidad: 1 },
        ],
      },
      {
        id: 9,
        fase: "Fecha 3",
        rival: "Per Saltum",
        goles_kikines: 5,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Lizarraga', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Otero', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Egea', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Mala', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Del Franco', cantidad: 1 },
          { jugador: 'Bianco', cantidad: 2 },
        ],
      },
      {
        id: 10,
        fase: "Fecha 4",
        rival: "Pope",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Egea', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'I. Bambozzi', cantidad: 1 },
          { jugador: 'Ledesma', cantidad: 1 },
        ],
      },
      {
        id: 11,
        fase: "Fecha 5",
        rival: "Yeri",
        goles_kikines: 0,
        goles_rival: 3,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 12,
        fase: "Fecha 6",
        rival: "Cuota Fija",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bobán', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Vazquez', cantidad: 1 },
        ],
      },
      {
        id: 13,
        fase: "Fecha 7",
        rival: "Acme",
        goles_kikines: 0,
        goles_rival: 1,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 14,
        fase: "Fecha 8",
        rival: "Torino",
        goles_kikines: 6,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Vazquez', cantidad: 3, penal: false, enContra: false },
          { jugador: 'Mala', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Egea', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Egea', cantidad: 2 },
          { jugador: 'I. Bambozzi', cantidad: 1 },
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Gonzalez', cantidad: 1 },
        ],
      },
      {
        id: 15,
        fase: "Fecha 9",
        rival: "La Vuelta",
        goles_kikines: 1,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: true, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 16,
        fase: "Fecha 10",
        rival: "Fratelli",
        goles_kikines: 4,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Sucheki', cantidad: 1, penal: false, enContra: false },
          { jugador: 'E/C', cantidad: 1, penal: false, enContra: true },
          { jugador: 'Otero', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Vazquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Del Franco', cantidad: 1 },
          { jugador: 'Gonzalez', cantidad: 1 },
        ],
      },
      {
        id: 17,
        fase: "Fecha 11",
        rival: "Corona",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Egea', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Otero', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Russo', cantidad: 1 },
        ],
      },
      {
        id: 18,
        fase: "Fecha 12",
        rival: "Trinidad y EV",
        goles_kikines: 1,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: true, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 19,
        fase: "Fecha 13",
        rival: "La Aldea",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: true, enContra: false },
          { jugador: 'Vazquez', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
        ],
      },
      {
        id: 20,
        fase: "Fecha 14",
        rival: "Vodka Jrs",
        goles_kikines: 2,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Mala', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 21,
        fase: "Fecha 15",
        rival: "La Esencia",
        goles_kikines: 2,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Tirao', cantidad: 1 },
        ],
      },
      {
        id: 22,
        fase: "Cuartos",
        rival: "Acme",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Lizarraga', cantidad: 1 },
          { jugador: 'Egea', cantidad: 1 },
        ],
      },
      {
        id: 23,
        fase: "Semis",
        rival: "La Vuelta",
        goles_kikines: 4,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: true, enContra: false },
          { jugador: 'Vazquez', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Tirao', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Cravero', cantidad: 1 },
        ],
      },
      {
        id: 24,
        fase: "Final",
        rival: "Border",
        goles_kikines: 4,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Sarmiento', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Lizarraga', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 2 },
          { jugador: 'Cravero', cantidad: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    nombre: "Apertura 24",
    anio: 2024,
    serie: "Serie D",
    partidos: [
      {
        id: 25,
        fase: "Fecha 1",
        rival: "Yeri",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: true, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Vazquez', cantidad: 1 },
        ],
      },
      {
        id: 26,
        fase: "Fecha 2",
        rival: "Gárgolas",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Sarmiento', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Correa', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Egea', cantidad: 1 },
        ],
      },
      {
        id: 27,
        fase: "Fecha 3",
        rival: "Detenidos",
        goles_kikines: 0,
        goles_rival: 0,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 28,
        fase: "Fecha 4",
        rival: "Alayama",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 29,
        fase: "Fecha 5",
        rival: "El Ajuste",
        goles_kikines: 0,
        goles_rival: 2,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 30,
        fase: "Fecha 6",
        rival: "Córdoba",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
        ],
      },
      {
        id: 31,
        fase: "Fecha 7",
        rival: "Per Saltum",
        goles_kikines: 5,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Miranda', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Vasconi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Arias', cantidad: 1 },
        ],
      },
      {
        id: 32,
        fase: "Fecha 8",
        rival: "Alberdianos",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 33,
        fase: "Fecha 9",
        rival: "Smoke City",
        goles_kikines: 0,
        goles_rival: 0,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 34,
        fase: "Fecha 10",
        rival: "Acme",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Vasconi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 35,
        fase: "Fecha 11",
        rival: "La Cábala",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
        ],
      },
      {
        id: 36,
        fase: "Fecha 12",
        rival: "Los Magios",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Correa', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Pernochi', cantidad: 1 },
        ],
      },
      {
        id: 37,
        fase: "Fecha 13",
        rival: "Graduados",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Correa', cantidad: 1, penal: true, enContra: false },
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Miranda', cantidad: 1 },
        ],
      },
      {
        id: 38,
        fase: "Cuartos de final",
        rival: "Gárgolas",
        goles_kikines: 3,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bambozzi', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Vazquez', cantidad: 1 },
          { jugador: 'Vasconi', cantidad: 1 },
        ],
      },
      {
        id: 39,
        fase: "Semifinales",
        rival: "Que Broncón",
        goles_kikines: 0,
        goles_rival: 0,
        penales: "5-4",
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 40,
        fase: "Final",
        rival: "Detenidos",
        goles_kikines: 0,
        goles_rival: 0,
        penales: "2-4",
        goleadores: [
        ],
        asistidores: [
        ],
      },
    ],
  },
  {
    id: 4,
    nombre: "Clausura 24",
    anio: 2024,
    serie: "Serie C",
    partidos: [
      {
        id: 41,
        fase: "Fecha 1",
        rival: "San Lorenzo",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Pernochi', cantidad: 1 },
        ],
      },
      {
        id: 42,
        fase: "Fecha 2",
        rival: "La Bocha",
        goles_kikines: 1,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Correa', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Gonzalez', cantidad: 1 },
        ],
      },
      {
        id: 43,
        fase: "Fecha 3",
        rival: "Corralito",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Del Franco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Peralta', cantidad: 1 },
          { jugador: 'Bambozzi', cantidad: 1 },
        ],
      },
      {
        id: 44,
        fase: "Fecha 4",
        rival: "El Pasaje",
        goles_kikines: 5,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Correa', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Pernochi', cantidad: 1 },
          { jugador: 'Bambozzi', cantidad: 1 },
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 45,
        fase: "Fecha 5",
        rival: "Zebra",
        goles_kikines: 0,
        goles_rival: 0,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 46,
        fase: "Fecha 6",
        rival: "Mario Bross",
        goles_kikines: 0,
        goles_rival: 0,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 47,
        fase: "Fecha 7",
        rival: "La Unión",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Vazquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Correa', cantidad: 1 },
        ],
      },
      {
        id: 48,
        fase: "Fecha 8",
        rival: "El Fortín",
        goles_kikines: 2,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Correa', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Peralta', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 49,
        fase: "Fecha 9",
        rival: "África",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Vazquez', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Correa', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 50,
        fase: "Fecha 10",
        rival: "Código",
        goles_kikines: 1,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Sibilla J', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 51,
        fase: "Fecha 11",
        rival: "Un Equipo",
        goles_kikines: 9,
        goles_rival: 1,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 52,
        fase: "Fecha 12",
        rival: "La Colonia",
        goles_kikines: 1,
        goles_rival: 1,
        goleadores: [
          { jugador: 'E/C', cantidad: 1, penal: false, enContra: true },
        ],
        asistidores: [
        ],
      },
      {
        id: 53,
        fase: "Fecha 13",
        rival: "Centenario",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Vasconi', cantidad: 1 },
        ],
      },
      {
        id: 54,
        fase: "Cuartos de final",
        rival: "La Bocha",
        goles_kikines: 0,
        goles_rival: 2,
        goleadores: [
        ],
        asistidores: [
        ],
      },
    ],
  },
  {
    id: 5,
    nombre: "Apertura 25",
    anio: 2025,
    serie: "Serie C",
    partidos: [
      {
        id: 55,
        fase: "Fecha 1",
        rival: "Yeri",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Gonzalez L', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 56,
        fase: "Fecha 2",
        rival: "La Bocha",
        goles_kikines: 0,
        goles_rival: 1,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 57,
        fase: "Fecha 3",
        rival: "San Lorenzo",
        goles_kikines: 0,
        goles_rival: 4,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 58,
        fase: "Fecha 4",
        rival: "La Colonia",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Peralta', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 59,
        fase: "Fecha 5",
        rival: "Play Time",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 60,
        fase: "Fecha 6",
        rival: "Detenidos",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 61,
        fase: "Fecha 7",
        rival: "Centenario",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Maiquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Pernochi', cantidad: 1 },
        ],
      },
      {
        id: 62,
        fase: "Fecha 8",
        rival: "OCB",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Vazquez', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 63,
        fase: "Fecha 9",
        rival: "Que Broncón",
        goles_kikines: 0,
        goles_rival: 1,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 64,
        fase: "Fecha 10",
        rival: "El Pasaje",
        goles_kikines: 3,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 65,
        fase: "Fecha 11",
        rival: "Deportivo Cristal",
        goles_kikines: 3,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Vazquez', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Gonzalez P', cantidad: 1 },
        ],
      },
      {
        id: 66,
        fase: "Fecha 12",
        rival: "Recreativo",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Peralta', cantidad: 1 },
        ],
      },
      {
        id: 67,
        fase: "Fecha 13",
        rival: "Imperial",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 68,
        fase: "Cuartos de final",
        rival: "Detenidos",
        goles_kikines: 1,
        goles_rival: 1,
        penales: "2-4",
        goleadores: [
          { jugador: 'Gonzalez L', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Gonzalez P', cantidad: 1 },
        ],
      },
    ],
  },
  {
    id: 6,
    nombre: "Clausura 25",
    anio: 2025,
    serie: "Serie B",
    partidos: [
      {
        id: 69,
        fase: "Fecha 1",
        rival: "La Farsa",
        goles_kikines: 4,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Bianco', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
          { jugador: 'E/C', cantidad: 1, penal: false, enContra: true },
        ],
        asistidores: [
        ],
      },
      {
        id: 70,
        fase: "Fecha 2",
        rival: "Atl. Laboulaye",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: true, enContra: false },
          { jugador: 'Vasconi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Demaría', cantidad: 1 },
        ],
      },
      {
        id: 71,
        fase: "Fecha 3",
        rival: "La Castilla",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Miranda', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
          { jugador: 'Causa', cantidad: 1 },
        ],
      },
      {
        id: 72,
        fase: "Fecha 4",
        rival: "La Rabona",
        goles_kikines: 1,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Montaldo', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Maiquez', cantidad: 1 },
        ],
      },
      {
        id: 73,
        fase: "Fecha 5",
        rival: "La Bocha",
        goles_kikines: 3,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Ponce', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 74,
        fase: "Fecha 6",
        rival: "El Eterno",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Sarmiento', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Gonzalez L', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Pernochi', cantidad: 1 },
        ],
      },
      {
        id: 75,
        fase: "Fecha 7",
        rival: "Impresentables",
        goles_kikines: 4,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Sarmiento', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Demaría F', cantidad: 1, penal: true, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 76,
        fase: "Fecha 8",
        rival: "La Acade",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Lizio', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Pernochi', cantidad: 1 },
          { jugador: 'Correa', cantidad: 1 },
        ],
      },
      {
        id: 77,
        fase: "Fecha 9",
        rival: "Defensa y J",
        goles_kikines: 3,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 78,
        fase: "Fecha 10",
        rival: "Los Titos",
        goles_kikines: 2,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
        ],
      },
      {
        id: 79,
        fase: "Fecha 11",
        rival: "Bajo Fianza",
        goles_kikines: 1,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Bianco', cantidad: 1 },
        ],
      },
      {
        id: 80,
        fase: "Fecha 12",
        rival: "Veni",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Demaría', cantidad: 2, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 81,
        fase: "Fecha 13",
        rival: "Calcio",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bambozzi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Causa', cantidad: 1 },
          { jugador: 'Lizio', cantidad: 1 },
        ],
      },
      {
        id: 82,
        fase: "Fecha 14",
        rival: "Código",
        goles_kikines: 2,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Ponce', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Demaría', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Causa', cantidad: 1 },
        ],
      },
      {
        id: 83,
        fase: "Fecha 15",
        rival: "El Fortín",
        goles_kikines: 2,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Ponce', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Lizarraga', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Demaría', cantidad: 1 },
        ],
      },
      {
        id: 84,
        fase: "Cuartos de final",
        rival: "Bajo Fianza",
        goles_kikines: 1,
        goles_rival: 2,
        goleadores: [
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
    ],
  },
  {
    id: 7,
    nombre: "Apertura 26",
    anio: 2026,
    serie: "Serie A",
    partidos: [
      {
        id: 85,
        fase: "Fecha 1",
        rival: "Saprissa",
        goles_kikines: 2,
        goles_rival: 3,
        goleadores: [
          { jugador: 'Demaría J', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Villamea', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Villamea', cantidad: 1 },
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
      {
        id: 86,
        fase: "Fecha 2",
        rival: "Vieja Escuela",
        goles_kikines: 3,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Demaría F', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Bianco', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Demaría J', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Miranda', cantidad: 1 },
        ],
      },
      {
        id: 87,
        fase: "Fecha 3",
        rival: "Promesa",
        goles_kikines: 0,
        goles_rival: 2,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 88,
        fase: "Fecha 4",
        rival: "Borregos",
        goles_kikines: 1,
        goles_rival: 0,
        goleadores: [
          { jugador: 'Pernochi', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Vasconi', cantidad: 1 },
        ],
      },
      {
        id: 89,
        fase: "Fecha 5",
        rival: "La Pausa",
        goles_kikines: 0,
        goles_rival: 0,
        goleadores: [
        ],
        asistidores: [
        ],
      },
      {
        id: 90,
        fase: "Fecha 6",
        rival: "Código",
        goles_kikines: 2,
        goles_rival: 1,
        goleadores: [
          { jugador: 'Sarmiento', cantidad: 1, penal: false, enContra: false },
          { jugador: 'Correa', cantidad: 1, penal: false, enContra: false },
        ],
        asistidores: [
          { jugador: 'Ponce', cantidad: 1 },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// FUNCIONES DE CÁLCULO DERIVADAS
// Estas funciones calculan goleadores y asistidores
// automáticamente a partir de los datos de partidos.
// No hay que actualizar nada más — todo se deriva de aquí.
// ─────────────────────────────────────────────

/**
 * Devuelve el ranking de goleadores.
 * @param {number|null} torneoId - null = todos los torneos
 */
export function calcularGoleadores(torneoId = null) {
  const mapa = {}
  const fuente = torneoId ? torneos.filter(t => t.id === torneoId) : torneos
  fuente.forEach(torneo => {
    torneo.partidos.forEach(partido => {
      partido.goleadores.forEach(({ jugador, cantidad, enContra }) => {
        if (enContra) return // los goles en contra no cuentan para el ranking
        if (!mapa[jugador]) mapa[jugador] = { jugador, goles: 0, torneos: new Set() }
        mapa[jugador].goles += cantidad
        mapa[jugador].torneos.add(torneo.nombre)
      })
    })
  })
  return Object.values(mapa)
    .map(r => ({ ...r, torneos: [...r.torneos] }))
    .sort((a, b) => b.goles - a.goles)
}

/**
 * Devuelve el ranking de asistidores.
 * @param {number|null} torneoId - null = todos los torneos
 */
export function calcularAsistidores(torneoId = null) {
  const mapa = {}
  const fuente = torneoId ? torneos.filter(t => t.id === torneoId) : torneos
  fuente.forEach(torneo => {
    torneo.partidos.forEach(partido => {
      partido.asistidores.forEach(({ jugador, cantidad }) => {
        if (!mapa[jugador]) mapa[jugador] = { jugador, asistencias: 0, torneos: new Set() }
        mapa[jugador].asistencias += cantidad
        mapa[jugador].torneos.add(torneo.nombre)
      })
    })
  })
  return Object.values(mapa)
    .map(r => ({ ...r, torneos: [...r.torneos] }))
    .sort((a, b) => b.asistencias - a.asistencias)
}

/**
 * Devuelve estadísticas de partidos (G/E/P).
 * @param {number|null} torneoId - null = todos los torneos
 */
export function calcularEstadisticas(torneoId = null) {
  let g = 0, e = 0, d = 0, gf = 0, gc = 0
  const fuente = torneoId ? torneos.filter(t => t.id === torneoId) : torneos
  fuente.forEach(torneo => {
    torneo.partidos.forEach(({ goles_kikines: gk, goles_rival: gr }) => {
      if (gk === null || gr === null) return
      gf += gk; gc += gr
      if (gk > gr) g++
      else if (gk === gr) e++
      else d++
    })
  })
  return { ganados: g, empatados: e, perdidos: d, golesFavor: gf, golesContra: gc, total: g+e+d }
}