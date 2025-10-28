# Despliegue en Vercel - Tralalero API

## Pasos para desplegar

### 1. Imágenes ya incluidas ✅
Las siguientes imágenes ya están disponibles en `public/images/`:
- `tralalero-tralala.png` ✅
- `ballerina-capuchina.png` ✅
- `boneca-ambalabu.png` ✅
- `broccoli-assassini.png` ✅
- `brr-brr-patapim.png` ✅
- `cocofanto-elefanto.png` ✅
- `trulimero-trulichina.png` ✅
- `tung-tung-tung-sahur.png` ✅

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

## URLs después del despliegue

Una vez desplegado, tu API estará disponible en:
- `https://tu-proyecto.vercel.app/`
- `https://tu-proyecto.vercel.app/api/personajes`
- `https://tu-proyecto.vercel.app/api/personajes/1`
- `https://tu-proyecto.vercel.app/images/tralalero-tralala.png`

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