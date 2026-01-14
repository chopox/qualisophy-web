import React from "react";

export const HeroSection: React.FC = () => {
  // Imagen de fondo (placeholder de alta calidad)
  const bgImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] flex items-center">
      {/* 1. Capa de Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Equipo colaborando en tecnología"
          className="w-full h-full object-cover"
          loading="eager" // Prioridad de carga para Lighthouse (LCP)
        />
      </div>

      {/* 2. Capa de Overlay Azul (El tinte corporativo) */}
      {/* Usamos mix-blend-multiply para que el azul se fusione con la foto oscureciéndola */}
      <div className="absolute inset-0 z-0 bg-secondary/90 mix-blend-multiply" />

      {/* 3. Contenido (Texto y Botones) */}
      <div className="relative z-10 layout-container flex flex-col items-center justify-center w-full px-6 lg:px-8 py-20 mx-auto max-w-7xl">
        <div className="max-w-4xl text-center flex flex-col gap-6">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-heading drop-shadow-md">
            Tecnología que <span className="text-primary">Une</span>,<br />
            Talento que <span className="text-primary">Transforma</span>
          </h1>

          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto font-primary drop-shadow-sm">
            Impulsamos la inclusión laboral en tecnología conectando talento
            diverso con empresas innovadoras, construyendo puentes hacia el
            futuro.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4 font-primary">
            <a
              href="#programas"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 text-base border border-transparent"
            >
              Ver Programas
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-bold py-3 px-8 rounded-lg transition-all text-base backdrop-blur-sm"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
