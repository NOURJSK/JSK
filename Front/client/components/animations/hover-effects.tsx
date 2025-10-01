"use client"

import type React from "react"

import { motion } from "framer-motion"
import { type ReactNode, useState } from "react"

interface HoverEffectProps {
  children: ReactNode
  className?: string
  scale?: number
  rotate?: number
  lift?: number
}

export function HoverScale({ children, className = "", scale = 1.05, rotate = 0, lift = 0 }: HoverEffectProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate,
        y: -lift,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

export function HoverGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export function HoverTilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) / 10
    const rotateYValue = (centerX - e.clientX) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

interface HoverEffectsProps {
  children: ReactNode
  type?: "scale" | "glow" | "tilt" | "lift"
  className?: string
  scale?: number
  rotate?: number
  lift?: number
}

export function HoverEffects({
  children,
  type = "scale",
  className = "",
  scale = 1.05,
  rotate = 0,
  lift = 8,
}: HoverEffectsProps) {
  switch (type) {
    case "glow":
      return <HoverGlow className={className}>{children}</HoverGlow>
    case "tilt":
      return <HoverTilt className={className}>{children}</HoverTilt>
    case "lift":
      return (
        <HoverScale className={className} scale={1.02} lift={lift}>
          {children}
        </HoverScale>
      )
    case "scale":
    default:
      return (
        <HoverScale className={className} scale={scale} rotate={rotate} lift={lift}>
          {children}
        </HoverScale>
      )
  }
}
