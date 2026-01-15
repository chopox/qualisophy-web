import React from "react";

export const ProgramCTA: React.FC = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 lg:px-12 flex justify-center text-center w-full relative overflow-hidden border-t border-gray-100">
      {/* Fondo decorativo sutil */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-secondary text-3xl font-bold leading-tight md:text-5xl font-heading">
            ¿Listo para transformar tu carrera?
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl font-normal leading-relaxed font-primary max-w-2xl mx-auto">
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
            className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-gray-200 text-secondary text-lg font-bold hover:border-secondary hover:bg-secondary hover:text-white transition-all font-primary"
          >
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};
