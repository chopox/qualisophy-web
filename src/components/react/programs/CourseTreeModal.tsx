import React, { useState, useEffect, useRef } from "react";

// --- DATOS DEL ÁRBOL DE CURSOS ---
const courseTreeData = [
  {
    id: "qa",
    title: "QA / Testing",
    icon: "bug_report",
    description:
      "Asegura la calidad del software con metodologías ágiles y automatización.",
    mainLink: "/learning/qa",
    colorBg: "bg-emerald-50",
    colorText: "text-emerald-600",
    borderColor: "border-emerald-200",
    subBranches: [
      {
        title: "Testing Manual & QA",
        href: "/learning/qa/software-quality-testing-course",
        icon: "rule",
      },
      {
        title: "Automatización con Cypress",
        href: "/learning/qa/bdd-automation-e2e-course",
        icon: "auto_mode",
      },
      {
        title: "DevOps for Testers",
        href: "/learning/qa/devops-for-testers-course",
        icon: "terminal",
      },
      {
        title: "Gestión de Calidad (TQM)",
        href: "/learning/qa/quality-management-course",
        icon: "verified",
      },
    ],
  },
  {
    id: "microsoft",
    title: "Microsoft & Data",
    icon: "bar_chart",
    description:
      "Domina el análisis de datos y la visualización con el ecosistema Power Platform.",
    mainLink: "/learning/microsoft",
    colorBg: "bg-amber-50",
    colorText: "text-amber-600",
    borderColor: "border-amber-200",
    subBranches: [
      {
        title: "Power BI Dashboards",
        href: "/learning/microsoft/powerbi",
        icon: "leaderboard",
      },
      {
        title: "Data Analytics",
        href: "/learning/microsoft/data-analytics",
        icon: "analytics",
      },
      {
        title: "Excel Avanzado",
        href: "/learning/microsoft/excel-advanced",
        icon: "table_chart",
      },
      {
        title: "Power Automate",
        href: "/learning/microsoft/power-automate",
        icon: "settings_suggest",
      },
    ],
  },
  {
    id: "dev",
    title: "Desarrollo",
    icon: "code",
    description:
      "Construye soluciones robustas. Desde el Frontend hasta el Backend.",
    mainLink: "/learning/dev",
    colorBg: "bg-blue-50",
    colorText: "text-blue-600",
    borderColor: "border-blue-200",
    subBranches: [
      {
        title: "Fullstack Developer",
        href: "/learning/dev/fullstack",
        icon: "layers",
      },
      {
        title: "Frontend (React)",
        href: "/learning/dev/frontend-react",
        icon: "html",
      },
      {
        title: "Backend (Node.js)",
        href: "/learning/dev/backend-node",
        icon: "storage",
      },
      {
        title: "Java & Spring Boot",
        href: "/learning/dev/java-spring",
        icon: "cloud",
      },
    ],
  },
  {
    id: "pm",
    title: "Project Management",
    icon: "manage_accounts",
    description:
      "Lidera equipos y proyectos con metodologías ágiles y tradicionales.",
    mainLink: "/learning/pm",
    colorBg: "bg-purple-50",
    colorText: "text-purple-600",
    borderColor: "border-purple-200",
    subBranches: [
      {
        title: "Scrum Master",
        href: "/learning/pm/scrum-master",
        icon: "groups",
      },
      {
        title: "Product Owner",
        href: "/learning/pm/product-owner",
        icon: "inventory",
      },
      {
        title: "Gestión Ágil (Kanban)",
        href: "/learning/pm/kanban",
        icon: "view_kanban",
      },
      {
        title: "Liderazgo de Equipos",
        href: "/learning/pm/leadership",
        icon: "diversity_3",
      },
    ],
  },
];

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
    courseTreeData.find((b) => b.id === selectedBranchId) || courseTreeData[0];

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
      {/* CAMBIOS REALIZADOS:
         1. En el div padre (arriba): añadí 'md:pt-28 md:pb-6'. Esto empuja el modal hacia abajo respetando el header.
         2. En este div (abajo): cambié 'md:h-[85vh]' por 'md:h-full'. 
            Al tener padding el padre, 'h-full' ocupará todo el espacio restante (que es enorme) sin chocar arriba.
      */}
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-7xl shadow-2xl relative flex flex-col max-h-[90vh] h-[85vh] md:h-full">
        {/* CABECERA */}
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
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* CUERPO CENTRAL */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          {/* IZQUIERDA: LISTA DE RAMAS */}
          <div className="w-full md:w-4/12 bg-gray-50/50 md:bg-white p-4 md:p-6 md:border-r border-gray-100 md:overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-3">
              {courseTreeData.map((branch) => {
                const isActive = selectedBranchId === branch.id;

                return (
                  <div key={branch.id} className="flex flex-col">
                    <button
                      onClick={() => handleBranchClick(branch.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl text-left transition-all duration-300 border-2 cursor-pointer
                        ${
                          isActive
                            ? "bg-white border-primary shadow-md ring-1 ring-primary/10 scale-[1.02]"
                            : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
                        }
                      `}
                    >
                      <div
                        className={`shrink-0 size-12 rounded-lg flex items-center justify-center ${branch.colorBg} ${branch.colorText}`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {branch.icon}
                        </span>
                      </div>

                      <div className="flex-1">
                        <span
                          className={`block font-bold text-lg ${isActive ? "text-secondary" : "text-gray-600"}`}
                        >
                          {branch.title}
                        </span>
                      </div>

                      <span
                        className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isActive ? "rotate-90 md:rotate-0 text-primary" : ""}`}
                      >
                        chevron_right
                      </span>
                    </button>

                    {/* ACORDEÓN MÓVIL */}
                    <div
                      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-inner">
                        <p className="text-xs text-gray-500 mb-3">
                          {branch.description}
                        </p>
                        <div className="flex flex-col gap-2">
                          <a
                            href={branch.mainLink}
                            className="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-2"
                          >
                            Ver toda la rama {branch.title}
                            <span className="material-symbols-outlined text-sm">
                              open_in_new
                            </span>
                          </a>
                          {branch.subBranches.map((course, idx) => (
                            <a
                              key={idx}
                              href={course.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg text-gray-400">
                                {course.icon}
                              </span>
                              <span className="text-sm font-medium">
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

          {/* DERECHA: DETALLES DE LA RAMA (Solo Desktop) */}
          <div className="hidden md:flex md:w-8/12 flex-col bg-white h-full relative">
            {/* Header de Detalle */}
            <div className="p-8 shrink-0 border-b border-gray-50 bg-white/50 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${activeBranch.colorBg} ${activeBranch.colorText}`}
                >
                  {activeBranch.title}
                </div>
                <a
                  href={activeBranch.mainLink}
                  className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors group"
                >
                  Ir a la sección completa
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold font-heading text-secondary">
                  Cursos Disponibles
                </h3>
                <p className="text-gray-500 font-primary text-base leading-relaxed max-w-2xl">
                  {activeBranch.description}
                </p>
              </div>
            </div>

            {/* Grid de Cursos Desktop */}
            <div
              ref={coursesContainerRef}
              className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar"
            >
              <div className="grid grid-cols-2 gap-4">
                {activeBranch.subBranches.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.href}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary/40 hover:shadow-lg  hover:bg-white transition-all duration-300 bg-gray-50/30 h-full"
                  >
                    <div className="size-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary/5 transition-all shrink-0">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-2xl">
                        {course.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-bold text-secondary text-base mb-1 group-hover:text-primary transition-colors truncate">
                        {course.title}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                        Ver temario y detalles →
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Espaciador final */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 text-center shrink-0 rounded-b-3xl">
          <a
            href="/learning"
            className="inline-flex items-center gap-2 text-primary font-bold text-base hover:underline"
          >
            <span>Ver Catálogo Completo</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
