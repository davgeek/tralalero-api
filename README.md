# Tralalero API Rest
API Rest para obtener los personajes de brainrot

## Descripción
Esta API proporciona información sobre personajes de la serie **Tralalero**, incluyendo el icónico **Tralalero Tralala** y todos sus amigos.

## Características
- ✅ API RESTful de solo lectura
- ✅ 8 personajes únicos de la serie Tralalero
- ✅ Imágenes PNG incluidas para cada personaje
- ✅ Búsqueda por nombre
- ✅ Filtrado por popularidad
- ✅ Estadísticas de la API

## Personajes disponibles
- **Tralalero Tralala** - El personaje principal icónico
- **Ballerina Capuchina** - La bailarina con capucha elegante
- **Boneca Ambalabu** - La muñeca misteriosa
- **Broccoli Assassini** - El brócoli asesino rítmico
- **Brr Brr Patapim** - El personaje del frío
- **Cocofanto Elefanto** - El elefante tropical
- **Trulimero Trulichina** - El primo del Tralalero
- **Tung Tung Tung Sahur** - El maestro de la percusión

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
  "descripcion": "El personaje principal y icónico que canta 'tralalero tralala' de forma hipnótica y pegajosa",
  "origen": "Serie Tralalero/TikTok viral",
  "popularidad": "Muy alta",
  "imagen": "https://tu-api.vercel.app/images/tralalero-tralala.png",
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