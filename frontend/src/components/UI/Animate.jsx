import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Animate = ({ children, visible, hidden, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);
  return (
    <motion.div
      className={className ? className : ""}
      ref={ref}
      variants={{
        hidden: hidden,
        visible: visible,
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
