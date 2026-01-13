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

const QACoursesList: React.FC = () => {
  const t = useTranslations();
  const courses: Course[] = [
    {
      id: "automation",
      title: "Automatización de Pruebas",
      description:
        "Domina Selenium, Cypress y Playwright para automatizar pruebas funcionales y E2E.",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/qa/automation-course",
    },
    {
      id: "devops",
      title: "DevOps para QA",
      description:
        "Integra testing en pipelines CI/CD con Jenkins, Docker y GitHub Actions.",
      imageUrl:
        "https://media.istockphoto.com/id/1309642115/es/foto/concepto-devops.webp?a=1&b=1&s=612x612&w=0&k=20&c=bYiNrKpJKZ6Myf1YGlhqCK-n6bRMPvBt4i_0-CmrDYw=",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/qa/devops",
    },
    {
      id: "quality",
      title: "Gestión de Calidad del Software",
      description:
        "Planifica estrategias QA, define KPIs y mejora la calidad del ciclo de vida del software.",
      imageUrl:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/qa/quality-management",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        {/* Standardized to max-w-7xl */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

export default QACoursesList;
