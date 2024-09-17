"use client";

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlurFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, filter: 'blur(0px)' });
    } else {
      controls.start({ opacity: 0, filter: 'blur(10px)' });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={controls}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
