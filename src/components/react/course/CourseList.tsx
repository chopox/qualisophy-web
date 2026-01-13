import React from "react";
import { ContentCard } from "@/components/react/shared/ContentCard";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { useTranslations } from "@/hooks/useTranslations";

interface CourseCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
}

const CourseList: React.FC = () => {
  const t = useTranslations();
  const courses: CourseCardData[] = [
    {
      id: "software-quality-testing",
      title: "Testing y Calidad del Software",
      description:
        "Aprende metodologías y herramientas de testing profesional. Ideal para quienes buscan dominar QA de forma práctica.",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1471&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/learning/software-quality-testing-course",
    },
    {
      id: "bdd-automation",
      title: "BDD y Automatización E2E",
      description:
        "Diseña y ejecuta pruebas automatizadas con Cucumber, Gherkin y Cypress. Integra BDD en flujos CI/CD.",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1471&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/learning/bdd-automation-e2e-course",
    },
    {
      id: "devops-for-testers",
      title: "Coding and DevOps for Testers",
      description:
        "Domina JavaScript, Git y CI/CD para dar el salto al desarrollo y la automatización avanzada.",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1471&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/learning/devops-for-testers-course",
    },
  ];

  return (
    
    <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
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
    </AnimatedSection>
  );
};

export default CourseList;
