import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Visit from "../../../../models/Visit"


export async function GET(req: Request) {
  await connectDB()

  // Get user IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown"

  try {
    // Check if IP already exists
    const existingVisit = await Visit.findOne({ ip })
    if (existingVisit) {
      return NextResponse.json({
        success: true,
        message: "IP already tracked, skipping save",
        visit: existingVisit,
      })
    }

    // Fetch location info
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await geoRes.json()

    const locationData = {
      ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date(),
    }

    // Save to MongoDB only if not exists
    const visit = new Visit(locationData)
    await visit.save()

    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error("Failed to track location:", error)
    return NextResponse.json(
      { error: "Failed to save location" },
      { status: 500 }
    )
  }
}
