import React from "react";
import Navbar from "../common/Navbar";
import Create from "../createaccount/Create";
import Footer from "../common/Footer";

const Createaccount = () => {
  return (
    <div className="min-h-screen w-full bg-[#2B2B2B]">
      < Navbar />
      <Create />
      <Footer />
    </div>
  );
};

export default Createaccount;