import React from "react";
import { motion } from "framer-motion";
import { PageVariants } from "../../utils/variants";
const PageTransition = ({ children, initial }) => {
  return (
    <motion.div
      variants={PageVariants}
      initial={"hidden"}
      animate="visible"
      viewport={{ once: true }}
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
