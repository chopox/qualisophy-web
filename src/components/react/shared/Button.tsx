import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  href,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg focus:ring-primary",
    secondary:
      "bg-secondary hover:bg-secondary/90 text-white shadow-md hover:shadow-lg focus:ring-secondary",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost:
      "bg-transparent text-secondary hover:bg-secondary/10 focus:ring-secondary",
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-sm min-h-[44px] min-w-[44px]",
    md: "px-8 py-4 text-sm min-h-[48px] min-w-[48px]",
    lg: "px-12 py-6 text-base min-h-[56px] min-w-[56px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};
