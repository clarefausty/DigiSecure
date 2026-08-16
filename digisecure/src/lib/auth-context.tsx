"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User } from "./types";

const STORAGE_KEY = "digisecure.user";
const USERS_KEY = "digisecure.users";

type StoredUser = User & { password: string };

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const login: AuthContextValue["login"] = async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found || found.password !== password) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    const sessionUser = { fullName: found.fullName, email: found.email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { ok: true };
  };

  const signUp: AuthContextValue["signUp"] = async (
    fullName,
    email,
    password
  ) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser: StoredUser = { fullName, email, password };
    saveUsers([...users, newUser]);
    const sessionUser = { fullName, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
