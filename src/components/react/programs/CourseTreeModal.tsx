import React, { useState, useEffect, useRef } from "react";
import { courseCategories } from "@/data/courseCatalog"; // Importamos la fuente de verdad

interface CourseTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CourseTreeModal: React.FC<CourseTreeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>("qa");
  const coursesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (coursesContainerRef.current) {
      coursesContainerRef.current.scrollTop = 0;
    }
  }, [selectedBranchId]);

  if (!isOpen) return null;

  const activeBranch =
    courseCategories.find((b) => b.id === selectedBranchId) ||
    courseCategories[0];

  const handleBranchClick = (id: string) => {
    if (selectedBranchId === id && window.innerWidth < 768) {
      setSelectedBranchId(null);
    } else {
      setSelectedBranchId(id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-secondary/90 backdrop-blur-sm animate-in fade-in duration-200 p-4 md:pt-28 md:pb-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-7xl shadow-2xl relative flex flex-col max-h-[90vh] h-[85vh] md:h-full">
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start shrink-0 bg-white z-10 relative rounded-t-3xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-secondary">
              Áreas de Formación
            </h2>
            <p className="text-gray-500 font-primary text-sm mt-1">
              Selecciona una rama para ver todos los itinerarios disponibles
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full  hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-4/12 bg-gray-50/50 md:bg-white p-4 md:p-6 md:border-r border-gray-100 md:overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-3">
              {courseCategories.map((branch) => {
                const isActive = selectedBranchId === branch.id;

                return (
                  <div key={branch.id} className="flex flex-col">
                    <button
                      onClick={() => handleBranchClick(branch.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl text-left transition-all duration-300 border-2 cursor-pointer group
                        ${isActive ? "bg-white border-primary shadow-md ring-1 ring-primary/10 scale-[1.02]" : "bg-white border-transparent hover:border-primary/40 hover:bg-slate-50 hover:shadow-sm"}
                      `}
                    >
                      {/* Icono de la Categoría: Base Slate, Activo Primary */}
                      <div
                        className={`shrink-0 size-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${isActive ? "bg-primary text-white" : "bg-slate-100 text-secondary group-hover:bg-primary group-hover:text-white"}`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {branch.icon}
                        </span>
                      </div>

                      {/* Título de la Categoría */}
                      <div className="flex-1">
                        <span
                          className={`block font-bold text-lg transition-colors ${isActive ? "text-primary" : "text-slate-800 group-hover:text-primary"}`}
                        >
                          {branch.title}
                        </span>
                      </div>

                      {/* Chevron */}
                      <span
                        className={`material-symbols-outlined transition-transform duration-300 ${isActive ? "rotate-90 md:rotate-0 text-primary" : "text-slate-400 group-hover:text-primary"}`}
                      >
                        chevron_right
                      </span>
                    </button>

                    <div
                      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-[800px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-inner">
                        <div className="flex flex-col gap-2">
                          <a
                            href={branch.link}
                            className="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-2"
                          >
                            Ver toda la rama {branch.title}
                            <span className="material-symbols-outlined text-sm">
                              open_in_new
                            </span>
                          </a>
                          {branch.courses.map((course, idx) => (
                            <a
                              key={idx}
                              href={course.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-primary transition-colors group"
                            >
                              <span className="material-symbols-outlined text-lg text-secondary group-hover:text-primary mt-0.5 transition-colors">
                                menu_book
                              </span>
                              <span className="text-sm font-medium leading-snug">
                                {course.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex md:w-8/12 flex-col bg-white h-full relative">
            <div className="p-8 shrink-0 border-b border-gray-50 bg-white/50 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between mb-4">
                {/* Píldora de Categoría Activa */}
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-seconday`}
                >
                  {activeBranch.title}
                </div>
                <a
                  href={activeBranch.link}
                  className="flex items-center gap-2 text-sm font-bold text-primary transition-colors group"
                >
                  <span className="group-hover:underline">
                    Ir a la sección completa
                  </span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold font-heading text-secondary">
                  Cursos Disponibles
                </h3>
              </div>
            </div>

            <div
              ref={coursesContainerRef}
              className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar"
            >
              <div className="grid grid-cols-2 gap-4">
                {activeBranch.courses.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.href}
                    // Borde sutil y hover con fondo slate y borde primario sutil
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary/40 hover:shadow-lg hover:bg-slate-50 transition-all duration-300 bg-white h-full"
                  >
                    {/* Icono de Libro: Base Slate, Hover Primary */}
                    <div className="size-12 rounded-full bg-slate-100 border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all shrink-0">
                      <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors text-2xl">
                        menu_book
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Título del curso */}
                      <span className="block font-bold text-secondary text-base mb-1 group-hover:text-primary transition-colors pr-2 leading-snug">
                        {course.title}
                      </span>
                      {/* Enlace estético */}
                      <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">
                        Ver temario y detalles →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="h-8"></div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-100 text-center shrink-0 rounded-b-3xl">
          <a
            href="/learning"
            className="inline-flex items-center gap-2 text-primary font-bold text-base group"
          >
            <span className="group-hover:underline">Ver Catálogo Completo</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
