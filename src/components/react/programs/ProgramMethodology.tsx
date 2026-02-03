import React from "react";
// Importamos el fondo Mesh reutilizable
import { ParticleMeshBackground } from "@/components/react/shared/ParticleMeshBackground";

interface MethodologyProps {
  title: string;
  description: string[];
  checks: string[];
  imageSrc: string;
  reverse?: boolean;
  variant?: "white" | "blue";
}

export const ProgramMethodology: React.FC<MethodologyProps> = ({
  title,
  description,
  checks,
  imageSrc,
  reverse = false,
  variant = "white",
}) => {
  // "isGrayVariant" true si es la variante gris (blue). False si es blanco.
  const isGrayVariant = variant === "blue";

  return (
    <section
      className={`
        px-6 py-20 lg:px-12 lg:py-32 flex justify-center w-full transition-colors duration-300 relative overflow-hidden
        ${
          isGrayVariant
            ? "bg-gray-50" // Fondo gris (Sin Mesh)
            : "bg-white" // Fondo blanco (Con Mesh)
        }
      `}
    >
      {/* FONDO MESH: Solo si el fondo es blanco */}
      {!isGrayVariant && (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <ParticleMeshBackground />
        </div>
      )}

      <div
        className={`
          max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10
          ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
        `}
      >
        {/* --- LADO IMAGEN --- */}
        <div className="w-full lg:w-5/12 relative">
          <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-gray-100 group">
            {/* Decoración detrás */}
            <div
              className={`absolute -inset-4 bg-primary/10 rounded-3xl transform transition-transform duration-500 -z-10
                ${reverse ? "rotate-3 translate-x-2" : "-rotate-3 -translate-x-2"}
              `}
            ></div>

            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay sutil siempre igual */}
            <div className="absolute inset-0 mix-blend-multiply bg-primary/5"></div>
          </div>
        </div>

        {/* --- LADO CONTENIDO --- */}
        <div className="w-full lg:w-7/12 flex flex-col gap-8 lg:pl-4">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Etiqueta */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0 bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              <span>{reverse ? "Fase 2" : "Fase 1"}</span>
            </div>

            {/* Título - Siempre oscuro */}
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight font-heading text-secondary">
              {title}
            </h2>

            {/* Descripción - Siempre gris medio */}
            <div className="space-y-4">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed font-primary font-light text-gray-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Checks */}
          <div className="grid grid-cols-1 gap-4 pt-4">
            {checks.map((check, index) => (
              <div
                key={index}
                // Si el fondo es blanco (con mesh), las tarjetas deben ser semitransparentes para integrarse.
                // Si el fondo es gris, las tarjetas son blancas sólidas.
                className={`
                  flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md
                  ${
                    isGrayVariant
                      ? "bg-white border-gray-200" // Fondo Gris -> Tarjeta Blanca sólida
                      : "bg-white/60 backdrop-blur-sm border-gray-100" // Fondo Blanco (Mesh) -> Tarjeta Semitransparente
                  }
                `}
              >
                <span className="material-symbols-outlined text-2xl mt-0.5 text-primary">
                  check_circle
                </span>
                <span className="text-base lg:text-lg font-medium font-primary text-secondary">
                  {check}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
