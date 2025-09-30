"use client"

import type React from "react"
import { ErrorBoundary } from "./error-boundary"
import { PageTransition } from "@/components/animations/page-transition"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  withTransition?: boolean
  withErrorBoundary?: boolean
}

export function PageWrapper({
  children,
  className = "",
  withTransition = true,
  withErrorBoundary = true,
}: PageWrapperProps) {
  const content = <main className={`min-h-screen ${className}`}>{children}</main>

  const wrappedContent = withTransition ? <PageTransition>{content}</PageTransition> : content

  return withErrorBoundary ? <ErrorBoundary>{wrappedContent}</ErrorBoundary> : wrappedContent
}
