"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check apakah user masih login
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth-check`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.username);
        } else {
          setUser(null);
          router.push("/login");
        }
      } catch (error) {
        setUser(null);
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setUser(username);
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  const logout = async () => {
    await fetch(`${API_BASE_URL}/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
