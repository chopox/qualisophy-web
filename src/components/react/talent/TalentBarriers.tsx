import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

export const TalentBarriers = () => {
  return (
    <AnimatedSection className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            Barreras Persistentes
          </h2>
          <p className="text-lg text-slate-600">
            Identificamos y derribamos los obstáculos que impiden el acceso al
            empleo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-4xl">block</span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">
              Acceso Limitado
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dificultades para conseguir el primer empleo debido a prejuicios y
              desconocimiento empresarial sobre las capacidades del colectivo.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-4xl">
                engineering
              </span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">
              Mantenimiento
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Problemas para conservar el trabajo por falta de adaptaciones y
              apoyos específicos (sensoriales y organizativos) en el entorno
              laboral.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-4xl">
                trending_flat
              </span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">Promoción</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Escasas oportunidades de crecimiento y desarrollo de carrera,
              limitando su potencial de contribución a largo plazo.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
