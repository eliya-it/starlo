export const PageVariants = {
  hidden: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    y: "100vh",
  },
};
