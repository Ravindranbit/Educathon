import { MongoClient, type Db } from "mongodb"
import { validateEnvironmentVariables } from "./env"

const { databaseUrl } = validateEnvironmentVariables()
const MONGODB_URI = databaseUrl
const DB_NAME = "academyai"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(DB_NAME)

    cachedClient = client
    cachedDb = db

    console.log("[v0] ✓ Connected to MongoDB successfully")
    return { client, db }
  } catch (error) {
    console.error("[v0] ❌ MongoDB connection error:", error instanceof Error ? error.message : error)
    console.error("[v0] Please verify your DATABASE_URL in .env.local is correct")
    throw new Error(`Failed to connect to MongoDB. Check your DATABASE_URL configuration.`)
  }
}

export async function ensureIndexes(db: Db) {
  try {
    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })

    // Documents collection indexes
    await db.collection("documents").createIndex({ userId: 1 })
    await db.collection("documents").createIndex({ createdAt: -1 })

    // Exam pathways collection indexes
    await db.collection("exam_pathways").createIndex({ userId: 1 })

    // Scholarship applications collection indexes
    await db.collection("scholarship_applications").createIndex({ userId: 1 })
    await db.collection("scholarship_applications").createIndex({ status: 1 })

    await db.collection("chat_messages").createIndex({ userId: 1 })
    await db.collection("chat_messages").createIndex({ createdAt: -1 })
    await db.collection("chat_conversations").createIndex({ userId: 1 })
  } catch (error) {
    console.error("Index creation error:", error)
  }
}
