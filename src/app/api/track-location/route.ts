import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import * as UAParser from "ua-parser-js"
import Visit from "../../../../models/Visit"

export async function POST(req: Request) {
  await connectDB()

  // Get IP from headers, fallback to "auto"
  let ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"

  // User agent and language
  const userAgent = req.headers.get("user-agent") || ""
  const acceptLang = req.headers.get("accept-language") || ""

  // Parse user agent
  const parser = new UAParser.UAParser(userAgent)
  const uaResult = parser.getResult()

  // Extra client info from browser
  const body = await req.json()

  try {
    // Fetch geolocation
    let geoData: any = {
      city: null,
      region: null,
      country_name: null,
      latitude: null,
      longitude: null,
    }

    try {
      const geoRes =
        ip === "unknown"
          ? await fetch(`https://ipapi.co/json/`) // auto detect IP
          : await fetch(`https://ipapi.co/${ip}/json/`)
      geoData = await geoRes.json()
    } catch (geoErr) {
      console.warn("Geo fetch failed:", geoErr)
    }

    const visitData = {
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
      timezone: body.timezone,
      deviceMemory: body.deviceMemory,
      logicalCores: body.logicalCores,
      screen: body.screen,
      connection: body.connection,
      timestamp: new Date(),
    }

    // Save or update existing record by IP
    const visit = await Visit.findOneAndUpdate(
      { ip },
      visitData,
      { new: true, upsert: true }
    )

    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error("Failed to save visitor details:", error)
    return NextResponse.json(
      { error: "Failed to save visitor details" },
      { status: 500 }
    )
  }
}
