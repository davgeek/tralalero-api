# Tralalero API Rest
API Rest para obtener los personajes de brainrot

## Descripción
Esta API proporciona información sobre personajes populares de la cultura "brainrot" de internet, incluyendo el icónico **Tralalero Tralala**.

## Características
- ✅ API RESTful de solo lectura
- ✅ 13 personajes de brainrot únicos
- ✅ Imágenes incluidas para cada personaje
- ✅ Búsqueda por nombre
- ✅ Filtrado por popularidad
- ✅ Estadísticas de la API

## Personajes destacados
- **Tralalero Tralala** - El personaje principal con su característico canto
- Sigma Male
- Chad y Gigachad
- Skibidi Toilet
- Gyatt
- Rizzler
- Fanum Tax
- Ohio
- Y muchos más...

## Endpoints disponibles

### GET /
Información general de la API

### GET /api/personajes
Obtiene todos los personajes de brainrot

### GET /api/personajes/:id
Obtiene un personaje específico por ID

### GET /api/personajes/search/:nombre
Busca personajes por nombre o descripción

### GET /api/personajes/popularidad/:nivel
Filtra personajes por nivel de popularidad
- Niveles: "muy alta", "alta", "media", "media-alta", "extrema en gen alpha"

### GET /api/stats
Estadísticas de la API

## Estructura de respuesta
```json
{
  "id": 1,
  "nombre": "Tralalero Tralala",
  "descripcion": "El personaje icónico que canta 'tralalero tralala' de forma hipnótica y pegajosa",
  "origen": "Meme viral/TikTok",
  "popularidad": "Muy alta",
  "imagen": "https://example.com/images/tralalero-tralala.jpg",
  "memes": ["Tralalero tralala", "Tralala brainrot", "Tralalero Ohio", "Sigma tralalero"]
}
```

## Instalación y uso

### Desarrollo local
```bash
npm install
npm start
```

### Despliegue en Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones detalladas de despliegue.

El servidor estará disponible en http://localhost:3000 (local) o en tu URL de Vercel.

## Ejemplos de uso

```bash
# Obtener todos los personajes
curl http://localhost:3000/api/personajes

# Obtener el Tralalero Tralala
curl http://localhost:3000/api/personajes/1

# Buscar personajes relacionados con "sigma"
curl http://localhost:3000/api/personajes/search/sigma

# Obtener personajes con popularidad muy alta
curl http://localhost:3000/api/personajes/popularidad/muy%20alta
```