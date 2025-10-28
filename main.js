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
    descripcion: "El personaje principal y icónico que canta 'tralalero tralala' de forma hipnótica y pegajosa",
    origen: "Serie Tralalero/TikTok viral",
    popularidad: "Muy alta",
    imagen: "tralalero-tralala.png",
    memes: ["Tralalero tralala", "Tralala brainrot", "Tralalero Ohio", "Sigma tralalero"]
  },
  {
    id: 2,
    nombre: "Ballerina Capuchina",
    descripcion: "Una elegante bailarina con capucha que danza al ritmo del tralalero",
    origen: "Serie Tralalero",
    popularidad: "Alta",
    imagen: "ballerina-capuchina.png",
    memes: ["Capuchina dance", "Ballerina brainrot", "Tralalero ballet"]
  },
  {
    id: 3,
    nombre: "Boneca Ambalabu",
    descripcion: "Una muñeca misteriosa que repite 'ambalabu' en melodías pegajosas",
    origen: "Serie Tralalero",
    popularidad: "Alta",
    imagen: "boneca-ambalabu.png",
    memes: ["Ambalabu boneca", "Doll tralalero", "Ambalabu Ohio"]
  },
  {
    id: 4,
    nombre: "Broccoli Assassini",
    descripcion: "Un brócoli asesino que ataca con ritmos tralalero",
    origen: "Serie Tralalero",
    popularidad: "Media-Alta",
    imagen: "broccoli-assassini.png",
    memes: ["Broccoli sigma", "Assassini brainrot", "Vegetable tralalero"]
  },
  {
    id: 5,
    nombre: "Brr Brr Patapim",
    descripcion: "Personaje que hace sonidos de frío mientras canta patapim",
    origen: "Serie Tralalero",
    popularidad: "Media",
    imagen: "brr-brr-patapim.png",
    memes: ["Brr brr cold", "Patapim freeze", "Ice tralalero"]
  },
  {
    id: 6,
    nombre: "Cocofanto Elefanto",
    descripcion: "Un elefante tropical que combina coco con sonidos de trompeta",
    origen: "Serie Tralalero",
    popularidad: "Alta",
    imagen: "cocofanto-elefanto.png",
    memes: ["Cocofanto trunk", "Elephant tralalero", "Tropical brainrot"]
  },
  {
    id: 7,
    nombre: "Trulimero Trulichina",
    descripcion: "El primo del Tralalero que canta con variaciones trulichina",
    origen: "Serie Tralalero",
    popularidad: "Media-Alta",
    imagen: "trulimero-trulichina.png",
    memes: ["Trulimero variation", "Trulichina cousin", "Family tralalero"]
  },
  {
    id: 8,
    nombre: "Tung Tung Tung Sahur",
    descripcion: "Personaje percusivo que hace ritmos tung tung durante el sahur",
    origen: "Serie Tralalero",
    popularidad: "Media",
    imagen: "tung-tung-tung-sahur.png",
    memes: ["Tung percussion", "Sahur rhythm", "Dawn tralalero"]
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
