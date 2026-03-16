import {
  InstructorCard,
  type Instructor,
} from "@/components/react/course/InstructorCard";
import {
  CourseInfo,
  type CourseDetails,
} from "@/components/react/course/CourseInfo";
import {
  CourseItinerary,
  type Module,
} from "@/components/react/course/CourseItinerary";
import { useTranslations } from "@/hooks/useTranslations";

export interface CourseProps {
  modules: Module[];
  instructor?: Instructor | null; // Ahora es opcional
  courseDetails: CourseDetails;
  courseId?: string;
  className?: string;
  courseDescription?: string;
  prerequisites?: string;
}

export const Course = ({
  modules,
  instructor,
  courseDetails,
  courseId,
  className = "",
  courseDescription,
  prerequisites,
}: CourseProps) => {
  const t = useTranslations();

  // LOGICA: Si hay instructor usamos 3 columnas (2 izq, 1 der). Si NO hay, usamos 1 sola columna que ocupe todo.
  const gridClass = instructor
    ? "grid lg:grid-cols-3 gap-8"
    : "flex flex-col gap-8 max-w-4xl mx-auto";
  const leftColumnClass = instructor
    ? "bg-white lg:col-span-2 space-y-6"
    : "bg-white w-full space-y-6";

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className={gridClass}>
        {/* Columna Izquierda (o central si no hay instructor) - Módulos e Info */}
        <div className={leftColumnClass}>
          <CourseInfo courseDetails={courseDetails} courseId={courseId} />

          {courseDescription && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
              <p className="text-slate-700 text-base leading-relaxed">
                {courseDescription}
              </p>
            </div>
          )}

          <CourseItinerary modules={modules} />

          {prerequisites && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                Requisitos previos
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                {prerequisites}
              </p>
            </div>
          )}
        </div>

        {/* Columna Derecha - Instructor y FAQ (Solo se pinta si hay instructor) */}
        {instructor && (
          <div className="bg-white space-y-6">
            <InstructorCard instructor={instructor} />

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2">
                {t("course.faq.title")}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {t("course.faq.description")}
              </p>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#16223f] hover:bg-primary transition-colors w-full"
              >
                {t("course.faq.button")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export type { Module, Instructor, CourseDetails };
