import React from "react";
// Importamos el componente compartido
import { ParticleMeshBackground } from "../shared/ParticleMeshBackground";

export interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: string;
  colorClass: string;
}

interface TalentRealityProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: StatItem[];
}

export const TalentReality: React.FC<TalentRealityProps> = ({
  title = "Una Realidad que Debemos Cambiar",
  subtitle = "Contexto Actual",
  description,
  stats = [],
}) => {
  return (
    <section className="py-20 relative border-b border-gray-100 overflow-hidden bg-white">
      {/* FONDO MESH ANIMADO */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ParticleMeshBackground />
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 pointer-events-auto">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            {subtitle}
          </span>
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-slate-600 font-primary leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Grid de Datos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 pointer-events-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              // CAMBIOS APLICADOS:
              // 1. bg-white/90: Más opacidad para tapar el mesh detrás del texto.
              // 2. border-slate-200: Un borde gris suave pero visible para delimitar la tarjeta.
              // 3. shadow-lg: Sombra más fuerte para elevar la tarjeta del fondo.
              // 4. hover:border-primary/30: Un toque de color en el borde al pasar el mouse.
              className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 text-center transition-all duration-300 group shadow-lg hover:shadow-xl hover:border-primary/30"
            >
              <div
                className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-100 ${stat.colorClass}`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {stat.icon}
                </span>
              </div>
              <h3 className="text-5xl font-bold text-secondary mb-2 font-heading">
                {stat.value}
              </h3>
              <p className="text-primary font-bold mb-3 uppercase text-xs tracking-widest">
                {stat.label}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed px-4">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
