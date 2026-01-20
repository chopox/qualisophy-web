// ... imports

interface CTAProps {
  variant?: "white" | "blue";
}

export const ProgramCTA: React.FC<CTAProps> = ({ variant = "white" }) => {
  const isBlue = variant === "blue";

  return (
    <section
      className={`
        px-6 py-20 lg:px-12 flex justify-center text-center w-full relative overflow-hidden border-t 
        ${isBlue ? "bg-secondary border-white/10" : "bg-gray-50 border-gray-100"}
      `}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${isBlue ? "#475569" : "#cbd5e1"} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col gap-4">
          <h2
            className={`
              text-3xl font-bold leading-tight md:text-5xl font-heading
              ${isBlue ? "text-white" : "text-secondary"}
            `}
          >
            ¿Listo para transformar tu carrera?
          </h2>
          <p
            className={`
              text-lg lg:text-xl font-normal leading-relaxed font-primary max-w-2xl mx-auto
              ${isBlue ? "text-gray-300" : "text-gray-600"}
            `}
          >
            Únete a una comunidad que valora tu forma única de ver el mundo. Las
            inscripciones para el próximo ciclo están abiertas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold leading-normal shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all font-primary">
            Inscribirse al Programa
          </button>
          <a
            href="/contact"
            className={`
              flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 text-lg font-bold transition-all font-primary
              ${
                isBlue
                  ? "border-white/20 text-white hover:bg-white hover:text-secondary"
                  : "border-gray-200 text-secondary hover:border-secondary hover:bg-secondary hover:text-white"
              }
            `}
          >
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};
