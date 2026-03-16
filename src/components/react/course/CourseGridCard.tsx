import React from "react";

interface CourseGridCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  level?: "Principiante" | "Intermedio" | "Avanzado";
  duration?: string;
  modality?: "Online" | "Presencial" | "Híbrido";
  category?: string;
}

export const CourseGridCard: React.FC<CourseGridCardProps> = ({
  title,
  description,
  imageSrc,
  href,
  level = "Intermedio",
  duration = "40h",
  modality = "Online",
  category,
}) => {
  return (
    <a
      href={href}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

        {category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {category}
          </span>
        )}

        <span
          className={`absolute bottom-4 right-4 text-xs font-bold px-3 py-1 rounded-lg text-white shadow-sm 
          ${level === "Principiante" ? "bg-emerald-500" : level === "Intermedio" ? "bg-amber-500" : "bg-primary"}`}
        >
          {level}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Título SIN line-clamp */}
        <h3 className="text-xl font-bold font-heading text-secondary mb-3 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>

        {/* Descripción SIN line-clamp para que quepa todo */}
        <p className="text-gray-500 font-primary text-sm mb-6 flex-1 leading-relaxed">
          {description}
        </p>

        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg text-primary">
                schedule
              </span>
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg text-primary">
                wifi
              </span>
              <span>{modality}</span>
            </div>

            <div className="flex items-center gap-1 text-secondary font-bold group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
              Ver
              <span className="material-symbols-outlined text-sm">
                arrow_forward_ios
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
