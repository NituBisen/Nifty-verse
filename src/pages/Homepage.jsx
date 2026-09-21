import React from "react";
import Navbar from "../common/Navbar";
import Hero from "../homepage/Hero";
import Footer from "../common/Footer";

const Homepage = () => {
  return (
    <main className="overflow-x-hidden min-h-screen w-full bg-[#000000]">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
};

export default Homepage;