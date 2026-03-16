import React from "react";
import { User, CheckCircle, Calendar, Clock, Globe } from "lucide-react";

export interface Instructor {
  name: string;
  title: string;
  description: string;
  certifications: string[];
  experience: string;
  image?: string;
}

export interface GenericItem {
  icon: string;
  label: string;
  value: string;
}

interface InstructorCardProps {
  instructor?: Instructor | null; // Cambiado para aceptar null
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  items?: GenericItem[];
  footer?: {
    label: string;
    value: string;
    subValue?: string;
    discountText?: string;
  };
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Clock,
  Globe,
  User,
  CheckCircle,
};

export const InstructorCard = ({
  instructor,
  title,
  subtitle,
  description,
  image,
  items,
  footer,
  className = "",
}: InstructorCardProps) => {
  // SI NO HAY INSTRUCTOR NI TITULO (tarjeta vacía), NO PINTAMOS NADA
  if (!instructor && !title) return null;

  // MODO INSTRUCTOR (Página individual del curso)
  if (instructor) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 ${className}`}
      >
        <h3 className="text-xl text-center font-bold text-slate-800 mb-6">
          {instructor.name}
        </h3>

        <div className="bg-white text-center mb-6">
          {instructor.image ? (
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
          <h4 className="font-bold text-slate-800 text-lg mb-1">
            {instructor.title}
          </h4>
          {instructor.experience && (
            <p className="text-sm font-medium text-slate-500">
              {instructor.experience}
            </p>
          )}
        </div>

        {instructor.description && (
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {instructor.description}
          </p>
        )}

        {instructor.certifications && instructor.certifications.length > 0 && (
          <div className="space-y-3">
            {instructor.certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-3">
                {/* AQUI ESTÁ LA MAGIA: flex-shrink-0 y mt-0.5 para alinear con la primera línea */}
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-snug">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // MODO GENÉRICO (Página de Inscripción)
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-24 ${className}`}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:shadow-2xl hover:scale-105 transition-all duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        {subtitle && (
          <p className="text-sm font-medium text-slate-600 mb-2">{subtitle}</p>
        )}
        {description && (
          <p className="text-sm text-slate-600 mb-6">{description}</p>
        )}

        {items && (
          <div className="space-y-4 mb-6">
            {items.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Calendar;
              return (
                <div key={index} className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-slate-700">
                      {item.label}:{" "}
                    </span>
                    <span className="text-sm text-slate-600">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {footer && (
          <div className="border-t border-gray-200 pt-4 flex flex-col items-center">
            <p className="text-sm text-slate-600 text-center mb-1">
              {footer.label}
            </p>
            <p className="text-3xl font-bold text-slate-800 text-center">
              {footer.value}
            </p>
            {footer.subValue && (
              <p className="text-xs text-slate-500 font-medium text-center mt-1">
                {footer.subValue}
              </p>
            )}
            {footer.discountText && (
              <p className="text-xs font-bold text-green-600 text-center mt-4">
                {footer.discountText}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
