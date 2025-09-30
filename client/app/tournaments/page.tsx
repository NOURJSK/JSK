import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentsSection } from "@/components/tournaments-section"

export const metadata: Metadata = {
  title: "Tournaments & Competitions",
  description:
    "View upcoming tournaments, past results, and competitive events featuring JSK Esports teams and players.",
}

export default function TournamentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <TournamentsSection />
      </div>
      <Footer />
    </main>
  )
}
