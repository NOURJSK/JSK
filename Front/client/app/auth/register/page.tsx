'use client'

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { authApi } from "@/lib/authApi"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"

interface RegisterFormData {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

export default function DefendrRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError: setFormError
  } = useForm<RegisterFormData>()

  const password = watch('password')

  const handleSubmitForm = async (data: RegisterFormData) => {
    setLoading(true)
    setServerError("")
    setSuccess("")

    try {
      const nameParts = data.fullname.trim().split(" ")
      const first_name = nameParts[0] || ""
      const last_name = nameParts.slice(1).join(" ") || ""

      await authApi.register(
        first_name,
        last_name,
        data.email,
        data.password,
        data.confirmPassword
      )

      setSuccess("Registration successful! Redirecting to login...")
      setTimeout(() => router.push("/auth/login"), 2000)
    } catch (err: any) {
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message)
          if (parsed.errors) {
            const messages = Object.values(parsed.errors)
              .flat()
              .join(" ")
            setServerError(messages)
          } else if (parsed.message) {
            setServerError(parsed.message)
          } else {
            setServerError("Registration failed")
          }
        } catch {
          setServerError(err.message || "Registration failed")
        }
      } else {
        setServerError("Registration failed")
      }
    } finally {
      setLoading(false)
    }
  }

  const getInputClassName = (fieldName: keyof RegisterFormData) => {
    const baseClass = "w-full h-14 px-4 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
    
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`
    }
    
    // Check if field has value and no error (success state)
    const fieldValue = watch(fieldName)
    if (fieldValue && fieldValue.length > 0 && !errors[fieldName]) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20`
    }
    
    return `${baseClass} focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-white/15`
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background (unchanged) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/50 to-black"></div>

        <div className="absolute inset-0 opacity-30">
          <img src="/staff/dhirar.jpg" alt="Gaming Setup" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-28 h-28 border-2 border-primary/40 rounded-full animate-slow-spin">
            <div className="absolute inset-2 border border-primary/20 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-80 left-24 w-20 h-20 border-2 border-primary/30 rounded-lg rotate-12 animate-float">
            <div className="absolute inset-1 bg-primary/10 rounded-lg animate-pulse-glow"></div>
          </div>
          <div className="absolute bottom-32 right-40 w-12 h-12 bg-primary/30 rounded-full animate-bounce delay-500">
            <div className="absolute inset-1 bg-primary/50 rounded-full animate-neon-flicker"></div>
          </div>

          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/25 text-xs font-mono animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="mb-4">
                  {["J", "S", "K"][Math.floor(Math.random() * 3)]}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4 animate-neon-flicker"
            >
              Join the Legends
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-primary/90 text-xl font-semibold"
            >
              Become part of JSK Esports
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right side - Register form with React Hook Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 radialbackground"></div>
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
            <h1 className="text-5xl font-bold text-white mb-4 animate-neon-flicker">Create Account</h1>
            <p className="text-white/70 text-xl">Join the elite gaming community</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Input
                type="text"
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters"
                  }
                })}
                placeholder="Full Name"
                className={getInputClassName("fullname")}
              />
              {errors.fullname && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.fullname.message}</span>
                </p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Email Address"
                className={getInputClassName("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.email.message}</span>
                </p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one lowercase letter, one uppercase letter, and one number"
                    }
                  })}
                  placeholder="Password"
                  className={getInputClassName("password").replace("pr-12", "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.password.message}</span>
                </p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  placeholder="Confirm Password"
                  className={getInputClassName("confirmPassword").replace("pr-12", "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.confirmPassword.message}</span>
                </p>
              )}
            </motion.div>

            {/* Server Error Message */}
            {serverError && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {serverError}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-sm">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 text-lg shadow-lg hover:shadow-primary/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Your Elite Account...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>JOIN NOW</span>
                  </span>
                )}
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>

          
            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-white/60">Already have an account? </span>
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign in
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}