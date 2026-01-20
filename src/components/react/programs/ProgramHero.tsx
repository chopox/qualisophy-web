import React from "react";

interface ProgramHeroProps {
  title: string;
  highlight?: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

export const ProgramHero: React.FC<ProgramHeroProps> = ({
  title,
  highlight,
  subtitle,
  ctaText = "Ver detalles del programa",
  onCtaClick,
  backgroundImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop",
}) => {
  return (
    <section className="relative w-full overflow-hidden min-h-[600px] flex items-center">
      {/* 1. Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* 2. Overlay Azul - Más fuerte y con degradado para mejor lectura */}
      <div className="absolute inset-0 z-0 bg-secondary/90 mix-blend-multiply opacity-95" />
      {/* Opción alternativa: bg-gradient-to-r from-secondary to-secondary/80 */}

      {/* 3. Contenido */}
      <div className="relative z-10 layout-container flex flex-col items-center justify-center w-full px-6 lg:px-8 py-20 mx-auto max-w-7xl">
        <div className="max-w-5xl text-center flex flex-col gap-6">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-heading drop-shadow-lg">
            {title}{" "}
            {highlight && (
              <span className="text-primary block md:inline mt-2 md:mt-0">
                {highlight}
              </span>
            )}
          </h1>

          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto font-primary drop-shadow-md">
            {subtitle}
          </p>

          <div className="flex justify-center mt-8">
            <button
              onClick={onCtaClick}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-lg shadow-xl transition-all transform text-lg border border-transparent font-primary"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
