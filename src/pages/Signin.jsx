import React from "react";
import Navbar from "../common/Navbar";
import Signin from "../signin/Signin";
import Footer from "../common/Footer";

const Signin = () => {
  return (
    <div className="min-h-screen w-full bg-[#2B2B2B]">
      < Navbar />
      <Signin />
      <Footer />
    </div>
  );
};

export default Signin;