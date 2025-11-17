import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const HeroCodeScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="hidden lg:flex justify-center items-center">
      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-2xl animate-pulse"></div>

        <div className="relative">
          <div className="relative w-full h-90 rounded-lg bg-slate-900/90 backdrop-blur-md border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(34,211,238,0.5),inset_0_0_30px_rgba(34,211,238,0.2)] overflow-hidden">
            {/* TOP BAR */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-cyan-500/20 to-transparent border-b border-cyan-400/30 flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              </div>

              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                AI_LEARN.exe
              </div>
            </div>

            {/* CODE AREA */}
            <div className="p-8 pt-16 space-y-3 font-mono text-sm">
              <div className="flex gap-2">
                <span className="text-fuchsia-400">const</span>
                <span className="text-cyan-300">learnAI</span>
                <span className="text-slate-400">=</span>
                <span className="text-emerald-400">"intelligent"</span>
              </div>

              <div className="flex gap-2">
                <span className="text-fuchsia-400">function</span>
                <span className="text-yellow-300">detectEmotion</span>
                <span className="text-slate-400">(user) {"{"}</span>
              </div>

              <div className="flex gap-2 pl-6">
                <span className="text-cyan-300">return</span>
                <span className="text-pink-400">AI.analyze</span>
                <span className="text-slate-400">(user)</span>
              </div>

              <div className="text-slate-400">{"}"}</div>

              <div className="mt-4 flex gap-2">
                <span className="text-fuchsia-400">class</span>
                <span className="text-yellow-300">SmartLearning</span>
                <span className="text-slate-400">{"{"}</span>
              </div>

              <div className="flex gap-2 pl-6">
                <span className="text-cyan-300">adapt</span>
                <span className="text-slate-400">() {"{"}</span>
              </div>

              <div className="flex gap-2 pl-12">
                <span className="text-emerald-400">this</span>
                <span className="text-slate-400">.optimize()</span>
              </div>

              <div className="flex gap-2 pl-6">
                <span className="text-slate-400">{"}"}</span>
              </div>

              <div className="text-slate-400">{"}"}</div>
            </div>

            {/* CURSOR */}
            <div className="absolute bottom-8 right-8 w-2 h-5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>

            {/* SCANLINE */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(34,211,238,0.03)_50%)] bg-size-[100%_4px] pointer-events-none"></div>
          </div>

          {/* CORNERS */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCodeScreen;
