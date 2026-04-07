import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),

  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  vite: {
    ssr: {
      noExternal: ["@vercel/analytics", "@vercel/speed-insights"],
    },
  },
  // Añadimos la redirección 301 para salvar la campaña de Cypress
  redirects: {
    "/learning/qa/cypress-bootcamp": "/cursos/qa/bootcamp-cypress",
  },
});
