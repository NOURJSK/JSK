"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  }

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.4,
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function SlideTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  const slideVariants = {
    initial: { x: "100%", opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: "-100%", opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
