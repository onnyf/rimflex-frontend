
"use client";

import { getCurrentCustomer, loginCustomer, logoutCustomer } from "@/lib/auth-api";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  fullName: string;
  email: string;
  phone: string;
  verified: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
  verifyAccount: () => void;
  login: (email: string, password: string) => boolean;
  loginWithBackend: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "doorstep_user";
const AUTH_KEY = "doorstep_authenticated";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore authentication only from a valid backend session.
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const result = await getCurrentCustomer();

        if (cancelled) return;

        setUser({
          fullName: `${result.user.firstName} ${result.user.lastName}`.trim(),
          email: result.user.email ?? "",
          phone: result.user.phone ?? "",
          verified: Boolean(
            result.user.emailVerifiedAt || result.user.phoneVerifiedAt
          ),
        });

        setIsAuthenticated(true);
      } catch {
        if (cancelled) return;

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);
  // Save user information
  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  // Signup
  const signup = (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const newUser: User = {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      verified: false,
    };

    saveUser(newUser);

    // Account is not authenticated until OTP verification
    setIsAuthenticated(false);
    localStorage.setItem(AUTH_KEY, "false");
  };

  // Verification must be approved by the backend.
  // This function cannot authenticate customers locally.
  const verifyAccount = () => {
    console.warn("Account verification requires backend approval.");
  };
  // Local-only login is disabled.
  // Real authentication will use the backend session API.
  const login = (_email: string, _password: string): boolean => {
    return false;
  };
  // Authenticate using the backend and its HttpOnly session cookie.
  const loginWithBackend = async (email: string, password: string) => {
    await loginCustomer({ email, password });

    const result = await getCurrentCustomer();

    setUser({
      fullName: `${result.user.firstName} ${result.user.lastName}`.trim(),
      email: result.user.email ?? "",
      phone: result.user.phone ?? "",
      verified: Boolean(
        result.user.emailVerifiedAt || result.user.phoneVerifiedAt
      ),
    });

    setIsAuthenticated(true);
  };
  // Logout
  const logout = async (): Promise<void> => {
    await logoutCustomer();

    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem(USER_KEY);
    localStorage.setItem(AUTH_KEY, "false");
  };

  // Update profile information
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      ...userData,
    };

    saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        verifyAccount,
        login,
        loginWithBackend,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
