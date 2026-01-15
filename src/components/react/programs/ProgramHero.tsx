import React from "react";

interface ProgramHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

export const ProgramHero: React.FC<ProgramHeroProps> = ({
  title,
  subtitle,
  ctaText = "Ver detalles del programa",
  onCtaClick,
  backgroundImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop",
}) => {
  return (
    <section className="relative w-full overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 z-0 bg-secondary/90 mix-blend-multiply" />

      <div className="relative z-10 layout-container flex flex-col items-center justify-center w-full px-6 lg:px-8 py-20 mx-auto max-w-7xl">
        <div className="max-w-5xl text-center flex flex-col gap-6">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-heading drop-shadow-md">
            {title}
          </h1>

          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto font-primary drop-shadow-sm">
            {subtitle}
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={onCtaClick}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all transform text-base border border-transparent font-primary"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
