import React, { useState, useEffect } from "react";

// Definimos los programas disponibles
const programs = [
  {
    title: "Neurodivergencia",
    description: "Potenciando el talento de personas con TDAH y Autismo.",
    icon: "psychology",
    href: "/neurodivergence",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Talento Migrante",
    description: "Validación de competencias para la integración global.",
    icon: "public",
    href: "/migrant-talent",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Riesgo de Exclusión",
    description: "Oportunidades reales a través de capacitación digital.",
    icon: "volunteer_activism",
    href: "/social-impact",
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Reciclaje Laboral",
    description: "Reinvención profesional para el mercado actual.",
    icon: "model_training",
    href: "/reskilling",
    color: "bg-amber-50 text-amber-600",
  },
];

export const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Imagen de fondo
  const bgImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  // Lógica para cerrar con ESC y bloquear scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll de la página
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Cerrar al hacer clic en el fondo oscuro
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <section className="relative w-full overflow-hidden min-h-[600px] flex items-center">
        {/* 1. Capa de Imagen de Fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Equipo colaborando en tecnología"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* 2. Capa de Overlay Azul */}
        <div className="absolute inset-0 z-0 bg-secondary/90 mix-blend-multiply" />

        {/* 3. Contenido */}
        <div className="relative z-10 layout-container flex flex-col items-center justify-center w-full px-6 lg:px-8 py-20 mx-auto max-w-7xl">
          <div className="max-w-4xl text-center flex flex-col gap-6">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-heading drop-shadow-md">
              Tecnología que <span className="text-primary">Une</span>,<br />
              Talento que <span className="text-primary">Transforma</span>
            </h1>

            <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto font-primary drop-shadow-sm">
              Impulsamos la inclusión laboral en tecnología conectando talento
              diverso con empresas innovadoras, construyendo puentes hacia el
              futuro.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4 font-primary">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform  text-base border border-transparent cursor-pointer"
              >
                Ver Programas
              </button>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-bold py-3 px-8 rounded-lg transition-all text-base backdrop-blur-sm"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- VENTANA MODAL --- */}
      {isModalOpen && (
        <div
          // Z-INDEX ALTO: z-[9999] para tapar el chatbox y el header
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary/90 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={handleBackdropClick}
        >
          {/* Contenedor del Modal:
             - max-h-[90vh]: Asegura que no sea más alto que la pantalla en móviles.
             - w-full max-w-4xl: Ancho controlado.
             - flex flex-col: Para gestionar el scroll interno.
             - shadow-2xl: Profundidad.
          */}
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Botón Cerrar (Sticky para que siempre se vea) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 z-10 p-1 rounded-full   text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Cabecera del Modal (Fija) */}
            <div className="p-6 md:p-8 pb-2 text-center shrink-0">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary font-heading mb-2">
                Nuestros Programas
              </h2>
              <p className="text-gray-500 font-primary text-sm md:text-base">
                Selecciona el programa que mejor se adapte a tu perfil o
                necesidades
              </p>
            </div>

            {/* Grid de Programas (Scrollable) 
                - overflow-y-auto: El scroll ocurre AQUÍ dentro, no en toda la página.
            */}
            <div className="p-6 md:p-8 pt-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program) => (
                  <a
                    key={program.href}
                    href={program.href}
                    onClick={() => setIsModalOpen(false)}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div
                      className={`shrink-0 size-12 rounded-xl flex items-center justify-center ${program.color}`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {program.icon}
                      </span>
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors font-heading flex items-center gap-2">
                        {program.title}
                        <span className="material-symbols-outlined text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary hidden md:block">
                          arrow_forward
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500 font-primary leading-relaxed mt-1">
                        {program.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer del Modal (Fijo abajo) */}
            <div className="p-4 md:p-6 bg-gray-50 text-center border-t border-gray-100 rounded-b-3xl shrink-0">
              <p className="text-xs md:text-sm text-gray-500 font-primary">
                ¿No sabes cuál elegir?{" "}
                <a
                  href="/contact"
                  className="text-primary font-bold hover:underline"
                >
                  Contáctanos para orientación gratuita
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
