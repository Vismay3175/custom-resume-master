
import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimatedContainerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fade' | 'slide' | 'scale' | 'bounce';
};

const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slide: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  scale: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  bounce: {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }
};

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.5,
  variant = 'fade'
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      transition={{ 
        duration: duration, 
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
