import React from "react";
import { ContentCard } from "@/components/react/shared/ContentCard";
import { useTranslations } from "@/hooks/useTranslations";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
}

const PowerBiCoursesList: React.FC = () => {
  const t = useTranslations();
  const courses: Course[] = [
    {
      id: "dashboards",
      title: "Dashboards y Visualización",
      description:
        "Crea paneles interactivos, mide KPIs y presenta datos de forma clara y efectiva con Power BI.",
      imageUrl:
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/powerbi/dashboards-course",
    },
    {
      id: "data-analytics",
      title: "Introducción a la Analítica de Datos con Power BI",
      description:
        "Aprende a limpiar, transformar y analizar datos para tomar decisiones basadas en evidencia.",
      imageUrl:
        "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/powerbi/data-analytics",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-center">
          {courses.map((course) => (
            <ContentCard
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              buttonText={course.buttonText}
              buttonHref={course.buttonHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerBiCoursesList;
