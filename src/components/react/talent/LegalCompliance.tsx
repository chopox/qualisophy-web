import React, { useEffect, useState, useRef } from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

// Componente individual para el Gráfico Circular Animado
const CircularProgress = ({
  percentage,
  label,
  subtext,
}: {
  percentage: number;
  label: string;
  subtext: string;
}) => {
  const [count, setCount] = useState(0); // Estado compartido para número y círculo
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Configuración del SVG
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // Calculamos el offset basado directamente en el estado 'count'.
  // Al no haber transición CSS, el círculo reacciona en el mismo frame que el número.
  const strokeDashoffset = circumference - (count / 100) * circumference;

  // 1. Detectar cuando el componente entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo animar una vez
        }
      },
      { threshold: 0.5 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Ejecutar animación sincronizada
  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 segundos de duración

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Función de Easing (Ease Out Cubic) para frenado suave
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentVal = easeOut * percentage;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(percentage); // Asegurar valor final exacto
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, percentage]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Círculo Fondo (Gris) */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Círculo Progreso (Animado) */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              // IMPORTANTE: Eliminada la transición CSS para que la sincronización sea perfecta (frame a frame)
            }}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>

        {/* Texto Centro (Animado) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-secondary font-heading">
            {Math.round(count)}%
          </span>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-bold text-secondary">{label}</h3>
      <p className="mt-3 text-sm text-slate-600 text-center max-w-xs font-primary leading-relaxed">
        {subtext}
      </p>
    </div>
  );
};

export const LegalCompliance = () => {
  return (
    <AnimatedSection className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-16">
          Marco Legal: Cumplimiento Pendiente
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 items-start">
          <CircularProgress
            percentage={2}
            label="Cuota Legal"
            subtext="Porcentaje mínimo de plantilla con discapacidad exigido por ley a empresas de +50 empleados."
          />
          <CircularProgress
            percentage={50}
            label="Incumplimiento"
            subtext="Estimación de empresas obligadas que actualmente no alcanzan el porcentaje o medidas alternativas."
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-slate-600 text-sm font-primary">
              La{" "}
              <span className="font-bold text-secondary">
                Ley General de Discapacidad (LGD)
              </span>{" "}
              establece obligaciones claras, pero su cumplimiento sigue siendo
              un reto. En Qualisophy te ayudamos a convertir este requisito en
              una ventaja estratégica.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
