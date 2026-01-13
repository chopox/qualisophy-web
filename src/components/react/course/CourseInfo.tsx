import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/react/shared/Button";
import { useTranslations } from "@/hooks/useTranslations";

export interface CourseDetails {
  startDate: string;
  duration: string;
  schedule: string;
  regularPrice: string;
  earlyBirdPrice: string;
}

interface CourseInfoProps {
  courseDetails: CourseDetails;
  courseId?: string;
  className?: string;
}

export const CourseInfoBar = ({
  icon,
  text,
  className = "",
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
}) => (
  <div
    className={`rounded-lg py-3 px-3 md:px-5 flex items-center space-x-3 text-white ${className}`}
  >
    {icon}
    <span className="font-semibold text-xs xl:text-sm 2xl:text-base">
      {text}
    </span>
  </div>
);

export const CourseInfo = ({
  courseDetails,
  courseId,
  className = "",
}: CourseInfoProps) => {
  const t = useTranslations()
  return (
    <div className="bg-white">
      {/* Course Info Bars */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
        <CourseInfoBar
          className="bg-primary"
          icon={<Calendar className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />}
          text={`Inicio: ${courseDetails.startDate}`}
        />
        <CourseInfoBar
          className="bg-secondary"
          icon={<Clock className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />}
          text={`Horario: ${courseDetails.schedule}`}
        />
      </div>

      {/* Course Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Detalles del Curso
        </h2>
        <div className="space-y-3">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <span className="text-slate-600 text-sm font-medium">Inicio:</span>
            <span className="font-semibold text-slate-800 text-sm">
              {courseDetails.startDate}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <span className="text-slate-600 text-sm font-medium">
              Duración:
            </span>
            <span className="font-semibold text-slate-800 text-sm">
              {courseDetails.duration}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <span className="text-slate-600 text-sm font-medium">Horario:</span>
            <span className="font-semibold text-slate-800 text-sm">
              {courseDetails.schedule}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <span className="text-slate-600 text-sm font-medium">Coste:</span>
            <span className="font-semibold text-slate-800 text-sm">
              {courseDetails.regularPrice}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <span className="text-slate-600 text-sm font-medium">
              Inscripción anticipada:
            </span>
            <span className="font-semibold text-green-700 text-sm">
              {courseDetails.earlyBirdPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Inscription Button */}
      {courseId && (
        <div className="flex justify-center mt-6">
          <a href={`/course-enrollment?course=${courseId}`}>
            <Button variant="primary" size="md">
              {t('button.enroll')}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};
