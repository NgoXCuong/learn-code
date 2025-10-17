import React from "react";
import Header from "../components/layout/Header";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col bg-gradient-to-br 
      from-indigo-50 via-white to-cyan-50 
      dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 
      transition-colors duration-500"
    >
      {/* 🔹 Header cố định nhẹ */}
      <Header />

      <main className="flex-grow overflow-hidden">
        {/* Hero + Feature liền khối */}
        <section className="relative">
          <HeroSection />
          <FeatureSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
