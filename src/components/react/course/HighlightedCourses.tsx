import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { ContentCard } from "@/components/react/shared/ContentCard";
import { useTranslations } from "@/hooks/useTranslations";

interface Course {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
}
export const HighlightedCourses: React.FC = () => {
const t = useTranslations();

const courses: Course[] = [

  {
    id: "testing-calidad",
    title: "Testing y Calidad del Software",
    description:
      "Domina los conceptos, metodologías y herramientas de testing profesional.",
    buttonText: t("button.viewCourse"),
    buttonHref: "/learning/software-quality-testing-course",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1080&q=80",
  },
  {
    id: "bdd-automatizacion",
    title: "BDD y Automatización E2E",
    description:
      "Aprende a definir pruebas automatizadas con Cucumber, Gherkin y Cypress.",
    buttonText: t("button.viewCourse"),
    buttonHref: "/learning/bdd-automation-e2e-course",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1080&q=80",
  },
  {
    id: "devops-testers",
    title: "Coding and DevOps for Testers",
    description:
      "Obtén las skills de desarrollo para dar el salto a la automatización y CI/CD.",
    buttonText: t("button.viewCourse"),
    buttonHref: "/learning/devops-for-testers-course",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1471&q=80",
  },
];


  return (
    <AnimatedSection>
      <h2 className="font-heading text-4xl font-bold text-secondary-DEFAULT text-center mb-16">
        Nuestros Cursos Destacados
      </h2>
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
    </AnimatedSection>
  );
};
