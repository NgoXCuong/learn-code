import React, { createContext, useState, useEffect } from "react";

export const UserCoursesContext = createContext();

export const UserCoursesProvider = ({ children }) => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteCourses")) || [];
    setFavoriteCourses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCourses", JSON.stringify(favoriteCourses));
  }, [favoriteCourses]);

  const addFavorite = (course) => {
    if (!favoriteCourses.some((c) => c.id === course.id)) {
      setFavoriteCourses([...favoriteCourses, course]);
    }
  };

  const removeFavorite = (id) => {
    setFavoriteCourses(favoriteCourses.filter((c) => c.id !== id));
  };

  const isFavorite = (id) => favoriteCourses.some((c) => c.id === id);

  return (
    <UserCoursesContext.Provider
      value={{ favoriteCourses, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </UserCoursesContext.Provider>
  );
};
