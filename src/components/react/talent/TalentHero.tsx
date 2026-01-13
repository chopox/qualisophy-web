import React from "react";
import { motion } from "framer-motion";

export const TalentHero = () => {
  return (
    // We use motion.div to animate the entry on load
    <motion.div
      className="relative z-10 max-w-5xl mx-auto text-center px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 drop-shadow-lg">
        Inclusión Laboral de Personas con{" "}
        <span className="text-primary font-heading drop-shadow-md">Autismo</span>
      </h1>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-100 font-primary drop-shadow-md">
        Una oportunidad para transformar el mercado laboral español hacia la
        verdadera inclusión y diversidad.
      </p>
    </motion.div>
  );
};
