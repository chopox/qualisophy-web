import React, { useState, useEffect } from "react";

// Datos de los cursos para el Modal (Diseño exacto imagen)
const courseCards = [
  {
    id: "qa-manual",
    category: "QA MANUAL & METHODOLOGIES",
    title: "Testing y Calidad del Software",
    description:
      "Domina los fundamentos del testing, diseño de casos de prueba y metodologías ágiles.",
    icon: "bug_report",
    href: "/cursos/qa/calidad-software", // FIX: Actualizado a la ruta en español
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "automation",
    category: "AUTOMATION TESTING",
    title: "BDD y Automatización E2E",
    description:
      "Aprende a automatizar pruebas con Cucumber, Gherkin y Cypress en entornos CI/CD.",
    icon: "playlist_add_check",
    href: "/cursos/qa/bootcamp-cypress", // FIX: Actualizado a la ruta en español
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "devops",
    category: "DEVOPS & CODING",
    title: "Coding & DevOps for Testers",
    description:
      "Da el salto técnico: JavaScript, Git, Docker y Pipelines de CI/CD para testers.",
    icon: "terminal",
    href: "/cursos/devops/introduccion-devops", // FIX: Actualizado a la ruta en español
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "explore",
    category: "EXPLORAR",
    title: "Ver Catálogo Completo",
    description:
      "Explora toda nuestra oferta formativa y encuentra tu próximo reto profesional.",
    icon: "school",
    href: "/cursos", // FIX: Mantenido a /cursos general
    color: "bg-purple-50 text-purple-600",
  },
];

export const ReskillingCourses: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bloqueo de scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* --- SECCIÓN VISIBLE (CTA PRINCIPAL) --- */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-secondary leading-tight">
                Impulsa tu carrera tecnológica
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-primary leading-relaxed">
                Tanto si buscas especializarte técnicamente como si necesitas
                orientación personalizada, tenemos el camino para ti.
              </p>
            </div>

            {/* BOTONES DE CTA */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              {/* Botón 1: Abrir Modal de Cursos */}
              <a
                href="/cursos"
                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform text-lg min-w-[240px] cursor-pointer"
              >
                Empieza tu Transformación
              </a>

              {/* Botón 2: Contacto / Asesoría */}
              <a
                href="/contact"
                className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-primary text-secondary hover:text-primary font-bold py-4 px-8 rounded-xl transition-all text-lg min-w-[240px]"
              >
                Agendar Asesoría
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODAL DE CURSOS (Estilo visual exacto a la imagen) --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary/90 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-white rounded-3xl w-full max-w-6xl shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Botón Cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Cabecera */}
            <div className="p-8 md:p-10 pb-2 text-center shrink-0">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-3">
                Especialización Técnica
              </h2>
              <p className="text-gray-500 font-primary text-base md:text-lg">
                Selecciona la rama tecnológica en la que deseas profundizar
              </p>
            </div>

            {/* Grid de Tarjetas */}
            <div className="p-8 md:p-10 pt-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseCards.map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    className="group relative flex flex-col sm:flex-row items-start gap-6 p-8 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white hover:bg-white cursor-pointer"
                  >
                    {/* Icono con fondo de color */}
                    <div
                      className={`shrink-0 size-16 rounded-2xl flex items-center justify-center ${card.color} transition-transform group-hover:scale-110`}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {card.icon}
                      </span>
                    </div>

                    {/* Contenido Texto */}
                    <div className="flex flex-col text-left w-full relative">
                      <div className="flex justify-between items-center w-full mb-1">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          {card.category}
                        </span>
                        {/* Flecha a la derecha */}
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-xl">
                          arrow_forward_ios
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors font-heading mb-2 mt-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-primary leading-relaxed pr-6">
                        {card.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 text-center border-t border-gray-100 rounded-b-3xl shrink-0 text-sm text-gray-500 font-primary flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">info</span>
              Todos nuestros cursos incluyen certificación y acceso a bolsa de
              empleo.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
