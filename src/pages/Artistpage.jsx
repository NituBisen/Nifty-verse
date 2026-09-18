import React from "react";
import Navbar from "../common/Navbar";
import Artist from "../artistpage/Artist";
import Footer from "../common/Footer";

const Artistpage = () => {
  return (
    <div className="min-h-screen w-full bg-[#000000]">
        <Navbar />
      <Artist />
      <Footer />
    </div>
  );
};

export default Artistpage;