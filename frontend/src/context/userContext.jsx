import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const setLocalStorageUser = (_id, name, email) => {
    localStorage.setItem("userInfo", JSON.stringify({ _id, name, email }));
  };

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) return JSON.parse(userInfo);
    else return null;
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    Navigate("/");
  };

  return (
    <UserContext.Provider value={{ getUserInfo, setLocalStorageUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserContext.displayName = "UserContext";
