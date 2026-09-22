import React from "react";
import Navbar from "../common/Navbar";
import Ranking from "../rankingpage/Ranking";
import Footer from "../common/Footer";

const RankingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#000000]">
      <Navbar />
      <Ranking />
      <Footer />
    </div>
  );
};

export default RankingPage;