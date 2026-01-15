import React from "react";

interface MethodologyProps {
  title: string;
  description: string[];
  checks: string[];
  imageSrc: string;
  reverse?: boolean; // Nueva propiedad opcional
}

export const ProgramMethodology: React.FC<MethodologyProps> = ({
  title,
  description,
  checks,
  imageSrc,
  reverse = false, // Por defecto: imagen a la izquierda
}) => {
  return (
    <section className="px-6 py-16 lg:px-12 lg:py-24 flex justify-center bg-white w-full">
      <div
        className={`
          max-w-7xl w-full flex flex-col gap-16 lg:gap-24 items-center
          ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
        `}
      >
        {/* Lado Imagen */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 relative group">
            {/* Decoración rotada detrás */}
            <div
              className={`absolute -inset-4 bg-primary/10 rounded-2xl transform ${
                reverse ? "rotate-2" : "-rotate-2"
              } -z-10 transition-transform duration-500`}
            ></div>

            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Lado Contenido */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-5 text-center lg:text-left">
            {/* Etiqueta de paso (opcional, decorativa) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit mx-auto lg:mx-0">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {reverse ? "Fase 2" : "Fase 1"}
              </span>
            </div>

            <h2 className="text-secondary text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading">
              {title}
            </h2>

            {description.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 text-lg lg:text-xl font-normal leading-relaxed font-primary"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {checks.map((check, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-2xl shrink-0">
                  check_circle
                </span>
                <span className="text-secondary text-lg font-medium font-primary">
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
