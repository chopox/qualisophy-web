import React from "react";

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
  const isBlue = variant === "blue";

  return (
    <section
      className={`
        px-6 py-20 lg:px-12 lg:py-32 flex justify-center w-full transition-colors duration-300
        ${isBlue ? "bg-secondary" : "bg-white"}
      `}
    >
      <div
        className={`
          max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center
          ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
        `}
      >
        {/* --- LADO IMAGEN (40-45% del ancho) --- */}
        <div className="w-full lg:w-5/12 relative">
          <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 group">
            {/* Decoración detrás (sutil) */}
            <div
              className={`absolute -inset-4 rounded-3xl transform transition-transform duration-500 -z-10
                ${reverse ? "rotate-3 translate-x-2" : "-rotate-3 -translate-x-2"}
                ${isBlue ? "bg-white/10" : "bg-primary/10"}
              `}
            ></div>

            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay sutil para unificar tono */}
            <div
              className={`absolute inset-0 mix-blend-multiply ${isBlue ? "bg-secondary/20" : "bg-primary/5"}`}
            ></div>
          </div>
        </div>

        {/* --- LADO CONTENIDO (55-60% del ancho) --- */}
        <div className="w-full lg:w-7/12 flex flex-col gap-8 lg:pl-4">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Etiqueta */}
            <div
              className={`
              inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0
              ${isBlue ? "bg-white/10 text-white" : "bg-primary/10 text-primary"}
            `}
            >
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              <span>{reverse ? "Fase 2" : "Fase 1"}</span>
            </div>

            {/* Título */}
            <h2
              className={`
                text-3xl lg:text-5xl font-bold leading-tight font-heading
                ${isBlue ? "text-white" : "text-secondary"}
              `}
            >
              {title}
            </h2>

            {/* Descripción */}
            <div className="space-y-4">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className={`
                    text-lg leading-relaxed font-primary font-light
                    ${isBlue ? "text-gray-300" : "text-gray-600"}
                  `}
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
                className={`
                  flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1
                  ${
                    isBlue
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"
                      : "bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg hover:border-primary/20"
                  }
                `}
              >
                <span
                  className={`material-symbols-outlined text-2xl mt-0.5 ${isBlue ? "text-primary" : "text-primary"}`}
                >
                  check_circle
                </span>
                <span
                  className={`
                    text-base lg:text-lg font-medium font-primary
                    ${isBlue ? "text-gray-100" : "text-secondary"}
                  `}
                >
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
