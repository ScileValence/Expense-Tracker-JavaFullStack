import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  });
  const [refreshToggle, setRefreshToggle] = useState(false);
  const triggerRefresh = () => setRefreshToggle((t) => !t);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        selectedMonth,
        setSelectedMonth,
        refreshToggle,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
