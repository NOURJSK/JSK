// context/AuthContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '@/lib/authApi'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  username: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    password_confirmation: string
  ) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      if (authApi.isAuthenticated()) {
        const userData = authApi.getCurrentUser()
        setUser(userData)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password)
    setUser(response.user)
  }

  const register = async (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    password_confirmation: string
  ) => {
    await authApi.register(first_name, last_name, email, password, password_confirmation)
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}