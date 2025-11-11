import { connectToDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Verify database is responsive
    await db.admin().ping()

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: message,
        message: "Database connection failed. Please check your environment variables.",
      },
      { status: 503 },
    )
  }
}
