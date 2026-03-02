import React from "react";

// Datos unificados con slugs correctos
const posts = [
  {
    slug: "impacto-ia-testing",
    category: "Tendencias",
    title: "El impacto de la IA en el testing de software moderno",
    excerpt:
      "Descubre cómo la inteligencia artificial está redefiniendo los roles de QA y qué habilidades son necesarias hoy.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
    date: "12 Feb, 2026",
  },
  {
    slug: "neurodivergencia-ventaja",
    category: "Inclusión",
    title: "Neurodivergencia: La ventaja competitiva oculta",
    excerpt:
      "Las empresas que apuestan por la neurodiversidad reportan un aumento del 30% en productividad e innovación.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    date: "2 Ene, 2026",
  },
  {
    slug: "caso-exito-maria",
    category: "Casos de Éxito",
    title: "De la hostelería a Desarrollador Full Stack en 6 meses",
    excerpt:
      "La historia de María y cómo el reskilling transformó su vida profesional gracias a la metodología Qualisophy.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
    date: "23 Dic, 2025",
  },
];

export const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-4">
            Nuestro Blog
          </h2>
          <p className="text-gray-600 font-primary max-w-2xl mx-auto">
            Conoce las últimas tendencias en tecnología, inclusión y crecimiento
            profesional.
          </p>
        </div>

        {/* Grid de 3 Post Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100"
            >
              {/* Enlace en la imagen */}
              <a
                href={`/blog/${post.slug}`}
                className="h-48 overflow-hidden relative block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </div>
              </a>

              <div className="p-6 flex flex-col flex-1">
                <span className="text-gray-400 text-xs mb-3 block">
                  {post.date}
                </span>

                {/* Enlace en el título */}
                <a
                  href={`/blog/${post.slug}`}
                  className="block group-hover:text-primary transition-colors"
                >
                  <h3 className="text-xl font-bold text-secondary mb-3 leading-tight">
                    {post.title}
                  </h3>
                </a>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* Enlace en el botón */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary font-bold text-sm hover:underline mt-auto"
                >
                  Leer artículo
                  <span className="material-symbols-outlined text-sm ml-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Botón Ver Todos */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-secondary hover:text-primary hover:border-primary font-bold py-3 px-8 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Ver todos los artículos
            <span className="material-symbols-outlined text-sm">grid_view</span>
          </a>
        </div>
      </div>
    </section>
  );
};
