"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api"



interface User {
  id: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) { 
          setUser(data);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);


  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login error:", errorData);
      return false;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); 
    setUser(data.user);
    return true;
  } catch (error) {
    console.error("Login fetch error:", error);
    return false;
  }
};



  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
  value={{
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user 
  }}
>
  {children}
</AuthContext.Provider>

  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

