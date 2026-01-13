import React from "react";
import { Button } from "@/components/react/shared/Button";

interface CourseCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface CorporateCoursesListProps {
  courses: CourseCard[];
  areaTitle: string;
}

export const CorporateCoursesList: React.FC<CorporateCoursesListProps> = ({
  courses,
  areaTitle,
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">
          {areaTitle}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col overflow-hidden rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {course.description}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => (window.location.href = course.link)}
                >
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};