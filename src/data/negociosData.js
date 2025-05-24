import b from "../assets/b.jpg";
import c from "../assets/c.png";
import d from "../assets/d.jpg";

const negocios = [
  {
    "id": 118,
    "nombre": "Pupusería La Bendición",
    "descripcion": "Auténticas pupusas salvadoreñas y platos tradicionales.",
    "categoria": "comida",
    "comunidad": "salvadoreña",
    "contacto": {
      "telefono": "555-1018",
      "email": "pupuseria@ejemplo.com",
      "website": "https://pupuserialabendicion.com",
      "redes": {
        "facebook": "PupuseriaLaBendicion",
        "instagram": "@pupuseria.bendicion",
        "whatsapp": "1234567818"
      }
    },
    "ubicacion": {
      "direccion": "300 Calle del Sabor",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.041203,
        "lng": -96.990573
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Ana Martínez",
      "imagen": "https://randomuser.me/api/portraits/women/45.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "20:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "20:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "20:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "20:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "22:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "domingo", "apertura": "10:00", "cierre": "18:00" }
    ],
    "verificado": true,
    "etiquetas": ["Latinx", "Comida Tradicional", "Restaurante", "Salvadoreño"]
  },
  {
    "id": 119,
    "nombre": "Estética Belleza Total",
    "descripcion": "Servicios de estética, cortes, color y spa facial.",
    "categoria": "belleza",
    "comunidad": "mexicana",
    "contacto": {
      "telefono": "555-1019",
      "email": "bellezatotal@ejemplo.com",
      "website": "https://bellezatotal.com",
      "redes": {
        "facebook": "BellezaTotal",
        "instagram": "@esteticabelleza",
        "whatsapp": "1234567819"
      }
    },
    "ubicacion": {
      "direccion": "301 Calle del Estilo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.043412,
        "lng": -96.991602
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Lucía Gómez",
      "imagen": "https://randomuser.me/api/portraits/women/46.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "19:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "17:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Estética", "Belleza", "Cortes", "Spa"]
  },{
    "id": 120,
    "nombre": "Carnicería El Buen Corte",
    "descripcion": "Cortes frescos y productos típicos de la cocina latina.",
    "categoria": "comida",
    "comunidad": "colombiana",
    "contacto": {
      "telefono": "555-1020",
      "email": "elbuen.corte@ejemplo.com",
      "website": "https://elbuen-corte.com",
      "redes": {
        "facebook": "CarniceriaElBuenCorte",
        "instagram": "@elbuen.corte",
        "whatsapp": "1234567820"
      }
    },
    "ubicacion": {
      "direccion": "302 Calle de la Carne",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.042350,
        "lng": -96.995210
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "Carlos Ramírez",
      "imagen": "https://randomuser.me/api/portraits/men/40.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "08:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "08:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "08:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "08:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "08:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "08:00", "cierre": "16:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Carne", "Colombiano", "Comida Latina", "Negocio Local"]
  },
  {
    "id": 121,
    "nombre": "Papelería Latina Express",
    "descripcion": "Todo lo que necesitas para oficina, escuela y más.",
    "categoria": "servicios",
    "comunidad": "hondureña",
    "contacto": {
      "telefono": "555-1021",
      "email": "latinaexpress@ejemplo.com",
      "website": "https://papelerialatina.com",
      "redes": {
        "facebook": "PapeleriaLatinaExpress",
        "instagram": "@latina.express",
        "whatsapp": "1234567821"
      }
    },
    "ubicacion": {
      "direccion": "303 Calle del Papel",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.046980,
        "lng": -96.993120
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Jessica López",
      "imagen": "https://randomuser.me/api/portraits/women/47.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "15:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Papelería", "Hondureño", "Servicios", "Tienda Latina"]
  }, {
    "id": 122,
    "nombre": "Mini Market El Punto",
    "descripcion": "Tu tienda latina con productos típicos, abarrotes y más.",
    "categoria": "comida",
    "comunidad": "ecuatoriana",
    "contacto": {
      "telefono": "555-1022",
      "email": "elpunto@ejemplo.com",
      "website": "https://minimarketelpunto.com",
      "redes": {
        "facebook": "MiniMarketElPunto",
        "instagram": "@elpuntolatino",
        "whatsapp": "1234567822"
      }
    },
    "ubicacion": {
      "direccion": "304 Calle Ecuador",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.045151,
        "lng": -96.997319
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Marco Rivas",
      "imagen": "https://randomuser.me/api/portraits/men/41.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "08:30", "cierre": "20:00" },
      { "dia": "martes", "apertura": "08:30", "cierre": "20:00" },
      { "dia": "miércoles", "apertura": "08:30", "cierre": "20:00" },
      { "dia": "jueves", "apertura": "08:30", "cierre": "20:00" },
      { "dia": "viernes", "apertura": "08:30", "cierre": "21:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "21:00" },
      { "dia": "domingo", "apertura": "09:00", "cierre": "18:00" }
    ],
    "verificado": true,
    "etiquetas": ["Abarrotes", "Latinoamérica", "Ecuatoriano", "Comunidad"]
  },
  {
    "id": 123,
    "nombre": "Centro Cultural Raíces",
    "descripcion": "Clases de danza, música y talleres culturales para la comunidad.",
    "categoria": "servicios",
    "comunidad": "latinoamericana",
    "contacto": {
      "telefono": "555-1023",
      "email": "raicescultural@ejemplo.com",
      "website": "https://centroculturalraices.org",
      "redes": {
        "facebook": "CentroCulturalRaices",
        "instagram": "@cc.raices",
        "whatsapp": "1234567823"
      }
    },
    "ubicacion": {
      "direccion": "305 Calle Cultura",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.043700,
        "lng": -96.992300
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Patricia Díaz",
      "imagen": "https://randomuser.me/api/portraits/women/48.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "20:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "20:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "20:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "20:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "20:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "17:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Cultura", "Danza", "Educación", "Talleres"]
  }, {
    "id": 124,
    "nombre": "Panadería La Abuela",
    "descripcion": "Pan fresco, empanadas, y postres típicos latinos.",
    "categoria": "comida",
    "comunidad": "dominicana",
    "contacto": {
      "telefono": "555-1024",
      "email": "panaderialaabuela@ejemplo.com",
      "website": "https://panaderialaabuela.com",
      "redes": {
        "facebook": "PanaderiaLaAbuela",
        "instagram": "@panaderia.laabuela",
        "whatsapp": "1234567824"
      }
    },
    "ubicacion": {
      "direccion": "306 Calle Dulce",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.042680,
        "lng": -96.990150
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "María Herrera",
      "imagen": "https://randomuser.me/api/portraits/women/49.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "07:00", "cierre": "19:00" },
      { "dia": "martes", "apertura": "07:00", "cierre": "19:00" },
      { "dia": "miércoles", "apertura": "07:00", "cierre": "19:00" },
      { "dia": "jueves", "apertura": "07:00", "cierre": "19:00" },
      { "dia": "viernes", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "sábado", "apertura": "08:00", "cierre": "20:00" },
      { "dia": "domingo", "apertura": "08:00", "cierre": "17:00" }
    ],
    "verificado": true,
    "etiquetas": ["Panadería", "Dulces", "Dominicano", "Comida"]
  },
  {
    "id": 125,
    "nombre": "Auto Detailing El Rayo",
    "descripcion": "Lavado y detallado profesional de autos con servicio a domicilio.",
    "categoria": "automotriz",
    "comunidad": "mexicana",
    "contacto": {
      "telefono": "555-1025",
      "email": "elrayo@ejemplo.com",
      "website": "https://elrayodetailing.com",
      "redes": {
        "facebook": "AutoElRayo",
        "instagram": "@elrayo.autos",
        "whatsapp": "1234567825"
      }
    },
    "ubicacion": {
      "direccion": "307 Calle del Motor",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.046120,
        "lng": -96.989450
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Luis Fernando",
      "imagen": "https://randomuser.me/api/portraits/men/42.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "16:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Autos", "Lavado", "Mexicano", "Servicio a domicilio"]
  }, {
    "id": 126,
    "nombre": "Tacos El Patrón",
    "descripcion": "Los mejores tacos callejeros con sabor auténtico mexicano.",
    "categoria": "comida",
    "comunidad": "mexicana",
    "contacto": {
      "telefono": "555-1026",
      "email": "tacospatron@ejemplo.com",
      "website": "https://tacospatron.com",
      "redes": {
        "facebook": "TacosElPatronLewisville",
        "instagram": "@tacospatron",
        "whatsapp": "1234567826"
      }
    },
    "ubicacion": {
      "direccion": "308 Calle del Sabor",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.040310,
        "lng": -96.996700
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "José Hernández",
      "imagen": "https://randomuser.me/api/portraits/men/43.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "23:00" },
      { "dia": "sábado", "apertura": "11:00", "cierre": "23:00" },
      { "dia": "domingo", "apertura": "11:00", "cierre": "21:00" }
    ],
    "verificado": true,
    "etiquetas": ["Tacos", "Comida Callejera", "Mexicano", "Restaurante"]
  },
  {
    "id": 127,
    "nombre": "Boutique La Esquina",
    "descripcion": "Ropa moderna, accesorios y moda latina para todas las edades.",
    "categoria": "ropa",
    "comunidad": "cubana",
    "contacto": {
      "telefono": "555-1027",
      "email": "boutiquelaesquina@ejemplo.com",
      "website": "https://laesquina.boutique",
      "redes": {
        "facebook": "LaEsquinaModa",
        "instagram": "@laesquinaboutique",
        "whatsapp": "1234567827"
      }
    },
    "ubicacion": {
      "direccion": "309 Calle Estilo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.046750,
        "lng": -96.994550
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Camila Torres",
      "imagen": "https://randomuser.me/api/portraits/women/50.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "11:00", "cierre": "16:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Moda", "Cuba", "Ropa Latina", "Boutique"]
  },
  {
    "id": 128,
    "nombre": "Consultorio Hispano Dental",
    "descripcion": "Atención dental bilingüe para toda la familia.",
    "categoria": "servicios",
    "comunidad": "latinoamericana",
    "contacto": {
      "telefono": "555-1028",
      "email": "dentistalatino@ejemplo.com",
      "website": "https://consultoriohispano.com",
      "redes": {
        "facebook": "ConsultorioDentalLatino",
        "instagram": "@hispano.dental",
        "whatsapp": "1234567828"
      }
    },
    "ubicacion": {
      "direccion": "310 Calle Salud",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.041999,
        "lng": -96.991820
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Dr. Pablo Álvarez",
      "imagen": "https://randomuser.me/api/portraits/men/44.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "08:30", "cierre": "17:00" },
      { "dia": "martes", "apertura": "08:30", "cierre": "17:00" },
      { "dia": "miércoles", "apertura": "08:30", "cierre": "17:00" },
      { "dia": "jueves", "apertura": "08:30", "cierre": "17:00" },
      { "dia": "viernes", "apertura": "08:30", "cierre": "17:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "13:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Salud", "Dental", "Hispano", "Servicios"]
  },
  {
    "id": 129,
    "nombre": "Estudio Creativo Ñ",
    "descripcion": "Diseño gráfico, fotografía y branding para negocios latinos.",
    "categoria": "tecnología",
    "comunidad": "chilena",
    "contacto": {
      "telefono": "555-1029",
      "email": "estudion@ejemplo.com",
      "website": "https://estudion.cl",
      "redes": {
        "facebook": "EstudioCreativoÑ",
        "instagram": "@estudion.creativo",
        "whatsapp": "1234567829"
      }
    },
    "ubicacion": {
      "direccion": "311 Calle Diseño",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.043580,
        "lng": -96.998170
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "Nicolás Fuentes",
      "imagen": "https://randomuser.me/api/portraits/men/45.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "17:00" },
      { "dia": "sábado", "apertura": "Cerrado", "cierre": "Cerrado" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Diseño", "Fotografía", "Marketing", "Chileno"]
  }, {
    "id": 130,
    "nombre": "Arepas & Más",
    "descripcion": "Arepas venezolanas, tequeños y jugos naturales.",
    "categoria": "comida",
    "comunidad": "venezolana",
    "contacto": {
      "telefono": "555-1030",
      "email": "arepasymas@ejemplo.com",
      "website": "https://arepasymas.com",
      "redes": {
        "facebook": "ArepasyMasTX",
        "instagram": "@arepasy.mas",
        "whatsapp": "1234567830"
      }
    },
    "ubicacion": {
      "direccion": "312 Calle Caribe",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.042900,
        "lng": -96.991100
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Gabriela Pérez",
      "imagen": "https://randomuser.me/api/portraits/women/51.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "sábado", "apertura": "11:00", "cierre": "22:00" },
      { "dia": "domingo", "apertura": "11:00", "cierre": "18:00" }
    ],
    "verificado": true,
    "etiquetas": ["Comida", "Venezolano", "Arepas", "Latino"]
  },
  {
    "id": 131,
    "nombre": "Academia de Ritmo Latino",
    "descripcion": "Clases de salsa, bachata y cumbia para todas las edades.",
    "categoria": "servicios",
    "comunidad": "latinoamericana",
    "contacto": {
      "telefono": "555-1031",
      "email": "ritmolatino@ejemplo.com",
      "website": "https://academiaderitmo.com",
      "redes": {
        "facebook": "AcademiaRitmoLatino",
        "instagram": "@ritmolatino.dfw",
        "whatsapp": "1234567831"
      }
    },
    "ubicacion": {
      "direccion": "313 Calle Ritmo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.046870,
        "lng": -96.990240
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Carlos Medina",
      "imagen": "https://randomuser.me/api/portraits/men/46.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "martes", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "miércoles", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "jueves", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "viernes", "apertura": "16:00", "cierre": "23:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "14:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Baile", "Cultura", "Salsa", "Bachata"]
  },
  {
    "id": 132,
    "nombre": "Peluquería Estilo Latino",
    "descripcion": "Cortes modernos, barbería y alisados latinos.",
    "categoria": "belleza",
    "comunidad": "dominicana",
    "contacto": {
      "telefono": "555-1032",
      "email": "estilolatino@ejemplo.com",
      "website": "https://estilolatino.com",
      "redes": {
        "facebook": "PeluqueriaEstiloLatino",
        "instagram": "@estilo.latino",
        "whatsapp": "1234567832"
      }
    },
    "ubicacion": {
      "direccion": "314 Calle Estilo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.045420,
        "lng": -96.990820
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "Roberto Peña",
      "imagen": "https://randomuser.me/api/portraits/men/47.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "17:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Peluquería", "Corte Latino", "Barbería", "Dominicano"]
  },
  {
    "id": 133,
    "nombre": "Tienda Natural Vida Sana",
    "descripcion": "Suplementos, productos naturales y bienestar integral.",
    "categoria": "salud",
    "comunidad": "colombiana",
    "contacto": {
      "telefono": "555-1033",
      "email": "vidasana@ejemplo.com",
      "website": "https://tiendavidasana.com",
      "redes": {
        "facebook": "NaturalVidaSana",
        "instagram": "@natural.vida",
        "whatsapp": "1234567833"
      }
    },
    "ubicacion": {
      "direccion": "315 Calle Salud",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.043020,
        "lng": -96.989300
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Sandra León",
      "imagen": "https://randomuser.me/api/portraits/women/52.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "16:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Salud", "Natural", "Suplementos", "Colombiano"]
  }, {
    "id": 130,
    "nombre": "Arepas & Más",
    "descripcion": "Arepas venezolanas, tequeños y jugos naturales.",
    "categoria": "comida",
    "comunidad": "venezolana",
    "contacto": {
      "telefono": "555-1030",
      "email": "arepasymas@ejemplo.com",
      "website": "https://arepasymas.com",
      "redes": {
        "facebook": "ArepasyMasTX",
        "instagram": "@arepasy.mas",
        "whatsapp": "1234567830"
      }
    },
    "ubicacion": {
      "direccion": "312 Calle Caribe",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.042900,
        "lng": -96.991100
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Gabriela Pérez",
      "imagen": "https://randomuser.me/api/portraits/women/51.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "21:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "sábado", "apertura": "11:00", "cierre": "22:00" },
      { "dia": "domingo", "apertura": "11:00", "cierre": "18:00" }
    ],
    "verificado": true,
    "etiquetas": ["Comida", "Venezolano", "Arepas", "Latino"]
  },
  {
    "id": 131,
    "nombre": "Academia de Ritmo Latino",
    "descripcion": "Clases de salsa, bachata y cumbia para todas las edades.",
    "categoria": "servicios",
    "comunidad": "latinoamericana",
    "contacto": {
      "telefono": "555-1031",
      "email": "ritmolatino@ejemplo.com",
      "website": "https://academiaderitmo.com",
      "redes": {
        "facebook": "AcademiaRitmoLatino",
        "instagram": "@ritmolatino.dfw",
        "whatsapp": "1234567831"
      }
    },
    "ubicacion": {
      "direccion": "313 Calle Ritmo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.046870,
        "lng": -96.990240
      }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Carlos Medina",
      "imagen": "https://randomuser.me/api/portraits/men/46.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "martes", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "miércoles", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "jueves", "apertura": "16:00", "cierre": "22:00" },
      { "dia": "viernes", "apertura": "16:00", "cierre": "23:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "14:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Baile", "Cultura", "Salsa", "Bachata"]
  },
  {
    "id": 132,
    "nombre": "Peluquería Estilo Latino",
    "descripcion": "Cortes modernos, barbería y alisados latinos.",
    "categoria": "belleza",
    "comunidad": "dominicana",
    "contacto": {
      "telefono": "555-1032",
      "email": "estilolatino@ejemplo.com",
      "website": "https://estilolatino.com",
      "redes": {
        "facebook": "PeluqueriaEstiloLatino",
        "instagram": "@estilo.latino",
        "whatsapp": "1234567832"
      }
    },
    "ubicacion": {
      "direccion": "314 Calle Estilo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.045420,
        "lng": -96.990820
      }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "Roberto Peña",
      "imagen": "https://randomuser.me/api/portraits/men/47.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "17:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Peluquería", "Corte Latino", "Barbería", "Dominicano"]
  },
  {
    "id": 133,
    "nombre": "Tienda Natural Vida Sana",
    "descripcion": "Suplementos, productos naturales y bienestar integral.",
    "categoria": "salud",
    "comunidad": "colombiana",
    "contacto": {
      "telefono": "555-1033",
      "email": "vidasana@ejemplo.com",
      "website": "https://tiendavidasana.com",
      "redes": {
        "facebook": "NaturalVidaSana",
        "instagram": "@natural.vida",
        "whatsapp": "1234567833"
      }
    },
    "ubicacion": {
      "direccion": "315 Calle Salud",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": {
        "lat": 33.043020,
        "lng": -96.989300
      }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Sandra León",
      "imagen": "https://randomuser.me/api/portraits/women/52.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "16:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Salud", "Natural", "Suplementos", "Colombiano"]
  },{
    "id": 138,
    "nombre": "Taquería El Buen Gusto",
    "descripcion": "Tacos, burritos y salsas caseras en un ambiente familiar.",
    "categoria": "comida",
    "comunidad": "mexicana",
    "contacto": {
      "telefono": "555-1038",
      "email": "elbuen.gusto@ejemplo.com",
      "website": "https://elbuen-gusto.com",
      "redes": {
        "facebook": "TaqueriaElBuenGusto",
        "instagram": "@buen.gusto",
        "whatsapp": "1234567838"
      }
    },
    "ubicacion": {
      "direccion": "320 Calle del Sabor",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": { "lat": 33.044000, "lng": -96.993000 }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Tomás Aguilar",
      "imagen": "https://randomuser.me/api/portraits/men/50.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "martes", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "miércoles", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "jueves", "apertura": "10:00", "cierre": "22:00" },
      { "dia": "viernes", "apertura": "10:00", "cierre": "23:00" },
      { "dia": "sábado", "apertura": "11:00", "cierre": "23:00" },
      { "dia": "domingo", "apertura": "11:00", "cierre": "21:00" }
    ],
    "verificado": true,
    "etiquetas": ["Tacos", "Burritos", "Mexicano", "Comida"]
  },
  {
    "id": 139,
    "nombre": "Barbería El Corte Real",
    "descripcion": "Cortes clásicos y modernos para hombres y niños.",
    "categoria": "belleza",
    "comunidad": "hondureña",
    "contacto": {
      "telefono": "555-1039",
      "email": "elcortereal@ejemplo.com",
      "website": "https://barberiaelcortereal.com",
      "redes": {
        "facebook": "BarberiaElCorteReal",
        "instagram": "@elcortereal",
        "whatsapp": "1234567839"
      }
    },
    "ubicacion": {
      "direccion": "321 Calle del Estilo",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": { "lat": 33.041600, "lng": -96.996100 }
    },
    imagenDestacada: d,
    "propietario": {
      "nombre": "Emanuel Gómez",
      "imagen": "https://randomuser.me/api/portraits/men/51.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "19:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "20:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Barbería", "Cortes", "Hondureño", "Belleza"]
  },
  {
    "id": 140,
    "nombre": "Estudio de Yoga Tierra y Alma",
    "descripcion": "Clases de yoga, meditación y bienestar holístico.",
    "categoria": "salud",
    "comunidad": "latinoamericana",
    "contacto": {
      "telefono": "555-1040",
      "email": "yogatierrayalma@ejemplo.com",
      "website": "https://yogatierrayalma.com",
      "redes": {
        "facebook": "YogaTierraYAlma",
        "instagram": "@tierrayalma.yoga",
        "whatsapp": "1234567840"
      }
    },
    "ubicacion": {
      "direccion": "322 Calle Paz",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": { "lat": 33.042222, "lng": -96.994222 }
    },
    imagenDestacada: b,
    "propietario": {
      "nombre": "Luciana Ortega",
      "imagen": "https://randomuser.me/api/portraits/women/55.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "martes", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "miércoles", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "jueves", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "viernes", "apertura": "07:00", "cierre": "20:00" },
      { "dia": "sábado", "apertura": "09:00", "cierre": "13:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Yoga", "Bienestar", "Meditación", "Salud"]
  },
  {
    "id": 141,
    "nombre": "Impresiones Latinas",
    "descripcion": "Impresión digital, banners, tarjetas y personalización.",
    "categoria": "tecnología",
    "comunidad": "venezolana",
    "contacto": {
      "telefono": "555-1041",
      "email": "impresioneslatinas@ejemplo.com",
      "website": "https://impresioneslatinas.com",
      "redes": {
        "facebook": "ImpresionesLatinasDFW",
        "instagram": "@impresiones.latinas",
        "whatsapp": "1234567841"
      }
    },
    "ubicacion": {
      "direccion": "323 Calle Diseño",
      "ciudad": "Lewisville",
      "estado": "TX",
      "codigoPostal": "75067",
      "pais": "USA",
      "coordenadas": { "lat": 33.043333, "lng": -96.991111 }
    },
    imagenDestacada: c,
    "propietario": {
      "nombre": "Yulimar Rojas",
      "imagen": "https://randomuser.me/api/portraits/women/56.jpg"
    },
    "horarios": [
      { "dia": "lunes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "martes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "miércoles", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "jueves", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "viernes", "apertura": "09:00", "cierre": "18:00" },
      { "dia": "sábado", "apertura": "10:00", "cierre": "14:00" },
      { "dia": "domingo", "apertura": "Cerrado", "cierre": "Cerrado" }
    ],
    "verificado": true,
    "etiquetas": ["Diseño", "Impresión", "Venezolano", "Servicios"]
  }
  
  
  
  
  
  
  
  
];

export default negocios;
