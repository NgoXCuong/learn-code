import React, { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const AnimatedParticles = () => {
  const { theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        color:
          theme === "dark"
            ? Math.random() > 0.5
              ? "rgba(168, 85, 247, 0.8)"
              : "rgba(34, 211, 238, 0.8)"
            : Math.random() > 0.5
            ? "rgba(147, 51, 234, 0.6)"
            : "rgba(6, 182, 212, 0.6)",
      });
    }

    function animate() {
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(15, 23, 42, 0.05)"
          : "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default AnimatedParticles;
