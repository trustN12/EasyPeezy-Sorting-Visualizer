// PageTransition.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const PageTransition = ({ children }) => (
  <AnimatePresence>
    <motion.div
      key={children.key}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
