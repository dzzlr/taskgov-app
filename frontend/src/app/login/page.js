"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-row w-1/2 border rounded-lg shadow-md bg-white text-black">
        <div className="w-1/2 flex items-center justify-center ">
          <h2 className="text-2xl font-bold mb-4 text-center">TaskGov</h2>
        </div>
        <div className="w-1/2 p-6 ">
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
