import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { motion } from "framer-motion";

export const CorporateTrainingHero = () => {
  const t = useTranslations();

  // CAMBIO REALIZADO: Apuntamos al ID 'corporate-areas' que SÍ existe en el .astro
  const handleScrollToContent = () => {
    const section = document.getElementById("corporate-areas");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] flex items-center">
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
          alt="Corporate Training Team"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* 2. OVERLAY AZUL */}
      <div className="absolute inset-0 z-0 bg-secondary/90 mix-blend-multiply opacity-95" />

      {/* 3. CONTENIDO CENTRADO */}
      <div className="relative z-10 layout-container flex flex-col items-center justify-center w-full px-6 lg:px-8 py-20 mx-auto max-w-7xl">
        <motion.div
          className="max-w-5xl text-center flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Título */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-heading drop-shadow-lg">
            Formación <span className="text-primary">para Empresas</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto font-primary drop-shadow-md">
            Programas técnicos a medida para transformar el talento de tu
            organización. Impulsa la innovación, mejora la eficiencia y retén a
            tus mejores profesionales con formación de alto impacto.
          </p>

          {/* Botón CTA */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleScrollToContent}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-lg shadow-xl transition-all transform text-lg border border-transparent font-primary cursor-pointer"
            >
              Ver Catálogo Formativo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
