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

export const CompanyCarousel = () => {
  return (
    <AnimatedSection className="overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-heading sm:text-4xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
          Empresas que confían en nosotros
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradientes laterales */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10 flex justify-between">
          <div className="w-32 h-full bg-gradient-to-r from-white to-transparent" />
          <div className="w-32 h-full bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Track infinito */}
        <div className="flex gap-16 items-center whitespace-nowrap animate-slide-mobile md:animate-slide-desktop">
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              className="h-8 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};