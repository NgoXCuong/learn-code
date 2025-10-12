import React from "react";

export default function ProfileHero({ user }) {
  return (
    <div className="relative w-full bg-dark">
      {/* Ảnh nền */}
      <div className="w-full h-20 md:h-30 overflow-hidden relative">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Lớp phủ mờ nhẹ */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Thông tin người dùng */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 md:-mt-20">
          {/* Avatar + Tên + Bio */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />

            {/* Thông tin bên phải avatar */}
            <div>
              <h2 className="text-2xl md:text-3xl mt-15 font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
