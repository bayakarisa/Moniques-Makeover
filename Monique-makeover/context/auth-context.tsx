"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      })
      setIsLoading(false)
      return true
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      avatar: undefined,
    }

    // In a real app, you would save this to a database
    // For this demo, we'll just set the current user
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))

    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    })

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

