import React, { useEffect, useState, useRef } from "react";

// Sub-componente (Sin cambios internos de lógica, solo se usa aquí)
const CircularProgress = ({
  percentage,
  label,
  subtext,
}: {
  percentage: number;
  label: string;
  subtext: string;
}) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Sin transición CSS para sincronización perfecta
  const strokeDashoffset = circumference - (count / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * percentage);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(percentage);
    };
    requestAnimationFrame(animate);
  }, [isVisible, percentage]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
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
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-secondary font-heading">
            {Math.round(count)}%
          </span>
        </div>
      </div>
      <h3 className="mt-8 text-xl font-bold text-secondary">{label}</h3>
      <p className="mt-3 text-sm text-slate-600 text-center max-w-xs font-primary">
        {subtext}
      </p>
    </div>
  );
};

export interface LegalItem {
  percentage: number;
  label: string;
  description: string;
}

interface LegalComplianceProps {
  title?: string;
  items: LegalItem[];
  footerText?: string;
}

export const LegalCompliance: React.FC<LegalComplianceProps> = ({
  title = "Marco Legal: Cumplimiento Pendiente",
  items,
  footerText,
}) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-heading sm:text-4xl font-bold text-secondary mb-16">
          {title}
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 items-start">
          {items.map((item, idx) => (
            <CircularProgress
              key={idx}
              percentage={item.percentage}
              label={item.label}
              subtext={item.description}
            />
          ))}
        </div>

        {footerText && (
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-slate-600 text-sm font-primary">
                {footerText}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
