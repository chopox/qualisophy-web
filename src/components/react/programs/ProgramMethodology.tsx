import React from "react";

interface MethodologyProps {
  title: string;
  description: string[];
  checks: string[];
  imageSrc: string;
}

export const ProgramMethodology: React.FC<MethodologyProps> = ({
  title,
  description,
  checks,
  imageSrc,
}) => {
  return (
    <section className="px-6 py-16 lg:px-12 lg:py-24 flex justify-center bg-white w-full">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Image Side */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 relative group">
            <img
              src={imageSrc}
              alt="Methodology representation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-secondary text-3xl font-bold leading-tight md:text-4xl lg:text-5xl font-heading">
              {title}
            </h2>
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 text-lg lg:text-xl font-normal leading-relaxed font-primary"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">
                  check_circle
                </span>
                <span className="text-secondary text-lg font-medium font-primary">
                  {check}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
