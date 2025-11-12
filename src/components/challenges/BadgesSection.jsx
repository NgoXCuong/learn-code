// import React, { useState } from "react";
// import { Award, ChevronDown, ChevronUp } from "lucide-react";

// export const BadgesSection = ({ badges }) => {
//   const [expanded, setExpanded] = useState(false);
//   const displayBadges = expanded ? badges : badges.slice(0, 3);

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//       <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
//         <Award className="w-5 h-5 text-yellow-500" />
//         Huy hiệu ({badges.filter((b) => b.unlocked).length}/{badges.length})
//       </h3>

//       <div className="grid grid-cols-3 gap-4 mb-4">
//         {displayBadges.map((badge) => (
//           <div
//             key={badge.id}
//             className={`relative group flex flex-col items-center justify-center rounded-lg p-2 border ${
//               badge.unlocked
//                 ? "border-gray-300 dark:border-gray-600"
//                 : "border-gray-200 dark:border-gray-800 opacity-50"
//             } transition-transform hover:scale-105`}
//           >
//             <div
//               className={`text-3xl ${
//                 badge.unlocked
//                   ? "text-gray-800 dark:text-gray-200"
//                   : "grayscale"
//               }`}
//             >
//               {badge.icon}
//             </div>
//             <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2 font-medium">
//               {badge.name}
//             </p>

//             {!badge.unlocked && (
//               <div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-400 dark:text-gray-600">
//                 🔒
//               </div>
//             )}

//             {/* Tooltip mô tả */}
//             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 whitespace-nowrap z-10">
//               {badge.description}
//             </div>
//           </div>
//         ))}
//       </div>

//       {badges.length > 3 && (
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="w-full text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-1"
//         >
//           {expanded ? (
//             <>
//               Ẩn bớt <ChevronUp className="w-4 h-4" />
//             </>
//           ) : (
//             <>
//               Xem thêm <ChevronDown className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };
