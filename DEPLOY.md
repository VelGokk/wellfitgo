# DEPLOY.md

## Tipo de proyecto detectado
- **Next.js (output: 'export')** → Sitio estático exportable (ideal para DonWeb hosting compartido)

## Pasos de build y exportación
1. Instala dependencias (si no lo hiciste):
   ```sh
   npm install
   ```
2. Genera el build estático:
   ```sh
   npm run build && npx next export
   ```
   - Esto creará la carpeta `/out` con todos los archivos listos para deploy.

## Archivos a subir a DonWeb
- Sube TODO el contenido de la carpeta `/out` al directorio `public_html/` de tu hosting DonWeb (por FTP o Administrador de Archivos).
- No subas carpetas como `.next`, `node_modules`, ni archivos de configuración del proyecto.

## .htaccess recomendado (para SPA/Next export)
Crea un archivo `.htaccess` en `public_html/` con este contenido para soportar rutas amigables:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Variables de entorno
- No se requieren variables de entorno para el sitio exportado.
- Si en el futuro usas APIs privadas, deberás migrar a un VPS o serverless.

## SEO y assets
- Verifica que existan y estén correctos:
  - `/sitemap.xml` y `/robots.txt` (ya generados en `/out` si tienes los archivos en `app/`)
  - `/site.webmanifest` y favicons en `/public`
  - Meta OpenGraph/Twitter en `<head>` de cada página principal

## Lista de verificación final antes de publicar
- [ ] Build sin errores ni warnings críticos
- [ ] Navegación y enlaces revisados (incluyendo descargo de programas)
- [ ] Formularios y focus accesibles
- [ ] 404 personalizado funcionando
- [ ] Botón WhatsApp flotante visible y accesible
- [ ] Footer y navbar con redes y blur sticky
- [ ] Lighthouse: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 (Home)
- [ ] Prueba en mobile y desktop (360px, 768px, 1024px, 1280px)

---

**¡Listo para DonWeb!**

Si necesitas migrar a Node SSR en el futuro, deberás usar un VPS (DonWeb compartido no soporta Node.js en producción).
