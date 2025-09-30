"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation before hitting API
    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      setLoading(false)
      return
    }

    try {
      const success = await login(email.trim(), password.trim())
      if (!success) {
        setError("Invalid credentials. Please try again.")
      }
    } catch {
      setError("Login failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (isAuthenticated) return null

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated neon background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#16a34a40,_transparent_60%)] animate-pulse -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#22c55e30,_transparent_60%)] animate-pulse-slow -z-10"></div>

      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-md bg-black/70 border border-green-500/30">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-6 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-wider drop-shadow-lg">
            JSK Esports Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-green-400 font-semibold mb-1 block">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jsk.tn"
                required
                disabled={loading}
                className="w-full border-green-500/50 focus:border-green-400 focus:ring-green-400 rounded-lg bg-gray-950/80 text-green-100 placeholder-green-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-green-400 font-semibold mb-1 block">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full border-green-500/50 focus:border-green-400 focus:ring-green-400 rounded-lg bg-gray-950/80 text-green-100 placeholder-green-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-900/30 border border-red-600/50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-green-400 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} JSK Esports. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
