import React, { useState, useEffect } from "react";

// --- DATOS DEL ÁRBOL DE CURSOS ---
const courseTreeData = [
  {
    id: "qa",
    title: "QA / Testing",
    icon: "bug_report",
    description:
      "Asegura la calidad del software con metodologías ágiles y automatización.",
    mainLink: "/corporate-training/qa",
    // Colores basados en la imagen (Verde Mint)
    colorBg: "bg-emerald-50",
    colorText: "text-emerald-600",
    borderColor: "border-emerald-200",
    subBranches: [
      {
        title: "Testing Manual & QA",
        href: "/learning/software-quality-testing-course",
        icon: "rule",
      },
      {
        title: "Automatización con Cypress",
        href: "/learning/bdd-automation-e2e-course",
        icon: "auto_mode",
      },
      {
        title: "DevOps for Testers",
        href: "/learning/devops-for-testers-course",
        icon: "terminal",
      },
      {
        title: "Gestión de Calidad (TQM)",
        href: "/corporate-training/qa/quality-management",
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
    mainLink: "/corporate-training/powerbi",
    // Colores basados en la imagen (Naranja/Amarillo)
    colorBg: "bg-amber-50",
    colorText: "text-amber-600",
    borderColor: "border-amber-200",
    subBranches: [
      {
        title: "Power BI Dashboards",
        href: "/corporate-training/powerbi/dashboards-course",
        icon: "leaderboard",
      },
      {
        title: "Data Analytics",
        href: "/corporate-training/powerbi/data-analytics",
        icon: "analytics",
      },
      { title: "Excel Avanzado", href: "/learning", icon: "table_chart" },
      { title: "Power Automate", href: "/learning", icon: "settings_suggest" },
    ],
  },
  {
    id: "dev",
    title: "Desarrollo",
    icon: "code",
    description:
      "Construye soluciones robustas. Desde el Frontend hasta el Backend.",
    mainLink: "/corporate-training/dev",
    // Colores basados en la imagen (Azul)
    colorBg: "bg-blue-50",
    colorText: "text-blue-600",
    borderColor: "border-blue-200",
    subBranches: [
      {
        title: "Fullstack Developer",
        href: "/corporate-training/dev/fullstack-course",
        icon: "layers",
      },
      {
        title: "Frontend (React/Angular)",
        href: "/corporate-training/dev/frontend-course",
        icon: "html",
      },
      {
        title: "Backend (Node/Java)",
        href: "/corporate-training/dev/backend-course",
        icon: "storage",
      },
      { title: "Arquitectura Cloud", href: "/learning", icon: "cloud" },
    ],
  },
  {
    id: "pm",
    title: "Project Management",
    icon: "manage_accounts",
    description:
      "Lidera equipos y proyectos con metodologías ágiles y tradicionales.",
    mainLink: "/learning",
    // Colores basados en la imagen (Violeta)
    colorBg: "bg-purple-50",
    colorText: "text-purple-600",
    borderColor: "border-purple-200",
    subBranches: [
      { title: "Scrum Master", href: "/learning", icon: "groups" },
      { title: "Product Owner", href: "/learning", icon: "inventory" },
      {
        title: "Gestión Ágil (Kanban)",
        href: "/learning",
        icon: "view_kanban",
      },
      { title: "Liderazgo de Equipos", href: "/learning", icon: "diversity_3" },
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
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>("qa"); // Por defecto QA en desktop

  // Bloquear scroll
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

  if (!isOpen) return null;

  // Encontrar la rama activa para mostrar sus detalles (Desktop)
  const activeBranch =
    courseTreeData.find((b) => b.id === selectedBranchId) || courseTreeData[0];

  const handleBranchClick = (id: string) => {
    // En móvil funciona como acordeón (toggle), en desktop como selección
    if (selectedBranchId === id && window.innerWidth < 768) {
      setSelectedBranchId(null); // Cerrar en móvil si se vuelve a tocar
    } else {
      setSelectedBranchId(id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary/90 backdrop-blur-sm animate-in fade-in duration-200 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative flex flex-col h-full max-h-[90vh] md:h-auto md:min-h-[600px] overflow-hidden">
        {/* CABECERA MODAL */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start shrink-0 bg-white z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-secondary">
              Áreas de Formación
            </h2>
            <p className="text-gray-500 font-primary text-sm mt-1">
              Selecciona una rama para ver detalles
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-50"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* --- CONTENIDO --- */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* IZQUIERDA: LISTA DE RAMAS (Mobile & Desktop) */}
          <div className="w-full md:w-5/12 bg-gray-50/50 md:bg-white overflow-y-auto custom-scrollbar p-4 md:p-6 md:border-r border-gray-100">
            <div className="flex flex-col gap-3">
              {courseTreeData.map((branch) => {
                const isActive = selectedBranchId === branch.id;

                return (
                  <div key={branch.id} className="flex flex-col">
                    {/* Tarjeta de Rama */}
                    <button
                      onClick={() => handleBranchClick(branch.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border-2
                        ${
                          isActive
                            ? "bg-white border-primary shadow-md ring-1 ring-primary/10" // Estado Activo (Borde Naranja/Azul según tema, aquí usamos Primary)
                            : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
                        }
                      `}
                    >
                      {/* Icono */}
                      <div
                        className={`shrink-0 size-12 rounded-lg flex items-center justify-center ${branch.colorBg} ${branch.colorText}`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {branch.icon}
                        </span>
                      </div>

                      {/* Texto */}
                      <div className="flex-1">
                        <span
                          className={`block font-bold text-base ${isActive ? "text-secondary" : "text-gray-600"}`}
                        >
                          {branch.title}
                        </span>
                      </div>

                      {/* Flecha */}
                      <span
                        className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isActive ? "rotate-90 md:rotate-0 text-primary" : ""}`}
                      >
                        chevron_right
                      </span>
                    </button>

                    {/* --- VISIBLE SOLO EN MÓVIL (ACORDEÓN) --- */}
                    <div
                      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-inner">
                        <p className="text-xs text-gray-500 mb-3">
                          {branch.description}
                        </p>
                        <div className="flex flex-col gap-2">
                          {/* Enlace a la Rama Principal */}
                          <a
                            href={branch.mainLink}
                            className="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-2"
                          >
                            Ver toda la rama {branch.title}
                            <span className="material-symbols-outlined text-sm">
                              open_in_new
                            </span>
                          </a>
                          {/* Cursos Individuales Móvil */}
                          {branch.subBranches.map((course, idx) => (
                            <a
                              key={idx}
                              href={course.href}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors"
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
          <div className="hidden md:flex md:w-7/12 flex-col bg-white h-full overflow-hidden">
            {/* Header de Detalle */}
            <div className="p-8 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${activeBranch.colorBg} ${activeBranch.colorText}`}
                >
                  {activeBranch.title}
                </div>
                <a
                  href={activeBranch.mainLink}
                  className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-primary transition-colors"
                >
                  Ir a la sección
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </a>
              </div>
              <h3 className="text-2xl font-bold font-heading text-secondary mb-2">
                Cursos Disponibles
              </h3>
              <p className="text-gray-500 font-primary text-base">
                {activeBranch.description}
              </p>
            </div>

            {/* Grid de Cursos Desktop */}
            <div className="flex-1 overflow-y-auto p-8 pt-2 custom-scrollbar">
              <div className="grid grid-cols-1 gap-3">
                {activeBranch.subBranches.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.href}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md hover:bg-gray-50/50 transition-all duration-200"
                  >
                    <div className="size-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-lg">
                        {course.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-secondary text-sm group-hover:text-primary transition-colors">
                        {course.title}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      arrow_forward
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
          <a
            href="/learning"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
          >
            <span>Ver Catálogo Completo</span>
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
