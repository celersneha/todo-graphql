import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/types";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { LOGIN_USER, CREATE_USER } from "../graphql/mutation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");

  const { data, loading, refetch } = useQuery(GET_USER, {
    skip: !token,
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (data?.getUser) {
      setUser(data.getUser);
    }
  }, [data]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  const refetchUser = () => {
    refetch();
  };

  const value = {
    user,
    loading: loading && !!token,
    login,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
