# Propuestas visuales de Alien Creativo

Ambas propuestas comparten el contenido del cliente, la composición de las secciones, los botones con degradado, las órbitas, la metodología y los videos integrados. Cambia la familia de ilustraciones.

| Propuesta | Rama | Vista local |
| --- | --- | --- |
| Ilustraciones metálicas | `codex/propuesta-metalica` | http://localhost:4323/ |
| Ilustraciones originales | `v2` | http://localhost:4324/ |
| Metalizados con paleta lavanda y rosa | `v3` | http://localhost:4322/ |

Las vistas son locales; no son enlaces públicos. Las propuestas anteriores sirven copias estáticas guardadas en `.review/proposals/metalica` y `.review/proposals/v2`. La rama actual `v3` sirve el directorio `dist` mediante Astro preview. Las copias estáticas no se actualizan al construir v3.

## Paleta e ilustraciones de v3

Referencia: [Publicidad sin ventas](https://aliencreativo.com/wp-content/uploads/2026/10/publicidad-digital-sin-ventas-pymes-1024x585.jpg).

La versión abre en tema claro: blanco cálido `#faf9fc`, superficies lavanda `#f1eef8`, rosa pálido `#f4eaf1`, violeta `#62508f` y degradado rosa a violeta para los botones. Casos usa violeta profundo para separar el capítulo. El tema oscuro mantiene la familia ciruela y lavanda; su preferencia se guarda aparte de v2.

Los cuatro archivos WebP con canal alfa están en `public/assets/brand/v3/`: `alien-hero.webp`, `alien-mission.webp`, `alien-services.webp` y `alien-contact.webp`. Se adaptaron con la herramienta integrada de imágenes, a partir de las cuatro piezas metálicas existentes y la referencia cromática. Los originales permanecen intactos. Los SVG de marca de esa carpeta conservan la geometría y adaptan únicamente los colores.

Prompt aplicado a cada pieza (la figura se especificó como cabeza con órbita, nave, dispositivo triangular o busto con dos órbitas):

> Preserve the exact silhouette, object, perspective, sleek brushed silver metallic construction and ring geometry of Image 1. Replace cyan/blue lights with understated pastel lavender/lilac and soft blush-pink reflections from Image 2. Bright pearly silver highlights with warm ivory studio light, dark plum-black glass. Premium refined product render on a warm white website, soft daylight, no cyberpunk or neon. Entire object uncropped and centered, clean alpha edges. No text, no background, no ground shadow, no additions. Genuine transparent background. Output a single standalone cutout.

V3 conserva los textos del cliente, los videos dentro de la página, las órbitas, la flotación suave y el progreso acumulativo de metodología. La tarjeta adicional del artículo sigue retirada, según la corrección aprobada en v2.

Validación de v3: compilación correcta; 262 bloques aprobados presentes; texto de `main` idéntico a v2; cuatro ilustraciones con esquinas transparentes; sin desbordamiento a 320, 390, 768, 1024, 1440 y 1920 px; cambio de tema y progreso acumulativo comprobados. Los tokens de texto principal, secundario, auxiliar y acento alcanzan al menos 4,77:1 frente al fondo de cada tema y de las secciones con paleta propia. La flotación normal conserva el ciclo de ocho segundos.

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

Desde la raíz del proyecto, para la rama actual:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

Para la copia local metálica, en otro proceso:

```powershell
python -m http.server 4323 --bind 127.0.0.1 --directory .review/proposals/metalica
```

Para la copia de v2, usar el mismo comando con puerto `4324` y directorio `.review/proposals/v2`.

Las copias estáticas y las capturas de `.review` no están versionadas. Si faltan, se pueden regenerar desde sus ramas en checkouts separados. Construir otra rama sobre `dist` reemplaza la vista del puerto 4322.
