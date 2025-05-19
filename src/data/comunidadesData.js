import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.png";
import d from "../assets/d.jpg";




const comunidades = [
  {
    "id": 1,
    "name": "Comunidad Colombiana en Nueva York",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Comunidad Colombiana en Nueva York es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Comunidad Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "York",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Comunidad",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "York",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Comunidad Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Comunidad",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 2,
    "name": "Colombianos en Miami",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Colombianos en Miami es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Colombianos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Miami",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Colombianos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Miami",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Colombianos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Colombianos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 3,
    "name": "Venezolanos Unidos en Houston",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Venezolanos Unidos en Houston es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Venezolanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Houston",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Venezolanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Houston",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Venezolanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Venezolanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 4,
    "name": "Guatemaltecos en Dallas",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Guatemaltecos en Dallas es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Guatemaltecos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Dallas",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Guatemaltecos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Dallas",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Guatemaltecos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Guatemaltecos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 5,
    "name": "Mexicanos en Los Ángeles",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Mexicanos en Los Ángeles es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Mexicanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Ángeles",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Mexicanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Ángeles",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Mexicanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Mexicanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 6,
    "name": "Hondureños en Chicago",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Hondureños en Chicago es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Hondureños Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Chicago",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Hondureños",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Chicago",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Hondureños Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Hondureños",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 7,
    "name": "Peruanos en San Francisco",
    "flagImage": c,
    "imagenDestacada": c,
    "description": "Peruanos en San Francisco es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Peruanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Francisco",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Peruanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Francisco",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Peruanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Peruanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 8,
    "name": "Salvadoreños en Phoenix",
    "flagImage": c,
    "imagenDestacada": c,
    "description": "Salvadoreños en Phoenix es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Salvadoreños Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Phoenix",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Salvadoreños",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Phoenix",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Salvadoreños Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Salvadoreños",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 9,
    "name": "Ecuatorianos en Atlanta",
    "flagImage": c,
    "imagenDestacada": c,
    "description": "Ecuatorianos en Atlanta es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Ecuatorianos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Atlanta",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Ecuatorianos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Atlanta",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Ecuatorianos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Ecuatorianos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 10,
    "name": "Dominicanos en Boston",
    "flagImage": c,
    "imagenDestacada": d,
    "description": "Dominicanos en Boston es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Dominicanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Boston",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Dominicanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Boston",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Dominicanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Dominicanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 11,
    "name": "Nicaragüenses en Denver",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Nicaragüenses en Denver es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Nicaragüenses Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Denver",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Nicaragüenses",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Denver",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Nicaragüenses Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Nicaragüenses",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 12,
    "name": "Argentinos en Seattle",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Argentinos en Seattle es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Argentinos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Seattle",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Argentinos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Seattle",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Argentinos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Argentinos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 13,
    "name": "Chilenos en Austin",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Chilenos en Austin es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Chilenos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Austin",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Chilenos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Austin",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Chilenos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Chilenos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 14,
    "name": "Bolivianos en Las Vegas",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Bolivianos en Las Vegas es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Bolivianos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Vegas",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Bolivianos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Vegas",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Bolivianos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Bolivianos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 15,
    "name": "Brasileños en Orlando",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Brasileños en Orlando es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Brasileños Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Orlando",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Brasileños",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Orlando",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Brasileños Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Brasileños",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 16,
    "name": "Cubanos en Tampa",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Cubanos en Tampa es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Cubanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Tampa",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Cubanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Tampa",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Cubanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Cubanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 17,
    "name": "Uruguayos en San Diego",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Uruguayos en San Diego es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Uruguayos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Diego",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Uruguayos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Diego",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Uruguayos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Uruguayos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 18,
    "name": "Paraguayos en Minneapolis",
    "flagImage": d,
    "imagenDestacada": d,
    "description": "Paraguayos en Minneapolis es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Paraguayos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Minneapolis",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Paraguayos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Minneapolis",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Paraguayos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Paraguayos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 19,
    "name": "Panameños en Charlotte",
    "flagImage": d,
    "imagenDestacada": b,
    "description": "Panameños en Charlotte es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Panameños Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Charlotte",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Panameños",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Charlotte",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Panameños Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Panameños",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 20,
    "name": "Latinos en Raleigh",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Latinos en Raleigh es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Latinos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Raleigh",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Latinos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Raleigh",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Latinos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Latinos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 21,
    "name": "Andinos en Nueva Jersey",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Andinos en Nueva Jersey es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Andinos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Jersey",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Andinos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Jersey",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Andinos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Andinos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 22,
    "name": "Centroamericanos en Filadelfia",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Centroamericanos en Filadelfia es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Centroamericanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Filadelfia",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Centroamericanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Filadelfia",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Centroamericanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Centroamericanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 23,
    "name": "Sudamericanos en Portland",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Sudamericanos en Portland es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Sudamericanos Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "Portland",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Sudamericanos",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "Portland",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Sudamericanos Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Sudamericanos",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 24,
    "name": "Latinx en Kansas City",
    "flagImage": b,
    "imagenDestacada": b,
    "description": "Latinx en Kansas City es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Latinx Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "City",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Latinx",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "City",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Latinx Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Latinx",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  },
  {
    "id": 25,
    "name": "Comunidad Andina en Salt Lake City",
    "flagImage": a,
    "imagenDestacada": a,
    "description": "Comunidad Andina en Salt Lake City es una comunidad vibrante que celebra sus raíces culturales con orgullo y unidad.",
    "language": "es",
    "tipo": "migrante",
    "negocios": [
      {
        "nombre": "Comunidad Market",
        "categoria": "comida",
        "ubicacion": {
          "ciudad": "City",
          "estado": "USA"
        },
        "imagenDestacada": a
      },
      {
        "nombre": "Servicios Comunidad",
        "categoria": "servicios",
        "ubicacion": {
          "ciudad": "City",
          "estado": "USA"
        },
        "imagenDestacada": a
      }
    ],
    "eventos": [
      {
        "nombre": "Comunidad Fest",
        "fechaInicio": "2025-08-15",
        "fechaFin": "2025-08-17",
        "imagenDestacada": a
      },
      {
        "nombre": "Feria Cultural Comunidad",
        "fechaInicio": "2025-10-01",
        "fechaFin": "2025-10-03",
        "imagenDestacada": a
      }
    ]
  }
];

export default comunidades;