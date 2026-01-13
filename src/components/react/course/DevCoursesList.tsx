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

const DevCoursesList: React.FC = () => {
  const t = useTranslations();
  const courses: Course[] = [
    {
      id: "frontend",
      title: "Frontend Moderno",
      description:
        "React, Angular, TypeScript y TailwindCSS. Interfaces accesibles y mantenibles.",
      imageUrl:
        "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/dev/frontend-course",
    },
    {
      id: "backend",
      title: "Backend Escalable",
      description:
        "APIs robustas, arquitectura, bases de datos SQL/NoSQL y mejores prácticas.",
      imageUrl:
        "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/dev/backend-course",
    },
    {
      id: "fullstack",
      title: "Full Stack Development",
      description:
        "Ciclo completo: frontend + backend + CI/CD con proyectos reales.",
      imageUrl:
        "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=1470&q=80",
      buttonText: t("button.viewCourse"),
      buttonHref: "/corporate-training/dev/fullstack-course",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
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

export default DevCoursesList;
