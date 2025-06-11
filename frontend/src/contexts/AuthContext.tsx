import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMe, logout as logoutRequest } from "../services/authService";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  role: string | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при выходе", err);
    }
  };

  const role = user?.role || null;

  const authContextValue = useMemo(
    () => ({
      user,
      role,
      isLoading,
      fetchUser,
      logout,
    }),
    [user, role, isLoading]
  );

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};
