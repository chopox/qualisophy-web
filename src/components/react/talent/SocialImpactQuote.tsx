import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

export interface SocialPillar {
  icon: string;
  title: string;
  description: string;
}

interface SocialImpactQuoteProps {
  title?: string;
  subtitle?: string;
  pillars?: SocialPillar[];
  quoteText?: string;
  quoteHighlight?: string;
  quoteEnd?: string;
}

const defaultPillars: SocialPillar[] = [
  {
    icon: "business",
    title: "Compromiso Empresarial",
    description:
      "Cumplimiento efectivo de la legislación y creación de entornos verdaderamente inclusivos y productivos.",
  },
  {
    icon: "handshake",
    title: "Apoyo Institucional",
    description:
      "Políticas públicas que promuevan y faciliten activamente la inclusión laboral de personas con autismo.",
  },
  {
    icon: "public",
    title: "Transformación Social",
    description:
      "Una sociedad más justa, diversa y competitiva que aproveche todo el talento disponible.",
  },
];

export const SocialImpactQuote: React.FC<SocialImpactQuoteProps> = ({
  title = "Hacia una Inclusión Laboral Real",
  subtitle = "Construimos un futuro donde el talento no tiene etiquetas.",
  pillars = defaultPillars,
  quoteText = "“La inclusión laboral de personas con autismo no es solo una obligación legal, es una ",
  quoteHighlight = "oportunidad de crecimiento",
  quoteEnd = " para nuestras organizaciones y nuestra sociedad.”",
}) => {
  return (
    <AnimatedSection className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* 1. TÍTULO DE LA SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-600 font-primary">{subtitle}</p>
        </div>

        {/* 2. PILARES */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                <span className="material-symbols-outlined text-2xl">
                  {pillar.icon}
                </span>
              </div>
              <h4 className="font-bold text-secondary text-xl mb-3 font-heading">
                {pillar.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-primary">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3. CITA ESTILIZADA */}
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 md:pl-12 border-l-4 border-primary">
            <blockquote className="text-xl md:text-2xl font-primary italic text-slate-700 leading-relaxed">
              {quoteText}
              <span className="text-primary font-bold not-italic">
                {quoteHighlight}
              </span>{" "}
              {quoteEnd}
            </blockquote>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
