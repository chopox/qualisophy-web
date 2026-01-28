import React from "react";

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
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        {/* Cabecera Dinámica */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Grid de Datos Dinámicos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform ${stat.colorClass}`}
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
