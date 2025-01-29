import React, { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  };

  return (
    <div
      className="fixed bottom-4 right-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg cursor-pointer hover:shadow-xl"
      onClick={toggleDarkMode}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        <span className="text-yellow-400">☀️</span> // Light mode icon
      ) : (
        <span className="text-gray-900">🌙</span> // Dark mode icon
      )}
    </div>
  );
};

export default DarkModeToggle;