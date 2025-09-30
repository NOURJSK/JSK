"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  cls: number | null // Cumulative Layout Shift
  fid: number | null // First Input Delay
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
  })
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "development") return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
            break
          case "largest-contentful-paint":
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }))
            break
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
            }
            break
          case "first-input":
            setMetrics((prev) => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
            break
        }
      }
    })

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "layout-shift", "first-input"] })

    // Check for performance issues
    const checkPerformance = () => {
      const { lcp, cls, fid } = metrics
      const hasIssues = (lcp && lcp > 2500) || (cls && cls > 0.1) || (fid && fid > 100)
      setShowWarning(!!hasIssues)
    }

    const timer = setInterval(checkPerformance, 5000)

    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [metrics])

  if (process.env.NODE_ENV !== "development" || !showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-500/90 text-black p-3 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4" />
        <span className="font-bold text-sm">Performance Warning</span>
      </div>
      <div className="text-xs space-y-1">
        {metrics.lcp && metrics.lcp > 2500 && <div>LCP: {Math.round(metrics.lcp)}ms (slow)</div>}
        {metrics.cls && metrics.cls > 0.1 && <div>CLS: {metrics.cls.toFixed(3)} (high)</div>}
        {metrics.fid && metrics.fid > 100 && <div>FID: {Math.round(metrics.fid)}ms (slow)</div>}
      </div>
    </div>
  )
}
