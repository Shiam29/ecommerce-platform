import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginCheck = async () => {
      const res = await fetch("https://broken-flower-7456.fly.dev/session");
      const user = await res.json();
      if (res.status === 200) setUser(user);
    };
    loginCheck();
  }, []);

  const logout = () => {};
  const register = () => {};

  const login = async (fields) => {
    const res = await fetch("https://broken-flower-7456.fly.dev/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw {
        status: res.status,
        message: data.message,
      };
    }
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
