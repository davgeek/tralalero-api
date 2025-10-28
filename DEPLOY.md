# Despliegue en Vercel - Tralalero API

## Pasos para desplegar

### 1. Preparar las imágenes
1. Agregar las imágenes de los personajes en la carpeta `public/images/`
2. Los nombres de archivo deben coincidir con los especificados en el código:
   - `tralalero-tralala.jpg`
   - `sigma-male.jpg`
   - `chad.jpg`
   - `skibidi-toilet.jpg`
   - `gyatt.jpg`
   - `rizzler.jpg`
   - `fanum-tax.jpg`
   - `ohio.jpg`
   - `sussy-baka.jpg`
   - `gigachad.jpg`
   - `sigma-grindset.jpg`
   - `backrooms-entity.jpg`
   - `drip-goku.jpg`

### 2. Configurar Vercel CLI
```bash
npm install -g vercel
vercel login
```

### 3. Desplegar
```bash
# Desde el directorio del proyecto
vercel

# O para producción
vercel --prod
```

### 4. Configuración automática
El archivo `vercel.json` ya está configurado para:
- ✅ Servir la API desde `main.js`
- ✅ Servir imágenes estáticas desde `/images/*`
- ✅ Redireccionar todas las rutas a la API
- ✅ Configurar tiempo máximo de ejecución

## URLs después del despliegue

Una vez desplegado, tu API estará disponible en:
- `https://tu-proyecto.vercel.app/`
- `https://tu-proyecto.vercel.app/api/personajes`
- `https://tu-proyecto.vercel.app/api/personajes/1`
- `https://tu-proyecto.vercel.app/images/tralalero-tralala.jpg`

## Variables de entorno (opcional)

Si necesitas configurar variables de entorno:

```bash
vercel env add
```

## Troubleshooting

### Problema: Imágenes no se muestran
- Verificar que los archivos estén en `public/images/`
- Verificar que los nombres coincidan exactamente
- Verificar que el archivo `vercel.json` esté en la raíz

### Problema: API no responde
- Verificar que `main.js` esté en la raíz del proyecto
- Verificar que todas las dependencias estén en `package.json`
- Revisar los logs en el dashboard de Vercel