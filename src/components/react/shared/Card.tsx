import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hoverEffect?: boolean;
  gradient?: string;
  icon?: ReactNode;
}

export const Card = ({
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  icon,
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg  transition-all duration-300 overflow-hidden group flex flex-col h-full   ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon && (
        <div
          className={`h-32 flex items-center justify-center relative overflow-hidden`}
        >
          <div className="text-white text-3xl opacity-90 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-0 group-hover:opacity-10"></div>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between flex-grow">
        {children}
      </div>
    </div>
  );
};
