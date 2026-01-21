import React from "react";

interface PartnershipCTAProps {
  variant?: "white" | "gray"; // "gray" = fondo gris claro
}

export const PartnershipCTA: React.FC<PartnershipCTAProps> = ({
  variant = "white",
}) => {
  const isGray = variant === "gray";

  return (
    <section
      className={`
        px-6 py-24 lg:px-12 flex justify-center text-center w-full relative overflow-hidden
        ${isGray ? "bg-gray-50" : "bg-white"}
      `}
    >
      {/* Decoración de fondo sutil */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl font-heading text-secondary">
            ¿Listo para multiplicar el impacto de tu organización?
          </h2>
          <p className="text-lg lg:text-xl font-normal leading-relaxed font-primary max-w-2xl mx-auto text-gray-600">
            Aliémonos para crear futuros. Hablemos de cómo podemos colaborar
            para la inserción laboral de vuestros usuarios.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          {/* Botón Principal (Mailto) */}
          <a
            href="mailto:colaboraciones@qualisophy.com"
            className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg hover:bg-primary/90 hover:-translate-y-1 transition-all min-w-[240px]"
          >
            Hablemos de una Alianza
          </a>

          {/* Botón Secundario (Casos de Éxito / Reunión) */}
          <a
            href="https://calendar.app.google/6TZSzsQn4q9kATzMA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl h-14 px-8 border-2 border-gray-200 text-secondary text-lg font-bold hover:border-primary hover:text-primary transition-all min-w-[240px] bg-transparent"
          >
            Agendar Reunión
          </a>
        </div>
      </div>
    </section>
  );
};
