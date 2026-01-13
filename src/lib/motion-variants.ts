import type { Variants } from "framer-motion";

/**
 * Standard variant for a 'fade in' upward effect.
 * Used for most sections upon scrolling.
 */
export const fadeInUp: Variants = {
  /** The hidden state, before it enters the viewport */
  hidden: {
    opacity: 0,
    y: 30, // Start 30px lower
  },
  /** The visible state, when it enters the viewport */
  visible: {
    opacity: 1,
    y: 0, // Returns to its original position
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
