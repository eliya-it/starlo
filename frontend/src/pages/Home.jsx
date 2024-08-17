import React from "react";
import Header from "../components/Header";
import Sections from "../components/Sections/Sections";
import { motion } from "framer-motion";
import { PageVariants } from "../utils/variants";
import PageTransition from "../components/Containers/PageTransition";
const Home = () => {
  return (
    <PageTransition>
      <Header />
      <Sections />
    </PageTransition>
  );
};

export default Home;
