import React from "react";
import Header from "../components/layout/Header";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeatureSection";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors"
    >
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
