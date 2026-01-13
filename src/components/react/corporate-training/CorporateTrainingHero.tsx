import { Button } from "@/components/react/shared/Button";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";

export const CorporateTrainingHero = () => {
  const t = useTranslations();
  return (
    <section
      className="
        relative left-1/2 right-1/2 -mx-[50vw] w-screen
        text-white overflow-hidden
        py-24 md:py-32
        -mt-[var(--navbar-height,4rem)]
      "
    >
      {/* Background image */}
      <div
        className="
          absolute inset-0 bg-cover bg-center brightness-75
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Content */}
      {/* Wrap the content in a <motion.div> to animate it */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 20 }} // Estado inicial
        animate={{ opacity: 1, y: 0 }} // Estado final
        transition={{ duration: 0.7, ease: "easeOut" }} // Transición
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 drop-shadow-lg">
          Formación{" "}
          <span className="text-primary font-heading drop-shadow-md">para Empresas</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-100 font-primary drop-shadow-md mb-8">
          Programas de formación técnica diseñados para transformar la capacidad
          de tus equipos. Actualiza las competencias, impulsa la innovación y
          aumenta la eficiencia de tu organización.
        </p>
        <a href="/contact">
          <Button variant="primary" size="md">
            {t('button.requestInfo')}
          </Button>
        </a>
      </motion.div>
    </section>
  );
};
