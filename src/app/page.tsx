"use client" // if using App Router

import { useEffect } from "react"
import { BirthdayHero } from "@/components/birthday-hero"
import { DuasCarousel } from "@/components/quotes-section"
import { WishesSection } from "@/components/wishes-section"

export default function HomePage() {
  useEffect(() => {
    fetch("/api/track-location").catch(console.error)
    console.log("done this")
  }, [])

  return (
    <main className="min-h-screen">
      <BirthdayHero />
      <WishesSection />
      <DuasCarousel />
    </main>
  )
}
