import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

import * as UAParser from "ua-parser-js"

import Visit from "../../../../models/Visit"

export async function GET(req: Request) {
  await connectDB()

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
  const userAgent = req.headers.get("user-agent") || ""
  const acceptLang = req.headers.get("accept-language") || ""

  const parser = new UAParser.UAParser(userAgent)
  const uaResult = parser.getResult()
  try {
    // Check if IP exists
    let visit = await Visit.findOne({ ip })

    if (!visit) {
      // Fetch location info
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`)
      const geoData = await geoRes.json()

      visit = new Visit({
        ip,
        city: geoData.city,
        region: geoData.region,
        country: geoData.country_name,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        browser: uaResult.browser.name,
        browserVersion: uaResult.browser.version,
        os: uaResult.os.name,
        osVersion: uaResult.os.version,
        device: uaResult.device.model || "Desktop",
        deviceType: uaResult.device.type || "Computer",
        engine: uaResult.engine.name,
        language: acceptLang,
        timestamp: new Date(),
      })
      await visit.save()
    } else {
      // Update timestamp if IP revisits
      visit.timestamp = new Date()
      await visit.save()
    }

    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error("Failed to track location:", error)
    return NextResponse.json(
      { error: "Failed to save location" },
      { status: 500 }
    )
  }
}

// Optional: receive client-side extra details
export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"

  try {
    const visit = await Visit.findOneAndUpdate(
      { ip },
      {
        ...body,
        timestamp: new Date(),
      },
      { new: true, upsert: true }
    )
    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to save client details" },
      { status: 500 }
    )
  }
}
