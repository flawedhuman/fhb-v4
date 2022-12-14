import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'http://www.flawedhumanbeing.com',
  base: '/fhb-v4',
  integrations: [tailwind()],
});