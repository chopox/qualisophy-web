import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";

interface EnrollButtonProps {
  courseId: string;
  courseName: string;
  isComingSoon?: boolean; // NUEVO: Prop para saber si está disponible
}

export const EnrollButton = ({
  courseId,
  courseName,
  isComingSoon = false,
}: EnrollButtonProps) => {
  const [bottomOffset, setBottomOffset] = useState<number>(32);

  useEffect(() => {
    const handleScroll = () => {
      const footer =
        document.querySelector("footer") || document.querySelector(".footer");

      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const overlap = windowHeight - footerRect.top;

      const safeBottom = overlap > 0 ? overlap + 32 : 32;
      setBottomOffset(safeBottom);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = () => {
    // Si está "Próximamente", no hace nada. Si no, lleva al formulario.
    if (!isComingSoon && typeof window !== "undefined") {
      window.location.href = `/course-enrollment?course=${courseId}`;
    }
  };

  const t = useTranslations();

  return (
    <motion.button
      onClick={handleClick}
      disabled={isComingSoon}
      title={isComingSoon ? "Próximamente" : `Inscribirse en ${courseName}`}
      animate={{ bottom: bottomOffset }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`fixed left-4 lg:left-auto lg:right-24 px-5 lg:px-6 h-12 lg:h-14 rounded-full shadow-lg flex items-center justify-center text-xs lg:text-sm font-semibold z-40 transition-colors duration-200 
        ${
          isComingSoon
            ? "bg-slate-400 text-white cursor-not-allowed opacity-80" // Estilo deshabilitado
            : "bg-[#16223f] hover:bg-primary text-white cursor-pointer" // Estilo normal
        }
      `}
    >
      {isComingSoon ? "Próximamente" : t("button.enroll")}
    </motion.button>
  );
};
