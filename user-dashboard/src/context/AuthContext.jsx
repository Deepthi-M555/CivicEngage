import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch (error) {
          console.error("Token verification failed", error);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const { token: newToken, user: userData } = res.data;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    return res;
  };

  const signup = async (payload) => {
    const res = await api.post("/auth/register", payload);
    const { token: newToken, user: userData } = res.data;
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    window.location.href =
      import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, login, signup, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
