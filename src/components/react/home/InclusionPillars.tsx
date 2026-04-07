import React, { useState } from "react";

const pillarsData = [
  {
    id: "neurodivergence",
    category: "TDAH / Autismo",
    title: "Neurodivergencia",
    description:
      "Potenciamos habilidades únicas en entornos donde el enfoque y el análisis brillan.",
    icon: "psychology",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000",
    link: "/neurodivergence",
  },
  {
    id: "rural-environment",
    category: "Talento Local",
    title: "Entorno Rural",
    description:
      "Llevamos la formación tecnológica a tu tierra para fijar población y fomentar el trabajo remoto.",
    icon: "nature_people",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    link: "/rural-area",
  },
  {
    id: "migrant-talent",
    category: "Integración Global",
    title: "Talento Migrante",
    description:
      "Validación de competencias y adaptación cultural para profesionales internacionales.",
    icon: "public",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    link: "/migrant-talent",
  },
  {
    id: "social-impact",
    category: "Impacto Social",
    title: "Riesgo de Exclusión",
    description:
      "Oportunidades reales de carrera y capacitación digital para colectivos vulnerables.",
    icon: "volunteer_activism",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000",
    link: "/social-impact",
  },
  {
    id: "reskilling",
    category: "Reskilling",
    title: "Reconversión Laboral",
    description:
      "Transformación de perfiles profesionales para adaptarse a las demandas tecnológicas.",
    icon: "model_training",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    link: "/reskilling",
  },
];

export const InclusionPillars: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("neurodivergence");

  return (
    // CAMBIO APLICADO: bg-gray-50 y borde superior para la alternancia de color
    <section className="bg-gray-50 py-16 w-full border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-secondary text-3xl md:text-4xl font-bold font-heading">
            Nuestros Pilares de Inclusión
          </h2>
        </div>

        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] lg:h-[600px] w-full gap-2 md:gap-4 items-stretch" data-test="pillars">
          {pillarsData.map((pillar) => {
            const isActive = activeId === pillar.id;

            return (
              <div
                data-test={`pillar-${pillar.id}`}
                key={pillar.id}
                onClick={() => setActiveId(pillar.id)}
                className={`
                  relative overflow-hidden rounded-3xl cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  bg-cover bg-center group
                  ${isActive ? "flex-[5] md:flex-[4]" : "flex-[1]"}
                `}
                style={{ backgroundImage: `url(${pillar.image})` }}
              >
                {/* Overlay Oscuro */}
                <div
                  className={`
                  absolute inset-0 transition-colors duration-500
                  ${isActive ? "bg-black/40" : "bg-black/60 group-hover:bg-black/50"}
                `}
                ></div>

                {/* ==================================================
                   CONTENIDO EXPANDIDO (Visible si isActive)
                   ================================================== */}
                <div
                  className={`
                  absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end
                  transition-all ease-in-out
                  ${
                    isActive
                      ? "duration-700 delay-200 opacity-100 translate-y-0"
                      : "duration-200 delay-0 opacity-0 translate-y-4 pointer-events-none"
                  }
                `}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">
                        {pillar.icon}
                      </span>
                    </div>

                    <span className="text-white/90 uppercase tracking-widest text-xs font-bold font-primary">
                      {pillar.category}
                    </span>
                  </div>

                  {/* APLICAMOS EL FIX AQUÍ: Tamaño adaptable y forzado de salto de palabra */}
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-3 leading-tight break-words hyphens-auto pr-2">
                    {pillar.title}
                  </h3>

                  {/* Descripción adaptable */}
                  <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 max-w-lg font-primary leading-relaxed hidden md:block">
                    {pillar.description}
                  </p>

                  <div>
                    <a
                      href={pillar.link}
                      className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg"
                    >
                      Saber más
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>

                {/* ==================================================
                   CONTENIDO CONTRAÍDO (Visible si !isActive)
                   ================================================== */}
                <div
                  className={`
                  absolute inset-0 
                  transition-all duration-500
                  ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
                >
                  {/* --- MÓVIL: CENTRADO TOTAL --- */}
                  <div className="md:hidden flex h-full items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-white text-2xl">
                      {pillar.icon}
                    </span>
                    <h3 className="text-white font-bold text-lg uppercase tracking-widest">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* --- DESKTOP: SOLO TÍTULO GRANDE VERTICAL --- */}
                  <div className="hidden md:flex flex-col items-center justify-center h-full w-full">
                    {/* APLICAMOS FIX AQUÍ: Evitar desbordamiento vertical en zoom bajando a text-2xl en md */}
                    <h3 className="text-white font-bold text-2xl lg:text-[2rem] uppercase tracking-widest whitespace-nowrap -rotate-90 origin-center transition-all duration-300">
                      {pillar.title}
                    </h3>
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
