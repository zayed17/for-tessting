import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import * as UAParser from "ua-parser-js"
import Visit from "../../../../models/Visit"

export async function POST(req: Request) {
  await connectDB()

  const userAgent = req.headers.get("user-agent") || ""
  const acceptLang = req.headers.get("accept-language") || ""
  const parser = new UAParser.UAParser(userAgent)
  const uaResult = parser.getResult()
  const body = await req.json()

  try {
    // Use automatic IP detection
    const geoRes = await fetch(`https://ipapi.co/json/`)
    const geoData = await geoRes.json()

    const visitData = {
      ip: geoData.ip || "unknown",
      city: geoData.city || null,
      region: geoData.region || null,
      country: geoData.country_name || null,
      latitude: geoData.latitude || null,
      longitude: geoData.longitude || null,
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

    const visit = await Visit.create(visitData)
    return NextResponse.json({ success: true, visit })
  } catch (error) {
    console.error("Failed to save visitor details:", error)
    return NextResponse.json(
      { error: "Failed to save visitor details" },
      { status: 500 }
    )
  }
}
