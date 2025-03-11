"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [activeTab, setActiveTab] = useState("login")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, register, isLoading } = useAuth()
  const router = useRouter()

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(loginData.email, loginData.password)
    if (success) {
      router.push("/")
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!registerData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!registerData.password) {
      newErrors.password = "Password is required"
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await register(registerData.name, registerData.email, registerData.password)
    if (success) {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome to moniquesmakeovers</h1>
            <p className="text-gray-600">Sign in to your account or create a new one</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-pink-600 hover:text-pink-700">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">For demo, use: test@example.com / password123</p>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

