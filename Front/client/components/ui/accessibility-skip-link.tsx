"use client"

import { useEffect, useState } from "react"

export function AccessibilitySkipLink() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsVisible(true)
      }
    }

    const handleBlur = () => {
      setIsVisible(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleBlur)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleBlur)
    }
  }, [])

  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-4 z-50 px-4 py-2 bg-green-500 text-black font-bold rounded-md
        transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-400
        ${isVisible ? "translate-y-0" : "-translate-y-16"}
      `}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      Skip to main content
    </a>
  )
}
