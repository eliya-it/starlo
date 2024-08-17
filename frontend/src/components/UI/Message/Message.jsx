import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messageVariants = {
  hidden: {
    y: "-40vh",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    y: "-40vh",
  },
};
const Message = ({ text, status = "success" }) => {
  const [show, setShow] = useState(true);
  const hideMessage = (e) => setShow(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [text]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`message message--${status}`}
          onClick={hideMessage}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
