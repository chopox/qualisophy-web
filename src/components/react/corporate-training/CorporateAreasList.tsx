import React, { useState } from "react";
import { ContentCard } from "@/components/react/shared/ContentCard";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { Modal } from "@/components/react/shared/Modal";
import { Info } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface Course {
  name: string;
  url: string;
}

interface AreaCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
  courses: Course[];
}

export const CorporateAreasList: React.FC = () => {
  const t = useTranslations();

  const [openModal, setOpenModal] = useState<string | null>(null);

  const areas: AreaCardData[] = [
    {
      id: "dev",
      title: "Formación en Desarrollo (DEV)",
      description:
        "Potencia las habilidades técnicas de tus equipos en tecnologías modernas como Java, Node.js, React o Angular.",
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
      buttonText: t('button.viewTraining'),
      buttonHref: "/corporate-training/dev",
      // Now each course has name and url
      courses: [
        {
          name: "Frontend Moderno (React, Vue, TypeScript, TailwindCSS)",
          url: "/corporate-training/dev/frontend-course",
        },
        {
          name: "Backend Escalable (Node.js, APIs REST, bases de datos)",
          url: "/corporate-training/dev/backend-course",
        },
        {
          name: "Full Stack Development (Ciclo completo: frontend + backend + CI/CD)",
          url: "/corporate-training/dev/fullstack-course",
        },
      ],
    },
    {
      id: "qa",
      title: "Formación en Calidad y Testing (QA)",
      description:
        "Capacita a tus equipos en testing funcional, automatización, BDD y estrategias modernas de aseguramiento de calidad.",
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80",
      buttonText: t('button.viewTraining'),
      buttonHref: "/corporate-training/qa",
      courses: [
        {
          name: "Automatización de Pruebas (Selenium, Cypress, Playwright)",
          url: "/corporate-training/qa/automation-course",
        },
        {
          name: "DevOps para QA (Integración en pipelines CI/CD, Jenkins, Docker)",
          url: "/corporate-training/qa/devops",
        },
        {
          name: "Gestión de Calidad del Software (Estrategias QA, planificación, KPIs)",
          url: "/corporate-training/qa/quality-management",
        },
      ],
    },
    {
      id: "powerbi",
      title: "Formación en Power BI y Análisis de Datos",
      description:
        "Forma a tus equipos en análisis de datos, dashboards interactivos y visualización avanzada con Power BI.",
      imageUrl:
        "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1470&q=80",
      buttonText: t('button.viewTraining'),
      buttonHref: "/corporate-training/powerbi",
      courses: [
        {
          name: "Dashboards y Visualización (Paneles interactivos, medición de KPIs)",
          url: "/corporate-training/powerbi/dashboards-course",
        },
        {
          name: "Introducción a la Analítica de Datos con Power BI (Limpiar, transformar y analizar datos)",
          url: "/corporate-training/powerbi/data-analytics",
        },
      ],
    },
  ];

  return (
    <>
      <AnimatedSection className="py-12 bg-white">
        <div className="container mx-auto px-6">
          {/* Increased spacing below heading to separate it from the cards */}
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
            Formación para Empresas
          </h2>

          {/* Added top margin to grid to create more vertical breathing room */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-6">
            {areas.map((area) => (
              <div key={area.id} className="relative">
                {/* Info button (i) */}
                <button
                  onClick={() => setOpenModal(area.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-primary hover:text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
                  aria-label={`Ver cursos de ${area.title}`}
                >
                  <Info className="w-5 h-5" />
                </button>

                <ContentCard
                  title={area.title}
                  description={area.description}
                  imageUrl={area.imageUrl}
                  buttonText={area.buttonText}
                  buttonHref={area.buttonHref}
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Modal for each area */}
      {areas.map((area) => (
        <Modal
          key={area.id}
          isOpen={openModal === area.id}
          onClose={() => setOpenModal(null)}
          title={`Cursos de ${area.title.split(" ")[2]}`} // Extrae "Desarrollo", "Calidad", "Power BI"
        >
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Estos son los cursos disponibles en esta área de formación:
            </p>
            <ul className="space-y-4">
              {area.courses.map((course, index) => (
                <li key={index}>
                  {/* Now is clickable <a> */}
                  <a
                    href={course.url}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary/10 hover:border-primary border-2 border-transparent transition-all duration-200 group cursor-pointer"
                    onClick={() => setOpenModal(null)} // Close modal on click
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-gray-700 leading-relaxed group-hover:text-primary transition-colors">
                        {course.name}
                      </span>
                      {/* Visual indicator that it's clickable */}
                      <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        →
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      ))}
    </>
  );
};