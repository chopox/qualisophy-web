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
  instructor: Instructor;
  courseDetails: CourseDetails;
  courseId?: string;
  className?: string;
  courseDescription?: string; // NUEVO
  prerequisites?: string; // NUEVO
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
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Course Modules & Info */}
        <div className="bg-white lg:col-span-2 space-y-6">
          <CourseInfo courseDetails={courseDetails} courseId={courseId} />

          {/* NUEVO: Descripción del curso (Sin título, como pediste) */}
          {courseDescription && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
              <p className="text-slate-700 text-base leading-relaxed">
                {courseDescription}
              </p>
            </div>
          )}

          <CourseItinerary modules={modules} />

          {/* NUEVO: Requisitos Previos (Debajo de los módulos) */}
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

        {/* Right Column - Instructor */}
        <div className="bg-white space-y-6">
          <InstructorCard instructor={instructor} />

          {/* FAQ */}
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
      </div>
    </div>
  );
};

export type { Module, Instructor, CourseDetails };
