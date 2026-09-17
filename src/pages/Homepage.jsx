import React from "react";
import Navbar from "../common/Navbar";
import Hero from "../homepage/Hero";

const Homepage = () => {
  return (
    <main className="overflow-x-hidden min-h-screen w-full bg-[#2B2B2B]">
      <Navbar />
      <Hero />
    </main>
  );
};

export default Homepage;