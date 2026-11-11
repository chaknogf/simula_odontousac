/**
 * El adaptador de Vercel para Astro crea un directorio `server` vacío que
 * rompe los despliegues anónimos/CLI con el error:
 *   "Anonymous deployments must declare a `size` for every file."
 *
 * Como este proyecto es 100 % estático, ese directorio no es necesario.
 * Se elimina después del build para que `vercel deploy` funcione sin problemas.
 */
import { rm } from 'node:fs/promises';

const serverDir = new URL('../.vercel/output/server/', import.meta.url);

try {
  await rm(serverDir, { recursive: true, force: true });
} catch {
  /* Si no existe o no se puede borrar, no es un error crítico. */
}
