import React, { useState } from "react";
import { Edit2, User, Camera, Award, Flame, TrendingUp } from "lucide-react";

export default function ProfileSidebar({ user, darkMode, achievements = [] }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [cover, setCover] = useState(user.cover);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      toast("Đã đổi ảnh đại diện!");
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
      toast("Đã đổi ảnh bìa!");
    }
  };

  const xpProgress = (user.xp / user.nextLevelXp) * 100;

  return (
    <div className="min-h-screen   ">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          {toastMessage}
        </div>
      )}

      <div className="max-w-md mx-auto hover:shadow-2xl shadow-xl rounded-lg">
        <div
          className={`${
            darkMode
              ? "bg-linear-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50"
              : "bg-white border-gray-200"
          } backdrop-blur-xl border rounded-lg overflow-hidden shadow-2xl`}
        >
          {/* Cover */}
          <div className="relative h-40 overflow-hidden group">
            <img
              src={cover}
              alt="cover"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60"></div>

            <label className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Camera size={16} />
              <span className="text-sm font-medium">Đổi ảnh bìa</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="relative flex justify-center -mt-16 mb-4">
              <div className="relative group">
                <div
                  className={`w-32 h-32 rounded-full border-4 ${
                    darkMode ? "border-slate-800" : "border-white"
                  } overflow-hidden shadow-2xl ring-4 ring-blue-500/20`}
                >
                  {avatar ? (
                    <img src={avatar} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="text-white w-16 h-16" />
                    </div>
                  )}
                </div>

                <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110">
                  <Edit2 size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-6">
              {editingName ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => {
                    setEditingName(false);
                    if (name !== user.name) toast("Đã lưu tên mới!");
                  }}
                  autoFocus
                  className={`text-xl font-bold bg-transparent border-b-2 ${
                    darkMode
                      ? "border-slate-600 text-white"
                      : "border-gray-300 text-gray-900"
                  } focus:outline-none focus:border-blue-500 text-center w-full`}
                />
              ) : (
                <h2
                  className={`text-xl font-bold cursor-pointer hover:text-blue-500 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  onClick={() => setEditingName(true)}
                >
                  {name}
                </h2>
              )}

              {editingBio ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={() => {
                    setEditingBio(false);
                    if (bio !== user.bio) toast("Đã lưu giới thiệu mới!");
                  }}
                  rows={2}
                  autoFocus
                  className={`w-full mt-2 bg-transparent border-b-2 ${
                    darkMode
                      ? "border-slate-600 text-gray-300"
                      : "border-gray-300 text-gray-600"
                  } text-sm focus:outline-none focus:border-blue-500 resize-none text-center`}
                />
              ) : (
                <p
                  className={`text-sm mt-2 cursor-pointer hover:text-blue-500 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                  onClick={() => setEditingBio(true)}
                >
                  {bio}
                </p>
              )}
            </div>

            {/* XP Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-semibold ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Cấp độ {user.level}
                </span>

                <span
                  className={`text-sm font-semibold ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {user.xp} / {user.nextLevelXp} XP
                </span>
              </div>

              <div
                className={`h-3 rounded-full overflow-hidden ${
                  darkMode ? "bg-slate-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Cấp độ */}
              <div
                className={`${
                  darkMode ? "bg-slate-700/50" : "bg-blue-50"
                } rounded-lg p-4 text-center hover:scale-105 transition-transform`}
              >
                {/* Wrapper: Flex row để icon nằm cạnh số */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.level}
                  </p>
                </div>
                <p
                  className={`text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Cấp độ
                </p>
              </div>

              {/* Streak (Ngày) */}
              <div
                className={`${
                  darkMode ? "bg-slate-700/50" : "bg-orange-50"
                } rounded-lg p-4 text-center hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.streak}
                  </p>
                </div>
                <p
                  className={`text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Ngày
                </p>
              </div>

              {/* Thành tích */}
              <div
                className={`${
                  darkMode ? "bg-slate-700/50" : "bg-green-50"
                } rounded-lg p-4 text-center hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="w-6 h-6 text-green-500" />
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {achievements.length}
                  </p>
                </div>
                <p
                  className={`text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Thành tích
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3
                className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Award size={20} />
                Thành tích nổi bật
              </h3>

              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`${
                      darkMode
                        ? "bg-slate-700/30 hover:bg-slate-700/50"
                        : "bg-gray-50 hover:bg-gray-100"
                    } rounded-lg p-3 flex items-center gap-3 hover:scale-[1.02] transition-all cursor-pointer`}
                  >
                    <div
                      className={`${
                        darkMode ? "bg-slate-800" : "bg-white"
                      } w-12 h-12 rounded-lg flex items-center justify-center shadow-lg`}
                    >
                      <ach.icon className={ach.color} size={24} />
                    </div>

                    <div className="flex-1">
                      <div
                        className={`font-semibold text-base ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {ach.title}
                      </div>
                      <div
                        className={`text-sm mt-0.5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {ach.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
