import React, { useContext } from "react";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-700 bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Section */}

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-base text-black dark:text-gray-200 gap-3">
          <p className="flex items-center gap-1 font-exo">
            © 2025{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              CodePulse
            </span>
            . Made with
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />{" "}
            for developers.
          </p>

          <div className="flex items-center gap-1 text-black dark:text-gray-200">
            <Sparkles className="w-3 h-3 text-yellow-500 font-exo" />
            <span>Nghiên cứu khoa học 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
