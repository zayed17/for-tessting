import { BirthdayHero } from "@/components/birthday-hero"
import { DuasCarousel } from "@/components/quotes-section"
import { WishesSection } from "@/components/wishes-section"

export default function HomePage() {
  return (
    <main className="min-h-screen ">
      <BirthdayHero />
      <WishesSection />
      <DuasCarousel />
    </main>
  )
}
