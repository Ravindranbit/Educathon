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

    const pathways = await db
      .collection("exam_pathways")
      .find({ userId: new ObjectId(userId) })
      .toArray()

    return NextResponse.json({
      success: true,
      pathways: pathways,
    })
  } catch (error) {
    console.error("List pathways error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
