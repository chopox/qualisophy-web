import React from "react";

export interface CTAButton {
  label: string;
  href: string;
  variant: "solid" | "outline";
}

interface ProgramCTAProps {
  variant?: "white" | "blue";
  title?: string;
  description?: string;
  buttons?: CTAButton[];
}

export const ProgramCTA: React.FC<ProgramCTAProps> = ({
  variant = "white",
  title = "¿Listo para dar el siguiente paso?",
  description = "Explora nuestros programas detallados o agenda una consulta personalizada con nuestro equipo de orientación.",
  buttons,
}) => {
  const isGrayVariant = variant === "blue";

  // Botones por defecto si no se pasan
  const defaultButtons: CTAButton[] = [
    { label: "Agendar Consulta", href: "/contact", variant: "solid" },
    { label: "Ver Programas Arriba", href: "#", variant: "outline" },
  ];

  const activeButtons = buttons || defaultButtons;

  return (
    <section
      className={`
        px-6 py-24 lg:px-12 flex justify-center text-center w-full transition-colors duration-300
        ${isGrayVariant ? "bg-gray-50 border-t border-gray-100" : "bg-white"}
      `}
    >
      <div className="max-w-4xl w-full flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading text-secondary">
          {title}
        </h2>

        <p className="text-lg lg:text-xl font-normal leading-relaxed font-primary text-gray-600">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto flex-wrap justify-center">
          {activeButtons.map((btn, idx) =>
            btn.href === "#" ? (
              <button
                key={idx}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`flex items-center justify-center rounded-xl h-14 px-8 text-lg font-bold transition-all min-w-[200px]
                  ${
                    btn.variant === "solid"
                      ? "bg-primary text-white shadow-lg hover:bg-primary/90"
                      : "border-2 border-gray-300 text-secondary hover:border-primary hover:text-primary bg-transparent"
                  }
                `}
              >
                {btn.label}
              </button>
            ) : (
              <a
                key={idx}
                href={btn.href}
                className={`flex items-center justify-center rounded-xl h-14 px-8 text-lg font-bold transition-all min-w-[200px]
                  ${
                    btn.variant === "solid"
                      ? "bg-primary text-white shadow-lg hover:bg-primary/90"
                      : "border-2 border-gray-300 text-secondary hover:border-primary hover:text-primary bg-transparent"
                  }
                `}
              >
                {btn.label}
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
