import {
  createContext,
  useEffect,
  useState,
  useContext
} from "react";
import { api } from "../lib/api";

export const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("user");
    } finally {
      setReady(true);
    }
  }, []);

  function login(userData, token) {
    if (token) {
      localStorage.setItem("token", token);
    }

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  }

  async function logout() {
    try {
      await api("/user/logout", { method: "POST" });
    } catch {
      // Local state still needs clearing if the server is offline.
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }

  function updateUser(userData) {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        ready,
        login,
        logout,
        updateUser,
        isLoggedIn: !!user
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
