import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Salida estática + adaptador de Vercel: despliegue en un solo comando.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
