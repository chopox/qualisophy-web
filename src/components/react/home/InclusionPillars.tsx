import React from "react";

interface Pillar {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string; // Material Symbol name
  reverse: boolean;
  image: string; // Background image
  link: string; // NUEVO: URL de destino para la página
}

const pillarsData: Pillar[] = [
  {
    id: "neurodivergence",
    category: "TDAH / Autismo",
    title: "Neurodivergencia",
    description:
      "Programas adaptados para potenciar las habilidades únicas de mentes neurodivergentes en el sector tecnológico, creando entornos donde su capacidad de enfoque y análisis brille.",
    icon: "psychology",
    reverse: false,
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000",
    link: "/neurodivergence", // Enlace a la página que acabamos de crear
  },
  {
    id: "migrant-talent",
    category: "Integración Global",
    title: "Talento Migrante",
    description:
      "Validación de competencias y programas de adaptación cultural para profesionales tecnológicos de todo el mundo que buscan aportar su experiencia internacional.",
    icon: "public",
    reverse: true,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
    link: "/migrant-talent", // Enlace futuro
  },
  {
    id: "social-impact",
    category: "Impacto Social",
    title: "Riesgo de Exclusión",
    description:
      "Oportunidades reales de carrera para colectivos vulnerables a través de la capacitación digital intensiva y acompañamiento personalizado hacia el empleo.",
    icon: "volunteer_activism",
    reverse: false,
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000",
    link: "/social-impact", // Enlace futuro
  },
  {
    id: "reskilling",
    category: "Reskilling",
    title: "Reciclaje Laboral",
    description:
      "Actualización profunda de perfiles profesionales para adaptarse a las demandas del mercado tecnológico actual, transformando experiencia previa en nuevas capacidades.",
    icon: "model_training",
    reverse: true,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    link: "/reskilling", // Enlace futuro
  },
];

export const InclusionPillars: React.FC = () => {
  return (
    <section className=" py-12 md:py-20 w-full">
      <div className="flex justify-center w-full">
        <div className="w-full md:max-w-[96%] px-0 md:px-8 lg:px-12">
          <div className="text-center mb-12 md:mb-24 px-4">
            <h2 className="text-secondary text-3xl md:text-5xl font-bold mb-6 font-heading">
              Nuestros Pilares de Inclusión
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl font-primary">
              Áreas clave donde generamos impacto y abrimos nuevas oportunidades
              profesionales.
            </p>
          </div>

          <div className="flex flex-col gap-0 md:gap-12 lg:gap-16">
            {pillarsData.map((pillar) => (
              <div
                key={pillar.id}
                className={`group flex flex-col ${
                  pillar.reverse ? "md:flex-row-reverse" : "md:flex-row"
                } bg-white 
                rounded-none md:rounded-3xl 
                shadow-none md:shadow-lg 
                border-b border-gray-200 md:border md:border-gray-100 
                overflow-hidden transition-all duration-300 min-h-[500px]`}
              >
                <div className="w-full md:w-5/12 lg:w-4/12 bg-secondary relative flex items-center justify-center p-16 lg:p-20 overflow-hidden min-h-[300px] md:min-h-full">
                  {/* Visual: Foto Real + Filtro Azul */}
                  <img
                    src={pillar.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply"></div>

                  <div className="relative z-10 size-32 lg:size-40 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[56px] lg:text-[72px]">
                      {pillar.icon}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-7/12 lg:w-8/12 p-10 md:p-16 lg:p-24 flex flex-col justify-center items-start">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-[3px] bg-primary"></span>
                    <span className="text-primary font-bold text-base lg:text-lg uppercase tracking-wider font-primary">
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="text-secondary text-2xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
                    {pillar.title}
                  </h3>

                  <p className="text-gray-600 text-lg lg:text-2xl leading-relaxed mb-10 max-w-4xl font-primary">
                    {pillar.description}
                  </p>

                  {/* CAMBIO: <button> reemplazado por <a> con href */}
                  <a
                    href={pillar.link}
                    className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center gap-3 text-lg group-hover:shadow-lg font-primary"
                  >
                    Saber más
                    <span className="material-symbols-outlined lg:text-2xl">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
