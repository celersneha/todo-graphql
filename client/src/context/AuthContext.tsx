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
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
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

  const [loginUserMutation, { loading: loginLoading }] =
    useMutation(LOGIN_USER);
  const [createUserMutation, { loading: createUserLoading }] =
    useMutation(CREATE_USER);

  useEffect(() => {
    if (data?.getUser) {
      setUser(data.getUser);
    }
  }, [data]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUserMutation({
        variables: {
          input: { email, password },
        },
      });
      if (data?.loginUser.success) {
        localStorage.setItem("token", data.loginUser.token);
        setUser(data.loginUser.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await createUserMutation({
        variables: {
          input: { username, email, password },
        },
      });
      if (data?.createUser.success) {
        localStorage.setItem("token", data.createUser.token);
        setUser(data.createUser.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
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
    register,
    logout,
    refetchUser,
    isAuthLoading: loginLoading || createUserLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
