"use client"
import { useEffect } from "react"
import { BirthdayHero } from "@/components/birthday-hero"
import { DuasCarousel } from "@/components/quotes-section"
import { WishesSection } from "@/components/wishes-section"
import KnowledgeFeed from "@/components/KnowledgeFeed"

export default function HomePage() {
  useEffect(() => {
    // Call GET endpoint to track visitor
    fetch("/api/track-location")
      .then(res => res.json())
      .then(data => console.log("Visitor tracked:", data))
      .catch(console.error)
  }, [])

  return (
    <main className="min-h-screen">
      <BirthdayHero />
      {/* <WishesSection /> */}
      <DuasCarousel />
      <KnowledgeFeed />
    </main>
  )
}
