import React, { useState } from "react";
import { Edit2, Upload } from "lucide-react";
import { achievements } from "@/mock/profile";
import { toast } from "sonner";

export default function ProfileHero({ user }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [cover, setCover] = useState(user.cover);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      toast.success("Đã lưu thay đổi ảnh đại diện!", { duration: 3000 });
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
      toast.success("Đã lưu thay đổi ảnh bìa!", { duration: 3000 });
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  const handleNameBlur = () => {
    setEditingName(false);
    if (name !== user.name) {
      toast.success("Đã lưu thay đổi tên!", { duration: 3000 });
    }
  };

  const handleBioBlur = () => {
    setEditingBio(false);
    if (bio !== user.bio) {
      toast.success("Đã lưu thay đổi giới thiệu!", { duration: 3000 });
    }
  };

  return (
    <div className="relative">
      {/* Ảnh bìa */}
      <div className="h-64 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
        <img
          src={cover}
          alt="Cover"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <label className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm cursor-pointer">
          <Upload size={16} />
          <span className="text-base">Đổi ảnh bìa</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </label>
      </div>

      {/* Thông tin người dùng */}
      <div className="mpx-6 sm:px-14 lg:px-20 py-8 -mt-20 relative">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Ảnh đại diện */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden shadow-lg">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all transform group-hover:scale-110">
                <Edit2 size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Thông tin */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {editingName ? (
                  <input
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    className="text-3xl font-bold text-gray-900 dark:text-white border-b border-gray-400 focus:outline-none bg-transparent"
                    autoFocus
                  />
                ) : (
                  <h1
                    className="text-3xl font-bold text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => setEditingName(true)}
                  >
                    {name}
                  </h1>
                )}
                <span className="bg-blue-600 text-white text-base px-3 py-1 rounded-full font-semibold">
                  Level {user.level}
                </span>
              </div>

              {/* Bio */}
              {editingBio ? (
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  onBlur={handleBioBlur}
                  className="w-full text-gray-600 dark:text-gray-400 border-b border-gray-400 focus:outline-none bg-transparent resize-none mb-3"
                  rows={2}
                  autoFocus
                />
              ) : (
                <p
                  className="text-gray-600 dark:text-gray-400 mb-3 cursor-pointer"
                  onClick={() => setEditingBio(true)}
                >
                  {bio}
                </p>
              )}

              {/* Thanh kinh nghiệm */}
              <div className="mb-4">
                <div className="flex justify-between text-base mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Kinh nghiệm
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {user.xp} / {user.nextLevelXp} XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Thành tích */}
              <div className="flex flex-wrap gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex items-center space-x-2 text-base"
                  >
                    <ach.icon className={ach.color} size={18} />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {ach.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
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
