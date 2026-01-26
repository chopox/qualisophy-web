import React from "react";

interface ProgramCTAProps {
  variant?: "white" | "blue"; // En el nuevo sistema, "blue" se interpreta como GRIS CLARO
}

export const ProgramCTA: React.FC<ProgramCTAProps> = ({
  variant = "white",
}) => {
  // Interpretamos "blue" como la variante de fondo gris
  const isGrayVariant = variant === "blue";

  return (
    <section
      className={`
        px-6 py-24 lg:px-12 flex justify-center text-center w-full transition-colors duration-300
        ${isGrayVariant ? "bg-gray-50 border-t border-gray-100" : "bg-white"}
      `}
    >
      <div className="max-w-3xl w-full flex flex-col items-center gap-8">
        <h2
          // El texto siempre es oscuro ahora (secondary), ya que el fondo siempre es claro (blanco o gris)
          className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading text-secondary"
        >
          ¿Listo para dar el siguiente paso?
        </h2>

        <p
          // Texto descriptivo siempre oscuro (gray-600)
          className="text-lg lg:text-xl font-normal leading-relaxed font-primary text-gray-600"
        >
          Explora nuestros programas detallados o agenda una consulta
          personalizada con nuestro equipo de orientación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          {/* Botón Principal (Sólido) */}
          <a
            href="/contact"
            className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-lg hover:bg-primary/90 transition-all min-w-[200px]"
          >
            Agendar Consulta
          </a>

          {/* Botón Secundario (Borde) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            // Borde gris suave por defecto, se pone primario al hover. Funciona bien sobre blanco y sobre gris claro.
            className="flex items-center justify-center rounded-xl h-14 px-8 border-2 border-gray-300 text-secondary text-lg font-bold hover:border-primary hover:text-primary transition-all min-w-[200px] bg-transparent"
          >
            Ver Programas Arriba
          </button>
        </div>
      </div>
    </section>
  );
};
