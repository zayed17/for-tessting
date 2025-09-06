import mongoose, { Schema, Document, Model } from "mongoose"

export interface IVisit extends Document {
  ip: string
  city?: string
  region?: string
  country?: string
  latitude?: number
  longitude?: number
  timestamp: Date
}

const VisitSchema: Schema<IVisit> = new Schema({
  ip: { type: String, required: true },
  city: String,
  region: String,
  country: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
})

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema)

export default Visit
