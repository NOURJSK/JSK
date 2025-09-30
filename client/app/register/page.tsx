"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/auth/register")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Redirecting to registration...</p>
      </div>
    </div>
  )
}
