import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

const logos = [
  "https://www.svgrepo.com/show/303154/instagram-2016-logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://www.svgrepo.com/show/303108/google-icon-logo.svg",
  "https://vectorlogo.zone/logos/ibm/ibm-icon.svg",
  "https://vectorlogo.zone/logos/spotify/spotify-icon.svg",
];

// Repetimos la lista base varias veces para asegurar que llene pantallas grandes
// antes de duplicar el bloque entero para el efecto infinito.
const logoSet = [...logos, ...logos, ...logos];

export const CompanyCarousel = () => {
  return (
    <AnimatedSection className="overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-heading sm:text-4xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
          Empresas que confían en nosotros
        </h2>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Estilos inline para asegurar la animación y el filtro azul sin config externa */}
        <style>{`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
            width: max-content; /* Asegura que el contenedor mida lo que su contenido */
          }
          /* Filtro para convertir logos a escala de azules corporativos */
          .logo-blue-filter {
            filter: grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(200%) brightness(0.9);
            transition: filter 0.3s ease, opacity 0.3s ease;
            opacity: 0.7;
          }
          .logo-blue-filter:hover {
            filter: none; /* Recuperar color original al hover (opcional) */
            opacity: 1;
          }
        `}</style>

        {/* Gradientes laterales para suavizar bordes */}
        <div className="pointer-events-none absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

        {/* Contenedor Animado */}
        {/* Renderizamos DOS veces el mismo set de logos. 
            La animación mueve todo el bloque un 50% a la izquierda.
            Cuando llega al 50%, el segundo bloque está exactamente donde empezó el primero,
            creando un bucle invisible perfecto. */}
        <div className="flex animate-infinite-scroll">
          {/* Bloque 1 */}
          <div className="flex gap-16 items-center px-8">
            {logoSet.map((logo, index) => (
              <img
                key={`a-${index}`}
                src={logo}
                alt="Partner logo"
                className="h-8 md:h-12 w-auto object-contain logo-blue-filter"
              />
            ))}
          </div>

          {/* Bloque 2 (Duplicado exacto para el loop) */}
          <div className="flex gap-16 items-center px-8">
            {logoSet.map((logo, index) => (
              <img
                key={`b-${index}`}
                src={logo}
                alt="Partner logo"
                className="h-8 md:h-12 w-auto object-contain logo-blue-filter"
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
