// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Домен — временный. Поменять, когда клиника выберет адрес.
export default defineConfig({
  site: 'https://smilehouse-valencia.vercel.app',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  i18n: {
    locales: ['es', 'ru'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', ru: 'ru-RU' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
