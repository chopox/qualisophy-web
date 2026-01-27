import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

export const SocialImpactQuote = () => {
  return (
    <AnimatedSection className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* 1. TÍTULO DE LA SECCIÓN (Agregado) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            Hacia una Inclusión Laboral Real
          </h2>
          <p className="text-lg text-slate-600 font-primary">
            Construimos un futuro donde el talento no tiene etiquetas.
          </p>
        </div>

        {/* 2. PILARES (Tarjetas limpias blancas sobre fondo gris) */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Pilar 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
              <span className="material-symbols-outlined text-2xl">
                business
              </span>
            </div>
            <h4 className="font-bold text-secondary text-xl mb-3 font-heading">
              Compromiso Empresarial
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-primary">
              Cumplimiento efectivo de la legislación y creación de entornos
              verdaderamente inclusivos y productivos.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
              <span className="material-symbols-outlined text-2xl">
                handshake
              </span>
            </div>
            <h4 className="font-bold text-secondary text-xl mb-3 font-heading">
              Apoyo Institucional
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-primary">
              Políticas públicas que promuevan y faciliten activamente la
              inclusión laboral de personas con autismo.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
              <span className="material-symbols-outlined text-2xl">public</span>
            </div>
            <h4 className="font-bold text-secondary text-xl mb-3 font-heading">
              Transformación Social
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-primary">
              Una sociedad más justa, diversa y competitiva que aproveche todo
              el talento disponible.
            </p>
          </div>
        </div>

        {/* 3. CITA ESTILIZADA (Diseño solicitado) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <blockquote className="text-xl md:text-2xl font-primary italic text-slate-700 leading-relaxed">
              “La inclusión laboral de personas con autismo no es solo una
              obligación legal, es una{" "}
              <span className="text-primary font-bold not-italic">
                oportunidad de crecimiento
              </span>{" "}
              para nuestras organizaciones y nuestra sociedad.”
            </blockquote>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
