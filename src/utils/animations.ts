import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5 
    }
  }
};

export const staggerChildren: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    scale: 0.9,
    opacity: 0 
  },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    x: -100,
    opacity: 0 
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    x: 100,
    opacity: 0 
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

// Animation utility for gradient backgrounds
export const gradientAnimation = {
  backgroundSize: "200% 200%",
  animation: "gradient 15s ease infinite",
  "@keyframes gradient": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
}; 