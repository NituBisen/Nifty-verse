import React from "react";
import Navbar from "../common/Navbar";
import Connect from "../connectwallet/Connect";
import Footer from "../common/Footer";

const Connectwallet = () => {
  return (
    <div className="min-h-screen w-full bg-[#000000]">
        <Navbar />
      <Connect />
      <Footer />
    </div>
  );
};

export default Connectwallet;