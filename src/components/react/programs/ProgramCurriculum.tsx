import React, { useState, useRef } from "react";
// Importamos el fondo Mesh reutilizable
import { ParticleMeshBackground } from "@/components/react/shared/ParticleMeshBackground";

interface StudyStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface ProgramCurriculumProps {
  title: string;
  subtitle: string;
  steps: StudyStep[];
  variant?: "white" | "blue";
}

export const ProgramCurriculum: React.FC<ProgramCurriculumProps> = ({
  title,
  subtitle,
  steps,
  variant = "white",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // En el nuevo sistema de diseño, "blue" se interpreta como la variante GRIS CLARO
  const isGrayVariant = variant === "blue";

  const handleDotClick = (index: number) => {
    setOpenIndex(index);
    setTimeout(() => {
      const element = accordionRefs.current[index];
      if (element) {
        const rect = element.getBoundingClientRect();
        const headerOffset = 120;
        const bottomOffset = 100;
        const viewportHeight = window.innerHeight;
        const isComfortablyVisible =
          rect.top >= headerOffset && rect.top <= viewportHeight - bottomOffset;

        if (!isComfortablyVisible) {
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - headerOffset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    }, 150);
  };

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`
        px-6 py-16 lg:px-12 lg:py-24 flex justify-center w-full transition-colors relative overflow-hidden
        ${isGrayVariant ? "bg-gray-50" : "bg-white"}
      `}
    >
      {/* FONDO MESH: Solo si el fondo es blanco */}
      {!isGrayVariant && (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <ParticleMeshBackground />
        </div>
      )}

      <div className="max-w-7xl w-full flex flex-col gap-16 relative z-10">
        {/* CABECERA (Siempre texto oscuro) */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading text-secondary">
            {title}
          </h2>
          <p className="text-lg lg:text-xl font-normal font-primary text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* --- LÍNEA TEMPORAL (Desktop) --- */}
        <div className="hidden md:block w-full px-4 lg:px-12 mb-8">
          <div className="relative flex justify-between items-start w-full">
            {/* LÍNEA CONECTORA (Gris suave siempre) */}
            <div className="absolute top-8 left-24 right-24 h-[3px] -translate-y-1/2 z-0 bg-gray-200"></div>

            {/* Nodos */}
            {steps.map((step, index) => {
              const isActive = openIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative z-10 flex flex-col items-center gap-4 w-48 focus:outline-none"
                >
                  <div
                    className={`
                      size-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 border-4 cursor-pointer shadow-md relative z-20
                      ${
                        isActive
                          ? "bg-primary border-primary text-white scale-110 shadow-xl"
                          : isGrayVariant
                            ? "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary" // Nodo blanco sobre fondo gris
                            : "bg-white/80 backdrop-blur-sm border-gray-200 text-gray-500 hover:border-primary hover:text-primary" // Nodo semi-transparente sobre fondo blanco (Mesh)
                      }
                    `}
                  >
                    {step.stepNumber}
                  </div>

                  <span
                    className={`
                      text-center text-sm font-medium transition-colors duration-300 px-2 max-w-[200px]
                      ${
                        isActive
                          ? "text-primary font-bold"
                          : "text-gray-500 group-hover:text-secondary"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- ACORDEÓN --- */}
        <div className="flex flex-col gap-6 w-full">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  accordionRefs.current[index] = el;
                }}
                className={`
                  group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 border
                  ${
                    isOpen
                      ? "border-primary shadow-md ring-1 ring-primary/20 bg-white" // Abierto siempre blanco
                      : isGrayVariant
                        ? "bg-white border-gray-200 hover:border-gray-300" // Cerrado sobre fondo gris: Blanco
                        : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-gray-300" // Cerrado sobre fondo blanco (Mesh): Semi-transparente
                  }
                `}
              >
                <button
                  onClick={() => toggleStep(index)}
                  className="flex items-center justify-between gap-6 p-6 lg:p-8 w-full text-left transition-colors cursor-pointer bg-transparent"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`
                        flex shrink-0 items-center justify-center size-10 rounded-full text-base font-bold transition-colors border
                        ${
                          isOpen
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-primary/30"
                        }
                      `}
                    >
                      {step.stepNumber}
                    </span>

                    <p
                      className={`
                        text-lg md:text-xl font-bold leading-normal font-heading
                        ${isOpen ? "text-primary" : "text-secondary"}
                      `}
                    >
                      {step.title}
                    </p>
                  </div>

                  <span
                    className={`
                      material-symbols-outlined text-2xl transition-transform duration-300 shrink-0
                      ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}
                    `}
                  >
                    expand_more
                  </span>
                </button>

                <div
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 lg:px-8 pb-8 pt-0 pl-[5.5rem] lg:pl-[6.5rem]">
                      <p className="text-lg font-normal leading-relaxed font-primary text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
