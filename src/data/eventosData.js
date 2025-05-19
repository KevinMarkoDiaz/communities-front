import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.png";
import d from "../assets/d.jpg";

const eventos = [
  {
    "id": 1,
    "title": "Evento Cultural 1",
    "description": "Este es un evento especial número 1 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-01",
    "time": "18:00",
    "location": "Centro Cultural 1, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 1",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 2,
    "title": "Evento Cultural 2",
    "description": "Este es un evento especial número 2 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-02",
    "time": "18:00",
    "location": "Centro Cultural 2, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 2",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": d
    }
  },
  {
    "id": 3,
    "title": "Evento Cultural 3",
    "description": "Este es un evento especial número 3 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-03",
    "time": "18:00",
    "location": "Centro Cultural 3, Ciudad Ejemplo",
    "image": c,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 3",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": a
    }
  },
  {
    "id": 4,
    "title": "Evento Cultural 4",
    "description": "Este es un evento especial número 4 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-04",
    "time": "18:00",
    "location": "Centro Cultural 4, Ciudad Ejemplo",
    "image": a,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 4",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 5,
    "title": "Evento Cultural 5",
    "description": "Este es un evento especial número 5 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-05",
    "time": "18:00",
    "location": "Centro Cultural 5, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 5",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": a
    }
  },
  {
    "id": 6,
    "title": "Evento Cultural 6",
    "description": "Este es un evento especial número 6 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-06",
    "time": "18:00",
    "location": "Centro Cultural 6, Ciudad Ejemplo",
    "image": c,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 6",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 7,
    "title": "Evento Cultural 7",
    "description": "Este es un evento especial número 7 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-07",
    "time": "18:00",
    "location": "Centro Cultural 7, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 7",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 8,
    "title": "Evento Cultural 8",
    "description": "Este es un evento especial número 8 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-08",
    "time": "18:00",
    "location": "Centro Cultural 8, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 8",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 9,
    "title": "Evento Cultural 9",
    "description": "Este es un evento especial número 9 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-09",
    "time": "18:00",
    "location": "Centro Cultural 9, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 9",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 10,
    "title": "Evento Cultural 10",
    "description": "Este es un evento especial número 10 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-01",
    "time": "18:00",
    "location": "Centro Cultural 10, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 10",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 11,
    "title": "Evento Cultural 11",
    "description": "Este es un evento especial número 11 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-02",
    "time": "18:00",
    "location": "Centro Cultural 11, Ciudad Ejemplo",
    "image": a,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 11",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": d
    }
  },
  {
    "id": 12,
    "title": "Evento Cultural 12",
    "description": "Este es un evento especial número 12 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-03",
    "time": "18:00",
    "location": "Centro Cultural 12, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 12",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": d
    }
  },
  {
    "id": 13,
    "title": "Evento Cultural 13",
    "description": "Este es un evento especial número 13 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-04",
    "time": "18:00",
    "location": "Centro Cultural 13, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 13",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 14,
    "title": "Evento Cultural 14",
    "description": "Este es un evento especial número 14 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-05",
    "time": "18:00",
    "location": "Centro Cultural 14, Ciudad Ejemplo",
    "image": a,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 14",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 15,
    "title": "Evento Cultural 15",
    "description": "Este es un evento especial número 15 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-06",
    "time": "18:00",
    "location": "Centro Cultural 15, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 15",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": d
    }
  },
  {
    "id": 16,
    "title": "Evento Cultural 16",
    "description": "Este es un evento especial número 16 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-07",
    "time": "18:00",
    "location": "Centro Cultural 16, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 16",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 17,
    "title": "Evento Cultural 17",
    "description": "Este es un evento especial número 17 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-08",
    "time": "18:00",
    "location": "Centro Cultural 17, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 17",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 18,
    "title": "Evento Cultural 18",
    "description": "Este es un evento especial número 18 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-09",
    "time": "18:00",
    "location": "Centro Cultural 18, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 18",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 19,
    "title": "Evento Cultural 19",
    "description": "Este es un evento especial número 19 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-01",
    "time": "18:00",
    "location": "Centro Cultural 19, Ciudad Ejemplo",
    "image": c,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 19",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  },
  {
    "id": 20,
    "title": "Evento Cultural 20",
    "description": "Este es un evento especial número 20 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-02",
    "time": "18:00",
    "location": "Centro Cultural 20, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 20",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": a
    }
  },
  {
    "id": 21,
    "title": "Evento Cultural 21",
    "description": "Este es un evento especial número 21 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-03",
    "time": "18:00",
    "location": "Centro Cultural 21, Ciudad Ejemplo",
    "image": b,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 21",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": a
    }
  },
  {
    "id": 22,
    "title": "Evento Cultural 22",
    "description": "Este es un evento especial número 22 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-04",
    "time": "18:00",
    "location": "Centro Cultural 22, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 22",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 23,
    "title": "Evento Cultural 23",
    "description": "Este es un evento especial número 23 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-05",
    "time": "18:00",
    "location": "Centro Cultural 23, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 23",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": c
    }
  },
  {
    "id": 24,
    "title": "Evento Cultural 24",
    "description": "Este es un evento especial número 24 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-06",
    "time": "18:00",
    "location": "Centro Cultural 24, Ciudad Ejemplo",
    "image": d,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 24",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": d
    }
  },
  {
    "id": 25,
    "title": "Evento Cultural 25",
    "description": "Este es un evento especial número 25 que celebra la cultura, la música y la tradición de nuestras comunidades migrantes. Habrá presentaciones en vivo, puestos de comida y más.",
    "date": "2025-08-07",
    "time": "18:00",
    "location": "Centro Cultural 25, Ciudad Ejemplo",
    "image": c,
    "tags": [
      "Cultura",
      "Música",
      "Comida",
      "Comunidad"
    ],
    "organizer": {
      "name": "Organizador 25",
      "description": "Promotor de eventos culturales y comunitarios.",
      "image": b
    }
  }
];

export default eventos;