import React from "react";
import HeroContent from "./HeroContent";
import HeroCodeScreen from "./HeroCodeScreen";
import LanguageScroll from "./LanguageScroll";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden h-full flex items-center transition-colors duration-500 py-20  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroCodeScreen />
        </div>
        <LanguageScroll />
      </div>
    </section>
  );
};

export default HeroSection;
