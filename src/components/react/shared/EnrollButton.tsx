// src/components/react/shared/EnrollButton.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";

interface EnrollButtonProps {
  courseId: string;
  courseName: string;
}

export const EnrollButton = ({ courseId, courseName }: EnrollButtonProps) => {
  const [bottomOffset, setBottomOffset] = useState<number>(40);

  useEffect(() => {
    const handleScroll = () => {
      const footer =
        document.querySelector("footer") || document.querySelector(".footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const overlap = windowHeight - footerRect.top;

      const safeBottom = overlap > 0 ? overlap + 40 : 40; // +40px de margen
      setBottomOffset(safeBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = `/course-enrollment?course=${courseId}`;
    }
  };

  const t = useTranslations();

  return (
    <motion.button
      onClick={handleClick}
      title={`Inscribirse en ${courseName}`}
      animate={{ bottom: bottomOffset }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed right-24 bg-[#16223f] hover:bg-primary text-white px-4 h-14 rounded-full shadow-lg flex items-center justify-center text-sm font-semibold z-50 transition-colors duration-200"
    >
      {t('button.enroll')}
    </motion.button>
  );
};
