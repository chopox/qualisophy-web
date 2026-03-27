import React from "react";

interface AboutSectionProps {
  imageSrc?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
}) => {
  return (
    <section className="bg-white pt-16 md:pt-24 pb-8 md:pb-12 w-full">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[96%] px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            {/* Contenido de Imagen (A la Izquierda) */}
            <div className="w-full md:flex-1 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl relative bg-gray-100 group order-2 md:order-1">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${imageSrc}')` }}
                role="img"
                aria-label="Equipo diverso trabajando"
              ></div>
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>

            {/* Contenido de Texto (A la Derecha) */}
            <div className="w-full md:flex-1 flex flex-col gap-6 order-1 md:order-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-primary">
                <span className="w-8 h-[2px] bg-primary"></span>
                Identidad
              </div>

              <h2 className="text-secondary text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading">
                ¿Quiénes somos?
              </h2>

              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-primary">
                Somos el puente entre la teoría y la práctica en la diversidad
                tecnológica. Nacemos con la firme convicción de que la
                tecnología es el lenguaje universal capaz de superar cualquier
                barrera social, territorial o personal, permitiendo potenciar el
                talento oculto que el mercado tradicional suele pasar por alto.
              </p>

              {/* Botón hacia la página de equipo */}
              <div className="pt-4">
                <a
                  href="/team"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform group"
                >
                  Conoce a nuestro equipo
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
