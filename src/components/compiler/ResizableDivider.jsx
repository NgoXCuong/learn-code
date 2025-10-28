import React, { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";

export default function ResizableDivider({
  onResize,
  orientation = "vertical",
  isDark,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      onResize(e);
    };
    const handleMouseUp = () => setIsDragging(false);

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      onResize(e.touches[0]);
    };
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, onResize]);

  return (
    <div
      className={`group relative flex items-center justify-center select-none transition-all
        ${
          orientation === "vertical"
            ? "w-1 cursor-col-resize hover:w-1.5"
            : "h-1 cursor-row-resize hover:h-1.5"
        }
        ${
          isDark
            ? "bg-gray-800 hover:bg-indigo-600"
            : "bg-gray-200 hover:bg-indigo-500"
        }
        ${
          isDragging
            ? "bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.7)]"
            : ""
        }`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className={`absolute transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none
          ${
            orientation === "vertical"
              ? "left-1/2 -translate-x-1/2"
              : "top-1/2 -translate-y-1/2"
          }
          ${isDark ? "text-gray-600" : "text-gray-400"}`}
      >
        <GripVertical
          className={
            orientation === "vertical" ? "w-4 h-4" : "w-4 h-4 rotate-90"
          }
        />
      </div>
    </div>
  );
}
