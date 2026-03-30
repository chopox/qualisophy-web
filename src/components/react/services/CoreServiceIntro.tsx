import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Cursos Prácticos",
    description:
      "Aprende tecnología sin barreras, con cursos claros y prácticos hechos para ti.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1080&q=80",
    url: "/cursos",
  },
  {
    title: "Formación Empresas",
    description:
      "Formación a medida, clara y estructurada para que tu equipo avance con confianza.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1080&q=80",
    url: "/corporate-training",
  },
  {
    title: "Partnership & Talento",
    description:
      "Conecta con talento formado paso a paso y listo para aportar valor desde el primer día.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1080&q=80",
    url: "/partnership",
  },
];

export const CoreServiceIntro: React.FC = () => {
  return (
    <AnimatedSection className="container mx-auto px-6">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl font-bold text-secondary-DEFAULT">
          Impulsamos tu talento tecnológico
        </h2>
        <p className="text-lg text-neutral-700 mt-4 leading-relaxed">
          En Qualisophy cerramos la brecha entre la teoría y la práctica con una
          formación clara, estructurada y accesible para cualquier nivel. Te
          guiamos en QA, Testing y DevOps a través de un aprendizaje metódico y
          humano, diseñado para que avances con confianza y sin barreras.
          Acompañamos a profesionales y empresas: tú desarrollas tu potencial,
          nosotros te apoyamos para que tu futuro tecnológico sea real, práctico
          y transformador.{" "}
        </p>
        <div className="mt-6 pt-4 border-t border-primary-DEFAULT/30">
          <p className="font-heading text-primary-DEFAULT text-l font-semibold italic">
            “Tecnología que te transforma. Futuro que construimos.”
          </p>
        </div>
      </div>

      {/* Services (The 3 Cards) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <a
            key={service.title}
            href={service.url}
            className="
              group 
              relative rounded-xl overflow-hidden
              shadow-card transition-all duration-300 hover:shadow-card-hover
              h-80 // Altura fija para la tarjeta
            "
          >
            {/* 1. Background image with zoom efect */}
            <img
              src={service.imageUrl}
              alt={service.title}
              className="
                absolute inset-0 w-full h-full object-cover
                transition-transform duration-300 ease-in-out
                group-hover:scale-110
              "
            />

            {/* 2. Dark overlay for readability */}
            <div
              className="
                absolute inset-0 
                bg-gradient-to-t from-black/80 via-black/50 to-transparent
              "
            ></div>

            {/* 3. Overlaid text content */}
            <div
              className="
                relative z-10 
                flex flex-col justify-end 
                h-full p-6 text-white
              "
            >
              <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="font-body text-base text-neutral-200">
                {service.description}
              </p>
              {/* 🆕 Optional: Visual indicator that it's clickable */}
              <span className="inline-flex items-center text-sm mt-2 text-white/80 group-hover:text-white transition-colors">
                Ver más →
              </span>
            </div>
          </a>
        ))}
      </div>
    </AnimatedSection>
  );
};
