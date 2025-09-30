"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { authApi } from "@/lib/authApi"

export default function DefendrLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

// Update the handleSubmit function in your login page
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    const response = await authApi.login(email, password)
    
    if (response.token) {
      router.push("/")
    } else {
      setError("Invalid credentials")
    }
  } catch (err: any) {
    if (err.message) {
      try {
        const parsed = JSON.parse(err.message);
        if (parsed.errors) {
          const messages = Object.values(parsed.errors)
            .flat()
            .join(" ");
          setError(messages);
        } else if (parsed.message) {
          setError(parsed.message);
        } else {
          setError("Login failed");
        }
      } catch {
        setError(err.message || "Login failed");
      }
    } else {
      setError("Login failed");
    }
  } finally {
    setLoading(false)
  }
}
    


  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/50 to-black"></div>

        <div className="absolute inset-0 opacity-40">
          <img src="/news/arab efootball.jpg" alt="Esports Arena" className="w-full h-full object-cover" />
        </div>

        {/* Enhanced animated gaming elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/40 rounded-lg rotate-45 animate-float">
            <div className="absolute inset-2 border border-primary/30 rounded-lg animate-pulse-glow"></div>
            <div className="absolute inset-4 bg-primary/10 rounded-lg"></div>
          </div>
          <div className="absolute top-60 right-32 w-24 h-24 border-2 border-primary/30 rounded-full animate-pulse">
            <div className="absolute inset-2 border border-primary/20 rounded-full animate-slow-spin"></div>
          </div>
          <div className="absolute bottom-40 left-32 w-16 h-16 bg-primary/30 rounded-sm animate-bounce">
            <div className="absolute inset-1 bg-primary/50 rounded-sm animate-neon-flicker"></div>
          </div>

          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/30 text-sm font-mono animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="mb-3">
                  {["JSK", "WIN", "GG", "ACE", "MVP", "PRO"][Math.floor(Math.random() * 6)]}
                </div>
              ))}
            </div>
          ))}

          <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: "0.5s" }}>
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/40">
              <span className="text-3xl"></span>
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <span className="text-xl"></span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center">
        
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4 animate-neon-flicker"
            >
              Welcome Back, Champion
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-primary/90 text-xl font-semibold"
            >
              Ready to dominate again?
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #427e1722 0%, transparent 50%), radial-gradient(circle at 75% 75%, #427e1722 0%, transparent 50%)",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <Link
          href="/"
          className="absolute top-8 left-8 inline-flex items-center space-x-2 text-white/70 hover:text-primary transition-all duration-300 group bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Go Back Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-white mb-4 animate-neon-flicker">Welcome Back</h1>
            <p className="text-white/70 text-xl">Sign in to continue your journey</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full h-16 px-6 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 text-lg"
              />
            </motion.div>

<motion.div
  className="relative"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.6, duration: 0.5 }}
>
  <Input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    required
    className="w-full h-16 px-6 pr-14 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 text-lg"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors"
  >
    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
  </button>

  <div className="absolute -bottom-7 right-0">
    <Link
      href="/auth/forgot-password"
      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap"
    >
      Forgot Password?
    </Link>
  </div>
</motion.div>


            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">{error}</div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 text-lg shadow-lg hover:shadow-primary/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing You In...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>ENTER THE ARENA</span>
                  </span>
                )}
              </Button>
            </motion.div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-white/50">Or sign in with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-16 bg-white hover:bg-white/90 text-black font-semibold rounded-xl border-0 transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
            </Button>

            <div className="text-center mt-6">
              <span className="text-white/60">Already have an account? </span>
              <Link
                href="/auth/register"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
