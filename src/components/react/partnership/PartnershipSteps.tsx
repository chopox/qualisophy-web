import React from "react";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

// Import icons from Lucide
import { Users, Search, MessageSquare, CheckCircle } from "lucide-react";

// Steps data
const steps = [
  {
    icon: Users,
    title: "1. Hablemos de tu necesidad",
    description:
      "Agendamos una breve reunión para entender el perfil técnico y cultural que tu equipo necesita.",
  },
  {
    icon: Search,
    title: "2. Selección de Perfiles",
    description:
      "Filtramos nuestra bolsa de talento y seleccionamos solo a los candidatos que mejor se ajustan a tu solicitud.",
  },
  {
    icon: MessageSquare,
    title: "3. Conecta y Entrevista",
    description:
      "Te presentamos los perfiles finalistas. Coordinamos las entrevistas para que conozcas al talento.",
  },
  {
    icon: CheckCircle,
    title: "4. Contratación Exitosa",
    description:
      "Incorpora al candidato ideal a tu equipo, con la confianza de que ha sido validado por nuestros expertos.",
  },
];

// Variants for the staggered animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const PartnershipSteps = () => {
  return (
    // We use AnimatedSection for the fade-in-up animation of the entire section
    <AnimatedSection className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-secondary text-center font-heading mb-16">
        Un Proceso Sencillo y Eficaz
      </h2>

      {/* We use motion.div to animate the steps in a cascade/staggered sequence */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step) => {
          const Icon = step.icon; 
          return (
            <motion.div
              key={step.title}
              className="flex items-start gap-5"
              variants={itemVariants}
            >
              {/* Icon container */}
              <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              {/* Text content */}
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
};
