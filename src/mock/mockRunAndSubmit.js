// src/pages/compiler/services/mockApi.js

export const runCode = async ({ language, code }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ output: `Kết quả giả lập (${language}):\n${code}` });
    }, 500);
  });
};

export const submitExercise = async ({ exerciseId, code }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        passed: true,
        message: "Submit thành công!",
        comments: [],
      });
    }, 500);
  });
};
