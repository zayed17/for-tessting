import mongoose, { Schema, Document, Model } from "mongoose"

export interface IVisit extends Document {
  ip: string
  city?: string
  region?: string
  country?: string
  latitude?: number
  longitude?: number
  browser?: string
  browserVersion?: string
  os?: string
  osVersion?: string
  device?: string
  deviceType?: string
  engine?: string
  language?: string
  timezone?: string
  deviceMemory?: number
  logicalCores?: number
  screen?: {
    width: number
    height: number
    colorDepth: number
  }
  connection?: object
  timestamp: Date
}

const VisitSchema: Schema<IVisit> = new Schema({
  ip: { type: String, required: true },
  city: String,
  region: String,
  country: String,
  latitude: Number,
  longitude: Number,
  browser: String,
  browserVersion: String,
  os: String,
  osVersion: String,
  device: String,
  deviceType: String,
  engine: String,
  language: String,
  timezone: String,
  deviceMemory: Number,
  logicalCores: Number,
  screen: {
    width: Number,
    height: Number,
    colorDepth: Number,
  },
  connection: Object,
  timestamp: { type: Date, default: Date.now },
})

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema)

export default Visit
