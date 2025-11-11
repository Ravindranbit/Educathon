import { connectToDatabase } from "@/lib/db"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const documents = await db
      .collection("documents")
      .find({ userId: new ObjectId(userId) })
      .sort({ uploadedAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      documents: documents,
    })
  } catch (error) {
    console.error("List documents error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
