import React from "react";

export interface BarrierItem {
  icon: string;
  title: string;
  description: string;
}

interface TalentBarriersProps {
  barriers: BarrierItem[];
}

export const TalentBarriers: React.FC<TalentBarriersProps> = ({ barriers }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            Barreras Persistentes
          </h2>
          <p className="text-lg text-slate-600">
            Identificamos y derribamos los obstáculos estructurales que impiden
            el acceso al empleo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {barriers.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
