"use client"
import { useEffect } from "react"
import { BirthdayHero } from "@/components/birthday-hero"
import { DuasCarousel } from "@/components/quotes-section"
import { WishesSection } from "@/components/wishes-section"

export default function HomePage() {
  useEffect(() => {
    // Track server-side info
    fetch("/api/track-location").catch(console.error)

    // Send extra client-side details
    const extraData = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceMemory: (navigator as any).deviceMemory,
      logicalCores: navigator.hardwareConcurrency,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
      },
      connection: (navigator as any).connection || null,
    }

    fetch("/api/track-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extraData),
    }).catch(console.error)
  }, [])

  return (
    <main className="min-h-screen">
      <BirthdayHero />
      <WishesSection />
      <DuasCarousel />
    </main>
  )
}
