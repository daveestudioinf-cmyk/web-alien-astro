# Dos propuestas visuales de Alien Creativo

Ambas propuestas comparten el contenido del cliente, la composición de las secciones, los botones con degradado, las órbitas, la metodología y los videos integrados. Cambia la familia de ilustraciones.

| Propuesta | Rama | Vista local |
| --- | --- | --- |
| Ilustraciones metálicas | `codex/propuesta-metalica` | http://localhost:4323/ |
| Ilustraciones originales | `v2` | http://localhost:4322/ |

Las vistas son locales; no son enlaces públicos. La vista metálica sirve una copia estática guardada en `.review/proposals/metalica`. La vista de `v2` sirve el directorio `dist` mediante Astro preview.

## Ilustraciones de v2

- Hero y metodología: `public/assets/brand/alien-header.svg`. Es el SVG original [Alien astronauta](https://aliencreativo.com/wp-content/uploads/2021/07/marketing-digital-aliencreativo-alien-header.svg), conservado sin cambios. Su hash SHA-256 coincide con el archivo publicado por Alien Creativo.
- Servicios: `public/assets/brand/alien-web.svg`, ilustración original de desarrollo web conservada en el proyecto.
- Contacto: `public/assets/brand/contacto-alien.svg`, [ilustración original de contacto](https://aliencreativo.com/wp-content/uploads/2021/07/contacto-alien.svg).

Los SVG mantienen el fondo transparente, el detalle vectorial y sus colores originales. No se aplican recortes ni filtros para simular transparencia. Las ilustraciones metálicas permanecen guardadas para la otra propuesta.

## Validación

- `npm run build`: compilación en modo preview correcta.
- Comprobación del contenido: 262 elementos aprobados presentes y notas editoriales excluidas.
- Comparación del texto de `main` entre ambas vistas: idéntico.
- V2 sin desbordamiento horizontal a 320, 390, 768, 901, 1024, 1440 y 1920 px.
- Comprobación de transparencia de las cuatro imágenes renderizadas: canal alfa de las esquinas igual a 0.
- Capturas revisadas de hero, servicios, metodología y contacto en escritorio, además del hero móvil.
- La corrección del ancho mínimo del reproductor en pantallas estrechas es común a las dos propuestas.

## Volver a iniciar las vistas

Desde la raíz del proyecto, para v2:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

Para la copia local metálica, en otro proceso:

```powershell
python -m http.server 4323 --bind 127.0.0.1 --directory .review/proposals/metalica
```

La copia estática y las capturas de `.review` no están versionadas. Si faltan, se puede regenerar la vista metálica desde su rama en un checkout separado. No se debe construir esa rama sobre `dist` mientras se presenta v2, porque reemplazaría su vista local.
