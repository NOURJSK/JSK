"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  sizes?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...props}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
    </div>
  )
}
