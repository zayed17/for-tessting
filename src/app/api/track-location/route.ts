import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

import * as UAParser from "ua-parser-js"
import Visit from "../../../../models/Visit"

export async function POST(req: Request) {
  await connectDB()

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
  const userAgent = req.headers.get("user-agent") || ""
  const acceptLang = req.headers.get("accept-language") || ""

  const parser = new UAParser.UAParser(userAgent)
  const uaResult = parser.getResult()

  const body = await req.json() // client-side extra info

  try {
    // Fetch location info from IP
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`)
    const geoData = await geoRes.json()

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

    // Save to MongoDB or update if IP exists
    const visit = await Visit.findOneAndUpdate(
      { ip },
      visitData,
      { new: true, upsert: true }
    )

    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to save visitor details" },
      { status: 500 }
    )
  }
}
