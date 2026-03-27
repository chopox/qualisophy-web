import React from "react";

interface MissionSectionProps {
  imageSrc?: string;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
}) => {
  return (
    <section className="bg-gray-50 py-12 md:py-20 w-full border-t border-gray-100">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[96%] px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            {/* Contenido de Texto (A la Izquierda) */}
            <div className="w-full md:flex-1 flex flex-col gap-6 order-1">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-primary">
                <span className="w-8 h-[2px] bg-primary"></span>
                Ojeto social
              </div>

              <h2 className="text-secondary text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading">
                Nuestra Misión
              </h2>

              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-primary">
                Nuestra misión es democratizar el acceso a la tecnología.
                Diseñamos e impartimos programas formativos adaptados para la
                integración sociolaboral de personas neurodivergentes, talento
                rural y colectivos vulnerables. A través de nuestra
                investigación (I+D+i) en Inteligencia Artificial, personalizamos
                el aprendizaje y ofrecemos Consultoría de Talento como Servicio
                (TaaS) para impulsar la competitividad corporativa.
              </p>

              {/* Checks */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 font-primary">
                <div className="flex items-center gap-3 bg-white shadow-sm px-4 py-3 rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-secondary font-medium">
                    Innovación Educativa (I+D+i)
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white shadow-sm px-4 py-3 rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-secondary font-medium">
                    Talento como Servicio (TaaS)
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido de Imagen (A la Derecha) */}
            <div className="w-full md:flex-1 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl relative bg-white group order-2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${imageSrc}')` }}
                role="img"
                aria-label="Formación inclusiva"
              ></div>
              <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
