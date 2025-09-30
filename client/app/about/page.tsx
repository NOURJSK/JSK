import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"

export const metadata: Metadata = {
  title: "About JSK Esports - Our Story, History & Achievements",
  description:
    "Discover the journey of JSK Esports from humble beginnings to world champions. Explore our history, statistics, achievements, and the elite teams behind our success.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
