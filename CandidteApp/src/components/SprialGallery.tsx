import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/logo1.png',
  '/logo2.png',
  '/logo3.png',
];

const spiralVariants = {
  initial: { opacity: 0, rotate: -180, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { opacity: 0, rotate: 180, scale: 0.5, transition: { duration: 0.8, ease: 'easeIn' } },
};

const SpiralGallery = () => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="gallery-container" onClick={nextImage}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          variants={spiralVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="gallery-image"
        />
      </AnimatePresence>
    </div>
  );
};

export default SpiralGallery;
