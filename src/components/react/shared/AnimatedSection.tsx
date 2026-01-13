import React from "react";
import { motion, type ViewportOptions } from "framer-motion";
import { fadeInUp } from "@/lib/motion-variants"; // Importamos nuestra variante

interface Props {
  children: React.ReactNode;
  className?: string;

  amount?: number;
}

export const AnimatedSection: React.FC<Props> = ({
  children,
  className,
  amount = 0.2,
}) => {
  const viewportConfig: ViewportOptions = {
    once: true,
    amount: amount,
  };

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {children}
    </motion.div>
  );
};
