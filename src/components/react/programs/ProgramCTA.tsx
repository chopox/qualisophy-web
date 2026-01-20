import React from "react";

interface CTAProps {
  variant?: "white" | "blue";
}

export const ProgramCTA: React.FC<CTAProps> = ({ variant = "white" }) => {
  const isBlue = variant === "blue";

  return (
    <section
      className={`
        px-6 py-20 lg:px-12 flex justify-center text-center w-full relative overflow-hidden
        ${isBlue ? "bg-secondary" : "bg-white"}
      `}
    >
      {/* Background decoration */}

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col gap-4">
          <h2
            className={`
              text-3xl font-bold leading-tight md:text-5xl font-heading
              ${isBlue ? "text-white" : "text-secondary"}
            `}
          >
            ¿Listo para multiplicar el impacto de tu organización?
          </h2>
          <p
            className={`
              text-lg lg:text-xl font-normal leading-relaxed font-primary max-w-2xl mx-auto
              ${isBlue ? "text-gray-300" : "text-gray-600"}
            `}
          >
            Aliémonos para crear futuros. Escríbenos directamente o agenda una
            reunión con nuestro equipo para explorar vías de colaboración.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {/* BOTÓN 1: Escribir mail (Primary) */}
          <a
            href="mailto:colaboraciones@qualisophy.com"
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold leading-normal shadow-lg hover:bg-primary/90 transition-all font-primary min-w-[220px]"
          >
            Hablemos de una Alianza
          </a>

          {/* BOTÓN 2: Agendar Reunión (Outline) */}
          <a
            href="https://calendar.app.google/6TZSzsQn4q9kATzMA"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 text-lg font-bold transition-all font-primary min-w-[220px]
              ${
                isBlue
                  ? "border-white/20 text-white hover:bg-white hover:text-secondary"
                  : "border-gray-200 text-secondary hover:border-secondary hover:bg-secondary hover:text-white"
              }
            `}
          >
            Agendar Reunión
          </a>
        </div>
      </div>
    </section>
  );
};
