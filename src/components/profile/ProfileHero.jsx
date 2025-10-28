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
      console.log("Saved name:", name);
    }
  };

  const handleBioBlur = () => {
    setEditingBio(false);
    if (bio !== user.bio) {
      toast.success("Đã lưu thay đổi bio!", { duration: 3000 });
      console.log("Saved bio:", bio);
    }
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden">
        <img
          src={cover}
          alt="Cover"
          className="w-full h-full object-cover opacity-50 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <label className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm cursor-pointer">
          <Upload size={16} />
          <span className="text-sm">Đổi ảnh bìa</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </label>
      </div>

      {/* Profile Info Overlay */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative">
        <div className="bg-white dark:bg-gray-800 transition-colors duration-150 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden shadow-lg">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all transform group-hover:scale-110">
                <Edit2 size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* User Info */}
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
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  Level {user.level}
                </span>
              </div>

              {/* Editable Bio */}
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

              {/* XP Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Kinh nghiệm
                  </span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {user.xp} / {user.nextLevelXp} XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(user.xp / user.nextLevelXp) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <ach.icon className={ach.color} size={18} />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {ach.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
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
