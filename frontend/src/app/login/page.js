"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-white ${darkMode && "bg-slate-900"}`}>
      <div className={`flex flex-row w-1/2 border rounded-lg shadow-md bg-white text-black ${darkMode && "bg-slate-900 border-slate-700 text-white "}`}>
        <div className="w-1/2 flex items-center justify-center ">
          <h2 className="text-2xl font-bold mb-4 text-center">TaskGov</h2>
        </div>
        <div className="w-1/2 p-6 ">
          <div className="flex justify-end">
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" onClick={toggleDarkMode}/>
            <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
          </label>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full p-2 border rounded mb-4"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
