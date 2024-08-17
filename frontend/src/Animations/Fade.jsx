import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
const Fade = ({ className, delay, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hidden, setHidden] = useState({});
  const [visible, setVisible] = useState({ x: "0%" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);
  return (
    <motion.div
      ref={ref}
      className={`${className ? className : ""}`}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.8, delay: delay || 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Fade;
