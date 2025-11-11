import { connectToDatabase, ensureIndexes } from "@/lib/db"

async function initializeDatabase() {
  try {
    const { db } = await connectToDatabase()
    await ensureIndexes(db)
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization failed:", error)
    process.exit(1)
  }
}

initializeDatabase()
