import React from "react";
// import Top from "../../components/top/Top";
// import Courses from "../../components/courses/Courses";
import FrontSection from "../../components/frontSection/FrontSection";
import MiddleSection from "../../components/middleSection/MiddleSection";
import LastSection from "../../components/lastSection/LastSection.jsx";
import Footer from "../../components/footer/Footer";
import "./home.scss";
// import { useEffect, useState } from "react";
// import axios from "axios";

const Home = () => {
  return (
    <>
      <FrontSection />
      <MiddleSection />
      <LastSection />
      <Footer />
    </>
  );
};

export default Home;
