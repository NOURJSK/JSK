"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { authApi } from "@/lib/authApi"
import { apiService } from "@/lib/apiService"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    await apiService.getCsrfCookie();

    await authApi.forgotPassword(email);

    setSuccess(
      "If an account exists with this email, you will receive a password reset link shortly."
    );
    setEmail("");
  } catch (err: any) {
    setError(err.message || "Failed to send reset email");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex">
      {/* Left side - Gaming illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/50 to-black"></div>
        
        <div className="absolute inset-0 opacity-40">
          <img src="/news/arab efootball.jpg" alt="Esports Arena" className="w-full h-full object-cover" />
        </div>

        {/* Animated elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/40 rounded-lg rotate-45 animate-float">
            <div className="absolute inset-2 border border-primary/30 rounded-lg animate-pulse-glow"></div>
          </div>
          <div className="absolute bottom-40 left-32 w-24 h-24 border-2 border-primary/30 rounded-full animate-pulse">
            <div className="absolute inset-2 border border-primary/20 rounded-full animate-slow-spin"></div>
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
              Reset Your Password
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-primary/90 text-xl font-semibold"
            >
              Get back in the game!
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right side - Forgot password form */}
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
          href="/auth/login"
          className="absolute top-8 left-8 inline-flex items-center space-x-2 text-white/70 hover:text-primary transition-all duration-300 group bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Login</span>
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
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Forgot Password?</h1>
            <p className="text-white/70 text-lg">
              Enter your email address and we'll send you a link to reset your password.
            </p>
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
                placeholder="Enter your email address"
                required
                className="w-full h-16 px-6 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 text-lg"
              />
            </motion.div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-sm">
                {success}
              </div>
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
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                   <span>SEND RESET LINK</span>
                  </span>
                )}
              </Button>
            </motion.div>

            <div className="text-center mt-6">
              <span className="text-white/60">Remember your password? </span>
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
