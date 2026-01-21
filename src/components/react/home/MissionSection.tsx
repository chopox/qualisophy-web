import React from "react";

interface MissionSectionProps {
  imageSrc?: string;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
}) => {
  return (
    <section className="bg-white py-12 md:py-20 w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[96%] px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            {/* Contenido de Texto */}
            <div className="w-full md:flex-1 flex flex-col gap-6 order-1">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-primary">
                <span className="w-8 h-[2px] bg-primary"></span>
                Nuestra Misión
              </div>

              <h2 className="text-secondary text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading">
                ¿Quiénes somos?
              </h2>

              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-primary">
                Somos el puente entre la teoría y la práctica en la diversidad
                tecnológica. Nuestra misión es transformar el panorama laboral
                integrando talento neurodivergente, migrante y en riesgo de
                exclusión. Creemos que la tecnología es el lenguaje universal
                que permite superar barreras y potenciar el talento oculto.
              </p>

              <div className="flex flex-wrap gap-4 mt-2 font-primary">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-secondary font-medium">
                    Formación Inclusiva
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-secondary font-medium">
                    Mentoría Experta
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido de Imagen */}
            <div className="w-full md:flex-1 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl relative bg-gray-100 group order-2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${imageSrc}')` }}
                role="img"
                aria-label="Equipo diverso trabajando"
              ></div>
              <div className="absolute inset-0 bg-secondary/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
