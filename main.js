const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de imágenes
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Helper function para generar URLs de imágenes
const getImageUrl = (imageName, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('host')}` : '';
  return `${baseUrl}/images/${imageName}`;
};

// Lista estática de personajes de brainrot en memoria
const personajesBrainrot = [
  {
    id: 1,
    nombre: "Tralalero Tralala",
    descripcion: "El personaje icónico que canta 'tralalero tralala' de forma hipnótica y pegajosa",
    origen: "Meme viral/TikTok",
    popularidad: "Muy alta",
    imagen: "tralalero-tralala.jpg",
    memes: ["Tralalero tralala", "Tralala brainrot", "Tralalero Ohio", "Sigma tralalero"]
  },
  {
    id: 2,
    nombre: "Sigma Male",
    descripcion: "El arquetipo del macho alfa independiente que no necesita la validación de nadie",
    origen: "Manosphere/Internet culture",
    popularidad: "Muy alta",
    imagen: "sigma-male.jpg",
    memes: ["Sigma grindset", "Lone wolf", "Alpha vs Beta vs Sigma"]
  },
  {
    id: 3,
    nombre: "Chad",
    descripcion: "El estereotipo del hombre atractivo, confiado y exitoso con las mujeres",
    origen: "4chan/Incel culture",
    popularidad: "Alta",
    imagen: "chad.jpg",
    memes: ["Chad vs Virgin", "Gigachad", "Yes Chad"]
  },
  {
    id: 4,
    nombre: "Skibidi Toilet",
    descripcion: "Personaje de una serie viral de YouTube con toilets cantando",
    origen: "YouTube (DaFuq!?Boom!)",
    popularidad: "Extrema en Gen Alpha",
    imagen: "skibidi-toilet.jpg",
    memes: ["Skibidi bop bop yes yes", "Ohio Skibidi", "Skibidi Toilet vs Cameraman"]
  },
  {
    id: 5,
    nombre: "Gyatt",
    descripcion: "Expresión de admiración, especialmente hacia atractivo físico",
    origen: "Twitch/Kai Cenat",
    popularidad: "Muy alta",
    imagen: "gyatt.jpg",
    memes: ["Gyatt damn", "Level 10 Gyatt", "Rizz + Gyatt"]
  },
  {
    id: 6,
    nombre: "Rizzler",
    descripcion: "Alguien con mucho 'rizz' (carisma para ligar)",
    origen: "TikTok/Gen Z slang",
    popularidad: "Alta",
    imagen: "rizzler.jpg",
    memes: ["Ohio Rizzler", "Unspoken Rizz", "W Rizz vs L Rizz"]
  },
  {
    id: 7,
    nombre: "Fanum Tax",
    descripcion: "Tomar comida de alguien sin permiso, basado en el streamer Fanum",
    origen: "Twitch/AMP House",
    popularidad: "Alta",
    imagen: "fanum-tax.jpg",
    memes: ["Fanum Tax on your food", "Ohio Fanum Tax", "Sigma Fanum Tax"]
  },
  {
    id: 8,
    nombre: "Ohio",
    descripcion: "Adjetivo para describir algo extraño, raro o surrealista",
    origen: "TikTok memes",
    popularidad: "Muy alta",
    imagen: "ohio.jpg",
    memes: ["Only in Ohio", "Ohio Final Boss", "Ohio be like"]
  },
  {
    id: 9,
    nombre: "Sussy Baka",
    descripcion: "Combinación de 'suspicious' (Among Us) y 'baka' (tonto en japonés)",
    origen: "Among Us + Anime culture",
    popularidad: "Media",
    imagen: "sussy-baka.jpg",
    memes: ["You're such a sussy baka", "Sus amogus", "Baka sussy impostor"]
  },
  {
    id: 10,
    nombre: "Based Gigachad",
    descripcion: "Versión extrema de Chad, representa la masculinidad idealizada",
    origen: "Internet/Bodybuilding forums",
    popularidad: "Alta",
    imagen: "gigachad.jpg",
    memes: ["Average fan vs Average enjoyer", "Gigachad music", "Based department"]
  },
  {
    id: 11,
    nombre: "Sigma Grindset",
    descripcion: "Mentalidad de trabajo duro e independencia total",
    origen: "Manosphere/Hustle culture",
    popularidad: "Alta",
    imagen: "sigma-grindset.jpg",
    memes: ["Sigma male grindset", "Lone wolf mindset", "Reject beta, embrace sigma"]
  },
  {
    id: 12,
    nombre: "Backrooms Entity",
    descripcion: "Criaturas misteriosas que habitan en los Backrooms",
    origen: "4chan creepypasta",
    popularidad: "Media-Alta",
    imagen: "backrooms-entity.jpg",
    memes: ["Level 0 Backrooms", "The Wanderer", "Yellow rooms"]
  },
  {
    id: 13,
    nombre: "Drip Goku",
    descripcion: "Goku con ropa moderna y estilosa (drip = estilo)",
    origen: "Dragon Ball + Fashion memes",
    popularidad: "Media",
    imagen: "drip-goku.jpg",
    memes: ["Goku drip", "Ultra Instinct Drip", "Sheesh Goku"]
  }
];

// Función para agregar URLs completas de imágenes a los personajes
const agregarUrlsImagenes = (personajes, req) => {
  return personajes.map(personaje => ({
    ...personaje,
    imagen: getImageUrl(personaje.imagen, req)
  }));
};

// Rutas de la API

// GET /api/personajes - Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
  try {
    const personajesConImagenes = agregarUrlsImagenes(personajesBrainrot, req);
    res.status(200).json({
      success: true,
      data: personajesConImagenes,
      total: personajesConImagenes.length,
      message: 'Personajes obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /api/personajes/:id - Obtener un personaje por ID
app.get('/api/personajes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID debe ser un número válido'
      });
    }

    const personaje = personajesBrainrot.find(p => p.id === id);
    
    if (!personaje) {
      return res.status(404).json({
        success: false,
        message: `Personaje con ID ${id} no encontrado`
      });
    }

    const personajeConImagen = {
      ...personaje,
      imagen: getImageUrl(personaje.imagen, req)
    };

    res.status(200).json({
      success: true,
      data: personajeConImagen,
      message: 'Personaje encontrado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /api/personajes/search/:nombre - Buscar personajes por nombre
app.get('/api/personajes/search/:nombre', (req, res) => {
  try {
    const nombreBusqueda = req.params.nombre.toLowerCase();
    
    const personajesEncontrados = personajesBrainrot.filter(personaje =>
      personaje.nombre.toLowerCase().includes(nombreBusqueda) ||
      personaje.descripcion.toLowerCase().includes(nombreBusqueda)
    );
    
    if (personajesEncontrados.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron personajes que coincidan con "${req.params.nombre}"`
      });
    }

    const personajesConImagenes = agregarUrlsImagenes(personajesEncontrados, req);

    res.status(200).json({
      success: true,
      data: personajesConImagenes,
      total: personajesConImagenes.length,
      message: `${personajesConImagenes.length} personaje(s) encontrado(s)`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /api/personajes/popularidad/:nivel - Filtrar por nivel de popularidad
app.get('/api/personajes/popularidad/:nivel', (req, res) => {
  try {
    const nivelPopularidad = req.params.nivel.toLowerCase();
    const nivelesValidos = ['muy alta', 'alta', 'media', 'media-alta', 'extrema en gen alpha'];
    
    if (!nivelesValidos.some(nivel => nivel.includes(nivelPopularidad))) {
      return res.status(400).json({
        success: false,
        message: 'Nivel de popularidad no válido. Niveles disponibles: muy alta, alta, media, media-alta, extrema en gen alpha'
      });
    }

    const personajesFiltrados = personajesBrainrot.filter(personaje =>
      personaje.popularidad.toLowerCase().includes(nivelPopularidad)
    );
    
    const personajesConImagenes = agregarUrlsImagenes(personajesFiltrados, req);
    
    res.status(200).json({
      success: true,
      data: personajesConImagenes,
      total: personajesConImagenes.length,
      message: `Personajes con popularidad "${req.params.nivel}" obtenidos exitosamente`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// GET /api/stats - Estadísticas de la API
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      totalPersonajes: personajesBrainrot.length,
      origenes: [...new Set(personajesBrainrot.map(p => p.origen))],
      nivelesPopularidad: [...new Set(personajesBrainrot.map(p => p.popularidad))],
      totalMemes: personajesBrainrot.reduce((total, p) => total + p.memes.length, 0)
    };

    res.status(200).json({
      success: true,
      data: stats,
      message: 'Estadísticas obtenidas exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Ruta raíz con información de la API
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenido a la Tralalero API - Personajes de Brainrot',
    version: '1.0.0',
    endpoints: {
      'GET /api/personajes': 'Obtener todos los personajes',
      'GET /api/personajes/:id': 'Obtener personaje por ID',
      'GET /api/personajes/search/:nombre': 'Buscar personajes por nombre',
      'GET /api/personajes/popularidad/:nivel': 'Filtrar por popularidad',
      'GET /api/stats': 'Estadísticas de la API'
    },
    ejemplo: 'GET /api/personajes/1'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /',
      'GET /api/personajes',
      'GET /api/personajes/:id',
      'GET /api/personajes/search/:nombre',
      'GET /api/personajes/popularidad/:nivel',
      'GET /api/stats'
    ]
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Total de personajes de brainrot disponibles: ${personajesBrainrot.length}`);
  console.log('🎭 Endpoints disponibles:');
  console.log('   GET / - Información de la API');
  console.log('   GET /api/personajes - Todos los personajes');
  console.log('   GET /api/personajes/:id - Personaje específico');
  console.log('   GET /api/personajes/search/:nombre - Buscar personajes');
  console.log('   GET /api/personajes/popularidad/:nivel - Filtrar por popularidad');
  console.log('   GET /api/stats - Estadísticas');
});

module.exports = app;
