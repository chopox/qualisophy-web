import { User, CheckCircle, Calendar, Clock, Globe } from "lucide-react";

export interface Instructor {
  name: string;
  title: string;
  description: string;
  certifications: string[];
  experience: string;
}

export interface GenericItem {
  icon: string; // Changed from LucideIcon to string
  label: string;
  value: string;
}

interface InstructorCardProps {
  // For instructors
  instructor?: Instructor;
  // For generic use (courses, etc.)
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  items?: GenericItem[];
  footer?: {
    label: string;
    value: string;
  };
  className?: string;
}

// Icon mapping
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
  // If instructor prop is provided, use instructor mode
  if (instructor) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}
      >
        <h3 className="text-lg text-center font-bold text-slate-800 mb-4">
          {instructor.name}
        </h3>
        <div className="bg-white text-center mb-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 flex-shrink-0">
            <User className="w-10 h-10 text-white flex-shrink-0" />
          </div>
          <h4 className="font-semibold text-slate-800">{instructor.title}</h4>
          <p className="text-sm text-slate-600">{instructor.experience}</p>
        </div>
        <p className="text-slate-700 text-sm mb-4">{instructor.description}</p>
        <div className="space-y-2">
          {instructor.certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-slate-600">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Generic mode for courses, etc.
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
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-slate-600 text-center mb-1">
              {footer.label}
            </p>
            <p className="text-3xl font-bold text-slate-800 text-center">
              {footer.value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
