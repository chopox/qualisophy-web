import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

export const TalentReality = () => {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Una Realidad Preocupante
          </span>
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            El Talento Oculto
          </h2>
          <p className="text-lg text-slate-600 font-primary">
            El autismo presenta la tasa más alta de desempleo entre todos los
            colectivos de discapacidad, a pesar de contar con las
            cualificaciones técnicas necesarias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Dato 1 */}
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">
                trending_down
              </span>
            </div>
            <h3 className="text-6xl font-bold text-secondary mb-2 font-heading">
              85%
            </h3>
            <p className="text-primary font-bold mb-3 uppercase text-xs tracking-widest">
              Tasa de Desempleo
            </p>
            <p className="text-sm text-slate-600 px-4">
              Personas adultas con autismo sin actividad laboral productiva.
            </p>
          </div>

          {/* Dato 2 */}
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">
                person_off
              </span>
            </div>
            <h3 className="text-6xl font-bold text-secondary mb-2 font-heading">
              34%
            </h3>
            <p className="text-primary font-bold mb-3 uppercase text-xs tracking-widest">
              Tasa de Actividad
            </p>
            <p className="text-sm text-slate-600 px-4">
              Frente al 77,7% de personas sin discapacidad.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
