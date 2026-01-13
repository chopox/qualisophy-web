import { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Code,
  Database,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: string[];
  icon: string;
}

const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Code,
    Database,
    Zap,
  };
  return iconMap[iconName] || BookOpen;
};

interface CourseItineraryProps {
  modules: Module[];
  className?: string;
}

export const CourseModule = ({
  module,
  isExpanded,
  onToggle,
}: {
  module: Module;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const IconComponent = getIconComponent(module.icon);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center size-10 bg-primary rounded-lg text-white font-bold text-lg flex-shrink-0">
            {module.number}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800 text-sm">
                MÓDULO {module.number}
              </h3>
              <p className="text-slate-600 font-semibold text-sm">
                {module.title}
              </p>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-500 ease-in-out flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-800 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-slate-700 mt-4 mb-3">{module.description}</p>
          <ul className="space-y-2 mb-2">
            {module.topics.map((topic, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-600 text-sm leading-relaxed">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const CourseItinerary = ({
  modules,
  className = "",
}: CourseItineraryProps) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([])
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className={className}>
      <div className="bg-white space-y-4">
        {modules.map((module) => (
          <CourseModule
            key={module.id}
            module={module}
            isExpanded={expandedModules.has(module.id)}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </div>
    </div>
  );
};
