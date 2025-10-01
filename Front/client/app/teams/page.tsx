import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GamesSection } from "@/components/games-section"

export const metadata: Metadata = {
  title: "Our Teams & Games",
  description:
    "Discover JSK Esports professional gaming teams, featured games, and our competitive achievements across multiple esports titles.",
}

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <GamesSection />
      </div>
      <Footer />
    </main>
  )
}
