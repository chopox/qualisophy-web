import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { Button } from "@/components/react/shared/Button.tsx";
import LogoBlue from "@/assets/webp/logo-blue.webp";
import { useTranslations } from "@/hooks/useTranslations";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    title: "1. Cualificación Técnica",
    description:
      "Formación especializada en herramientas digitales y metodologías ágiles, diseñada para cubrir la demanda real de las empresas tecnológicas.",
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    title: "2. Competencias Transversales",
    description:
      "Entrenamiento intensivo en soft skills: comunicación, trabajo en equipo y adaptación al cambio, claves para una integración social y laboral exitosa.",
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "3. Prácticas en Empresa",
    description:
      "Inmersión en entornos reales con el acompañamiento de preparadores laborales que facilitan la adaptación tanto del trabajador como del equipo receptor.",
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export const TalentCta: React.FC = () => {
  const t = useTranslations();
  return (
    <AnimatedSection className="container mx-auto px-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-DEFAULT mb-6">
          Formación Dual: El Puente Hacia el Empleo
        </h2>
        <p className="text-lg text-neutral-600 leading-relaxed">
          En Qualisophy creemos que la inclusión real se logra con preparación
          real. Nuestros itinerarios combinan estos{" "}
          <strong className="text-secondary-DEFAULT">
            tres pilares fundamentales
          </strong>{" "}
          para asegurar una inserción sostenible:
        </p>
      </div>

      {/* The 3 Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20 relative ">
        {/* Visual connecting line (desktop only) */}
        <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className={`
    relative bg-white p-8 pt-12 
    rounded-xl shadow-md hover:shadow-2xl 
    border border-gray-200 
    transition-shadow duration-300
    flex flex-col h-full min-h-[320px]
    ${index === 1 ? "max-w-sm mx-auto" : ""}
    hover:border-l-4 hover:border-l-primary/50
  `}
          >
            {/* Floating Icon */}
            <div
              className="
      absolute -top-8 left-1/2 -translate-x-1/2 
      w-16 h-16 
      bg-primary/80
      rounded-full 
      flex items-center justify-center 
      shadow-lg border-4 border-white
    "
            >
              {step.icon}
            </div>

            <div className="mt-4 text-center flex-grow">
              <h3 className="text-xl font-bold text-secondary-DEFAULT mb-4">
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote & CTA Container */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"></div>

        <div className="relative p-6 md:p-8 text-center">
          <blockquote className="max-w-2xl mx-auto mb-8">
            <img
              src={LogoBlue.src}
              alt="Logo Qualisophy Blue"
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-4 object-contain drop-shadow-md"
            />

            <p className="text-lg md:text-xl italic text-secondary-DEFAULT font-semibold leading-relaxed">
              “La inclusión laboral de personas con autismo no es solo una
              obligación legal, es una{" "}
              <span className="text-primary font-extrabold relative inline-block">
                oportunidad de crecimiento
                <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/10"></span>
              </span>{" "}
              para nuestras organizaciones y nuestra sociedad.”
            </p>

            <footer className="mt-3 text-neutral-600 font-medium">
              — Programa de Inclusión Laboral, Qualisophy
            </footer>
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/contact" className="inline-block">
              <Button
                variant="primary"
                size="md"
                className="shadow-xl shadow-primary/25 hover:shadow-primary/40 min-w-[200px] hover:scale-[1.02] transition-transform"
              >
                {t('button.contact')}
              </Button>
            </a>
          </div>

          <div className="mt-3">
            <span className="text-sm text-gray-500 font-medium">
              ¿Tienes dudas? Hablemos sin compromiso.
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
