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
    <div className="h-full">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          {toastMessage}
        </div>
      )}

      <div
        className={`h-full ${
          darkMode
            ? "bg-slate-800/80 to-slate-900/80 border-slate-700/50"
            : "bg-white border-gray-200"
        } backdrop-blur-xl border rounded-2xl overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl`}
      >
        {/* Cover */}
        <div className="relative h-32 overflow-hidden group shrink-0">
          <img
            src={cover}
            alt="cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60"></div>
          
          <label className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-1.5 rounded-lg cursor-pointer transition-all duration-300">
            <Camera size={14} />
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
        </div>

        {/* Content */}
        <div className="relative px-6 pb-6 flex flex-col flex-1">
          {/* Avatar */}
          <div className="relative flex justify-center -mt-12 mb-4">
            <div className="relative group">
              <div className={`w-24 h-24 rounded-full border-4 ${darkMode ? "border-slate-800" : "border-white"} overflow-hidden shadow-xl ring-2 ring-blue-500/20`}>
                {avatar ? (
                  <img src={avatar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User className="text-white w-12 h-12" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-1.5 rounded-full shadow-lg cursor-pointer transition-all duration-300">
                <Edit2 size={12} className="text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="text-center mb-6 shrink-0">
            {editingName ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => { setEditingName(false); if (name !== user.name) toast("Đã lưu tên!"); }}
                autoFocus
                className={`text-xl font-bold bg-transparent border-b ${darkMode ? "text-white" : "text-gray-900"} text-center w-full focus:outline-none`}
              />
            ) : (
              <h2 className={`text-xl font-extrabold cursor-pointer hover:text-blue-500 transition-colors ${darkMode ? "text-white" : "text-gray-900"}`} onClick={() => setEditingName(true)}>
                {name}
              </h2>
            )}
            <p className={`text-sm mt-1.5 font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`} onClick={() => setEditingBio(true)}>
              {bio || "Thêm giới thiệu về bạn..."}
            </p>
          </div>

          {/* XP Bar */}
          <div className="mb-6 shrink-0">
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className={`text-sm font-bold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Lv. {user.level}
              </span>
              <span className={`text-sm font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
              </span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-100 shadow-inner"}`}>
              <div
                className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Core Stats - Compact Row */}
          <div className="grid grid-cols-3 gap-2 mb-6 shrink-0">
            <div className={`rounded-xl p-3 text-center border ${darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-blue-50/50 border-blue-100/50"}`}>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-6 h-6 text-blue-500 mb-1" />
                <span className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{user.level}</span>
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">Cấp độ</span>
              </div>
            </div>
            <div className={`rounded-xl p-3 text-center border ${darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-orange-50/50 border-orange-100/50"}`}>
              <div className="flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-1" />
                <span className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{user.streak}</span>
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">Ngày</span>
              </div>
            </div>
            <div className={`rounded-xl p-3 text-center border ${darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-emerald-50/50 border-emerald-100/50"}`}>
              <div className="flex flex-col items-center">
                <Award className="w-6 h-6 text-emerald-500 mb-1" />
                <span className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{achievements.length}</span>
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">Achievement</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex-1 min-h-0 flex flex-col">
            <h3 className={`text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest px-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <Award size={16} className="text-amber-500" />
              Thành tích nổi bật
            </h3>

            <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`group rounded-xl p-3 flex items-center gap-4 transition-all border ${
                    darkMode
                      ? "bg-slate-800/40 border-slate-700/30 hover:bg-slate-700/50 hover:border-slate-600"
                      : "bg-gray-50/50 border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${darkMode ? "bg-slate-800" : "bg-white"}`}>
                    <ach.icon className={`${ach.color} transition-transform group-hover:scale-110`} size={24} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{ach.title}</div>
                    <div className="text-xs text-gray-500 font-medium truncate mt-0.5">{ach.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
