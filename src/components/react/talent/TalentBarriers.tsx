import React from "react";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

const barreras = [
  {
    id: "acceso",
    titulo: "Acceso Limitado",
    descripcion:
      "Dificultades para conseguir el primer empleo debido a prejuicios y desconocimiento empresarial.",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "mantenimiento",
    titulo: "Mantenimiento del Puesto",
    descripcion:
      "Problemas para conservar el trabajo por falta de adaptaciones y apoyos específicos en el entorno.",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1080&q=80&h=320",
  },
  {
    id: "promocion",
    titulo: "Promoción Profesional",
    descripcion:
      "Escasas oportunidades de crecimiento y desarrollo de carrera, limitando su potencial.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
  },
];

// Animation variants for the stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const TalentBarriers = () => {
  return (
    <AnimatedSection className="container mx-auto px-6">
      <h2 className="font-heading text-4xl font-bold text-secondary-DEFAULT text-center mb-16">
        Barreras Persistentes en el Acceso al Empleo
      </h2>

      {/* Here we apply the styling of the CoreServiceIntro cards */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {barreras.map((barrera) => (
          <motion.div
            key={barrera.id}
            variants={itemVariants}
            className="
              group 
              relative rounded-xl overflow-hidden
              shadow-card transition-all duration-300 hover:shadow-card-hover
              h-80 // Altura fija para la tarjeta
            "
          >
            {/* 1. Background image with zoom effect */}
            <img
              src={barrera.imageUrl}
              alt={barrera.titulo}
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
                {barrera.titulo}
              </h3>
              <p className="font-body text-base text-neutral-200">
                {barrera.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
};
