import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // v2.5.0+
  schema: z.object({
    title: z.string(),
    excerpt: z.string(), // Resumen corto para la tarjeta
    date: z.date(),
    image: z.string().url(), // URL de la imagen (Unsplash, etc.)
    category: z.enum([
      "Tendencias",
      "Inclusión",
      "Casos de Éxito",
      "Tecnología",
    ]), // Categorías fijas
    author: z.string().default("Equipo Qualisophy"),
    readTime: z.string().default("5 min de lectura"),
  }),
});

export const collections = {
  blog: blogCollection,
};
