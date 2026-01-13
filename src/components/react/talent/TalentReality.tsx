import React, { useEffect, useRef, useState } from "react";
import { motion, type Variants, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

// Variants for the cards (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Counter animation hook
const useCounter = (
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  description: string;
  variant: "alert" | "info" | "success";
  useAnimation?: boolean;
  numericValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  title,
  description,
  variant,
  useAnimation = false,
  numericValue = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const animatedValue = useCounter(
    numericValue,
    2000,
    isInView && useAnimation
  );

  const variants = {
    alert: {
      text: "text-secondary",
      border: "hover:border-secondary/65",
      bg: "bg-secondary/10",
    },
    info: {
      text: "text-secondary",
      border: "hover:border-secondary/65",
      bg: "bg-secondary/10",
    },
    success: {
      text: "text-primary",
      border: "hover:border-primary/30",
      bg: "bg-primary/10",
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`block p-8 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-2xl transition-shadow duration-300 border-l-4 border-l-transparent ${style.border}`}
    >
      <div className={`w-8 h-8 mb-4 ${style.text}`}>{icon}</div>

      {/* Value with animation */}
      <h3 className={`mb-3 text-5xl font-black ${style.text}`}>
        {useAnimation && isInView ? `${animatedValue}%` : value}
      </h3>

      {/* Title */}
      <h4 className="mb-2 text-xl font-semibold tracking-tight text-[#1B2341]">
        {title}
      </h4>

      {/* Description */}
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
};

export const TalentReality = () => {
  return (
    <AnimatedSection className="container mx-auto px-6 max-w-6xl">
      {/* Main Title and Paragraph */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl font-bold text-[#1B2341]">
          Una Realidad Preocupante
        </h2>
        <p className="text-lg text-neutral-700 mt-4 leading-relaxed">
          El autismo presenta la{" "}
          <strong className="text-[#1B2341]">tasa más alta de desempleo</strong>{" "}
          entro de los colectivos de discapacidad, aunque muchas personas
          cuentan con la formación y habilidades técnicas necesarias. En
          Qualisophy acompañamos para cambiar esta realidad, conectando talento
          con oportunidades reales.
        </p>
        <div className="mt-6 pt-4 border-t border-primary-DEFAULT/30">
  <p className="font-heading text-primary-DEFAULT text-l font-semibold italic">
    “La tecnología puede ser un camino de inclusión real, paso a paso y sin barreras.”
  </p>
</div>
      </div>

      {/* Cards Grid - Now 3 columns */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1: Unemployment - SECONDARY COLOR */}
        <StatCard
          icon={
            <svg
              className="w-8 h-8 "
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          }
          value="76-90%"
          title="Desempleo"
          description="Personas adultas con autismo sin actividad laboral productiva."
          variant="alert"
        />

        {/* Card 2: Activity Rate - SECONDARY COLOR */}
        <StatCard
          icon={
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          value="34,6%"
          title="Tasa de Actividad"
          description="Personas con discapacidad vs 77,7% sin discapacidad."
          variant="info"
        />

        {/* Card 3: Success Rate - PRIMARY COLOR */}
        <StatCard
          icon={
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          value="85%"
          numericValue={85}
          title="Retención Laboral"
          description="De nuestros participantes continúan activos después de 12 meses."
          variant="success"
          useAnimation={true}
        />
      </motion.div>
    </AnimatedSection>
  );
};
