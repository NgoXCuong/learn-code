import React from "react";

export default function HeaderSection() {
  return (
    <div className="mb-12 text-center relative pt-8 pb-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
      <h1 className="text-4xl md:text-5xl font-bold pb-2 leading-tight tracking-tight bg-linear-to-r from-gray-900 via-indigo-950 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
        Bảng Xếp Hạng
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
        Nơi hội tụ những chiến binh xuất sắc nhất. Hãy cùng chinh phục những thử thách và ghi danh vào lịch sử CodePulse.
      </p>
    </div>
  );
}
