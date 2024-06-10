// AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

// 定义上下文的类型
interface UserInfo {
  _id: string;
  userName: string;
  avatar?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login?: (userInfo: UserInfo) => void;
  logout?: () => void;
  setUserInfo?: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

// 创建上下文
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userInfo: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const login = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 hook 用于访问上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
