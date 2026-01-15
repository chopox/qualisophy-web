import React, { useState, useRef } from "react";

interface StudyStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface ProgramCurriculumProps {
  title: string;
  subtitle: string;
  steps: StudyStep[];
}

export const ProgramCurriculum: React.FC<ProgramCurriculumProps> = ({
  title,
  subtitle,
  steps,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDotClick = (index: number) => {
    // 1. Abrimos el acordeón
    setOpenIndex(index);

    // 2. Lógica de Scroll Inteligente
    setTimeout(() => {
      const element = accordionRefs.current[index];
      if (element) {
        const rect = element.getBoundingClientRect();

        // Configuración de márgenes "seguros"
        const headerOffset = 120; // Altura del header sticky + un poco de aire
        const bottomOffset = 100; // Margen inferior para no quedar pegado abajo
        const viewportHeight = window.innerHeight;

        // Comprobamos si el elemento (su cabecera) está visible en la "zona segura" de la pantalla
        const isComfortablyVisible =
          rect.top >= headerOffset && rect.top <= viewportHeight - bottomOffset;

        // SOLO hacemos scroll si está fuera de la vista
        if (!isComfortablyVisible) {
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - headerOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 150);
  };

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 lg:px-12 lg:py-24 flex justify-center bg-white w-full">
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* CABECERA */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-secondary text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading">
            {title}
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl font-normal font-primary">
            {subtitle}
          </p>
        </div>

        {/* --- LÍNEA TEMPORAL (Desktop) --- */}
        <div className="hidden md:block w-full px-4 lg:px-12 mb-8">
          <div className="relative flex justify-between items-start w-full">
            {/* LÍNEA CONECTORA (z-0 para ir detrás) */}
            <div className="absolute top-8 left-24 right-24 h-[3px] bg-gray-200 -translate-y-1/2 z-0"></div>

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
                      size-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 border-4 cursor-pointer shadow-md
                      ${
                        isActive
                          ? "bg-primary border-primary text-white scale-110 shadow-xl" // ACTIVO: Color Primario
                          : "bg-secondary border-secondary text-white hover:bg-secondary/90" // INACTIVO: Color Secundario
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
                // Corregimos el tipo de ref con la función de callback
                ref={(el) => {
                  accordionRefs.current[index] = el;
                }}
                className={`
                  group flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300
                  ${
                    isOpen
                      ? "border-primary shadow-md ring-1 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <button
                  onClick={() => toggleStep(index)}
                  className={`
                    flex items-center justify-between gap-6 p-6 lg:p-8 w-full text-left transition-colors cursor-pointer
                    ${isOpen ? "bg-white" : "bg-gray-50 hover:bg-white"}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`
                        flex shrink-0 items-center justify-center size-10 rounded-full text-base font-bold transition-colors border
                        ${
                          isOpen
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-primary"
                        }
                      `}
                    >
                      {step.stepNumber}
                    </span>

                    <p
                      className={`text-lg md:text-xl font-bold leading-normal font-heading ${
                        isOpen ? "text-primary" : "text-secondary"
                      }`}
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
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 lg:px-8 pb-8 pt-0 pl-[5.5rem] lg:pl-[6.5rem]">
                      <p className="text-gray-600 text-lg font-normal leading-relaxed font-primary">
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
