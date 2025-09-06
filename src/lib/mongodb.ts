import mongoose, { Mongoose } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("⚠️ Please add your MongoDB URI to .env.local")
}

let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } =
  (global as any).mongoose || { conn: null, promise: null }

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  ;(global as any).mongoose = cached

  return cached.conn
}
