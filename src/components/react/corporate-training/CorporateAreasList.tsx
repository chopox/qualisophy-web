import React, { useState } from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { useTranslations } from "@/hooks/useTranslations";
import { motion, AnimatePresence } from "framer-motion";

// --- DATOS DE LOS ITINERARIOS (GRADIENTE CORPORATIVO) ---
const trainingPaths = [
  {
    id: "qa",
    title: "QA & Testing",
    subtitle: "Aseguramiento de Calidad",
    icon: "bug_report",
    // 1. Azul profundo
    headerBg: "bg-[#325886]",
    lightBg: "bg-[#F4F8FB]",
    hoverBorder: "hover:border-[#325886]",
    textColor: "text-[#1B2341]",
    hoverText: "group-hover:text-[#325886]",
    mainLink: "/corporate-training/qa",
    courses: [
      {
        title: "Testing Manual & QA",
        href: "/corporate-training/qa/manual-testing",
      },
      {
        title: "Automatización con Cypress",
        href: "/corporate-training/qa/automation-course",
      },
      { title: "DevOps for Testers", href: "/corporate-training/qa/devOps" },
      {
        title: "Gestión de Calidad (TQM)",
        href: "/corporate-training/qa/quality-management",
      },
    ],
  },
  {
    id: "data",
    title: "Microsoft & Data",
    subtitle: "Business Intelligence",
    icon: "bar_chart",
    // 2. Azul medio
    headerBg: "bg-[#4B7BB5]",
    lightBg: "bg-[#F0F7FD]",
    hoverBorder: "hover:border-[#4B7BB5]",
    textColor: "text-[#4B7BB5]",
    hoverText: "group-hover:text-[#4B7BB5]",
    mainLink: "/corporate-training/powerbi",
    courses: [
      {
        title: "Power BI Dashboards",
        href: "/corporate-training/powerbi/dashboards-course",
      },
      {
        title: "Data Analytics & SQL",
        href: "/corporate-training/powerbi/data-analytics",
      },
      {
        title: "Excel Avanzado Business",
        href: "/corporate-training/powerbi/excel",
      },
      {
        title: "Power Automate Flows",
        href: "/corporate-training/powerbi/automate",
      },
    ],
  },
  {
    id: "dev",
    title: "Desarrollo",
    subtitle: "Ingeniería de Software",
    icon: "code",
    // 3. Primario
    headerBg: "bg-[#6296CE]",
    lightBg: "bg-[#F0F9FF]",
    hoverBorder: "hover:border-[#6296CE]",
    textColor: "text-[#6296CE]",
    hoverText: "group-hover:text-[#6296CE]",
    mainLink: "/corporate-training/dev",
    courses: [
      {
        title: "Fullstack Development",
        href: "/corporate-training/dev/fullstack-course",
      },
      {
        title: "Frontend (React/Vue)",
        href: "/corporate-training/dev/frontend-course",
      },
      {
        title: "Backend (Node.js/Java)",
        href: "/corporate-training/dev/backend-course",
      },
      { title: "Arquitectura Cloud", href: "/corporate-training/dev/cloud" },
    ],
  },
  {
    id: "pm",
    title: "Project Management",
    subtitle: "Liderazgo y Agilidad",
    icon: "manage_accounts",
    // 4. Azul claro
    headerBg: "bg-[#70A0D2]",
    lightBg: "bg-[#70A0D2]",
    hoverBorder: "hover:border-[#70A0D2]",
    textColor: "text-[#70A0D2]",
    hoverText: "group-hover:text-[#70A0D2]",
    mainLink: "/corporate-training/pm",
    courses: [
      { title: "Scrum Master", href: "/corporate-training/pm/scrum" },
      { title: "Product Owner", href: "/corporate-training/pm/product-owner" },
      { title: "Gestión Ágil (Kanban)", href: "/corporate-training/pm/kanban" },
      {
        title: "Liderazgo de Equipos",
        href: "/corporate-training/pm/leadership",
      },
    ],
  },
];

export const CorporateAreasList: React.FC = () => {
  const t = useTranslations();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <AnimatedSection className="py-20 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* CABECERA DE SECCIÓN */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Catálogo formativo
          </span>
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-slate-800 mb-4">
            Formación para empresas
          </h2>
          <p className="text-lg text-slate-600 font-primary">
            Visualiza nuestros itinerarios formativos estándar. Puedes contratar
            un itinerario completo o módulos sueltos según las necesidades de tu
            equipo.
          </p>
        </div>

        {/* ==============================================
            VISTA DE ESCRITORIO
           ============================================== */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {trainingPaths.map((path) => (
            <div key={path.id} className="flex flex-col h-full">
              {/* 1. CABECERA DE COLUMNA */}
              <div
                className={`
                rounded-2xl p-6 text-center shadow-lg mb-6 relative overflow-hidden transition-transform duration-300 
                ${path.headerBg} text-white
              `}
              >
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <span className="material-symbols-outlined text-2xl">
                      {path.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl font-heading leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs text-white/90 font-medium uppercase tracking-wide opacity-90">
                    {path.subtitle}
                  </p>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              </div>

              {/* LÍNEA CONECTORA */}
              <div className="block w-px h-8 border-l-2 border-dashed border-gray-300 mx-auto -mt-6 mb-2 relative z-0"></div>

              {/* 2. LISTA DE BLOQUES (CURSOS) */}
              <div className="flex flex-col gap-3 flex-1">
                {path.courses.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.href}
                    // Agregamos 'group' para controlar el hover de los hijos (texto) desde el padre (botón)
                    className={`
                        group block p-4 rounded-xl border-2 border-gray-100 text-center transition-all duration-200
                        bg-white hover:shadow-md
                        ${path.hoverBorder} 
                    `}
                  >
                    {/* Hemos eliminado el div de la barra lateral izquierda */}

                    <span
                      className={`text-sm font-bold text-slate-700 transition-colors ${path.hoverText}`}
                    >
                      {course.title}
                    </span>
                  </a>
                ))}

                {/* 3. BLOQUE VER MÁS */}
                <div className="mt-auto pt-4 text-center">
                  <a
                    href={path.mainLink}
                    className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${path.textColor} hover:underline`}
                  >
                    Ver sección completa
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ==============================================
            VISTA MÓVIL (Acordeón)
           ============================================== */}
        <div className="lg:hidden flex flex-col gap-4">
          {trainingPaths.map((path) => {
            const isOpen = openAccordion === path.id;
            return (
              <div
                key={path.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Cabecera del Acordeón (Clickable) */}
                <button
                  onClick={() => toggleAccordion(path.id)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-300 ${
                    isOpen ? path.lightBg : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        isOpen
                          ? `${path.headerBg} text-white`
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {path.icon}
                      </span>
                    </div>
                    <div>
                      <h3
                        className={`font-bold font-heading text-lg ${
                          isOpen ? path.textColor : "text-slate-700"
                        }`}
                      >
                        {path.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {path.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined transition-transform duration-300 ${
                      isOpen ? `rotate-180 ${path.textColor}` : "text-gray-400"
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Contenido Desplegable */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-gray-100">
                        <div className="flex flex-col gap-2 mt-4">
                          {path.courses.map((course, idx) => (
                            <a
                              key={idx}
                              href={course.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-slate-600 hover:text-primary transition-colors border border-transparent hover:border-gray-100"
                            >
                              <span
                                className={`material-symbols-outlined text-sm ${path.textColor}`}
                              >
                                chevron_right
                              </span>
                              <span className="text-sm font-medium">
                                {course.title}
                              </span>
                            </a>
                          ))}

                          <a
                            href={path.mainLink}
                            className={`mt-2 p-3 text-center text-xs font-bold uppercase tracking-wider ${path.textColor} bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors`}
                          >
                            Ver todos los cursos de {path.title}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};
