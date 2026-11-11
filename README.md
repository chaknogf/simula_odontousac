# Simulador FOUSAC 2026 – Odontología USAC

Simulador interactivo de la Prueba de Admisión para la Facultad de Odontología,
construido con [Astro](https://astro.build) y listo para desplegar en
[Vercel](https://vercel.com).

## Contenido

Más de 100 preguntas de selección múltiple basadas en la guía oficial de la
Prueba de Admisión (PAIFO) y los programas de bachillerato:

| Subprueba | Preguntas | Tiempo oficial |
| --- | --- | --- |
| Biología | 20 | 25 min |
| Química | 20 | 25 min |
| Física | 20 | 30 min |
| Matemática | 20 | 20 min |
| Razonamiento Verbal | 12 | 20 min |
| Razonamiento Lógico | 12 | 20 min |
| Comprensión Espacial | 8 | 15 min |

Las secciones de Comprensión Espacial incluyen figuras SVG (reflejos,
rotaciones, plantillas y series).

## Características

- **Modos de evaluación**: examen completo, subprueba individual o práctica libre.
- **Cronómetro**: automático (tiempo oficial), personalizado o desactivado.
- **Aleatoriedad**: el orden de las preguntas y de las opciones se mezcla en cada intento.
- **Interactividad**: atajos de teclado (`1`–`4` / `A`–`D` para responder,
  `←` `→` para navegar, `Enter` para avanzar), pestañas por subprueba,
  barra de progreso y repaso completo de respuestas.
- **Resultados**: anillo de puntaje animado, desglose por subprueba y confeti
  cuando el puntaje es igual o superior al 70 %.
- **Modo oscuro** automático según el sistema.

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # desarrollo en http://localhost:4321
npm run build   # build de producción en dist/
npm run preview # previsualizar el build
```

## Despliegue en Vercel

El proyecto ya incluye el adaptador oficial (`@astrojs/vercel`) y salida
estática, por lo que no requiere configuración adicional.

### Opción 1: CLI

```bash
npx vercel          # desarrollo (vista previa)
npx vercel --prod   # producción
```

La primera vez se te pedirá iniciar sesión en Vercel.

### Opción 2: Dashboard

1. Sube este repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Vercel detecta Astro automáticamente; presiona **Deploy**.

## Estructura

```
src/
├── components/Quiz.astro   # lógica y vistas del simulador
├── data/questions.ts       # banco de preguntas y subpruebas
├── layouts/Layout.astro    # plantilla HTML base
├── pages/index.astro       # página principal
└── styles/global.css       # estilos y tokens de diseño
```
