import React from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Background Sphere Grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 block dark:hidden"
          style={{
            backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
        `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
        `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
      </div>

      {/* Content */}
      <Header />
      <main className="grow overflow-hidden relative z-10">
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
