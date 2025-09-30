"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { GamesSection } from "@/components/games-section"
import { StaffSection } from "@/components/staff-section"
import { TournamentsSection } from "@/components/tournaments-section"
import SponsorsSection from "@/components/SponsorsSection"
import { Footer } from "@/components/footer"
import { StoreSection } from "@/components/store/store-section"
import ContactPage from "./contact/page"

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <NewsSection />
      <GamesSection />
      <StaffSection />
      <TournamentsSection />
      <SponsorsSection /> 
      <StoreSection />
      <StoreSection />
      <ContactPage />
      <Footer />
    </main>
  )
}
