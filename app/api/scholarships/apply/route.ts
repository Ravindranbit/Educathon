import { connectToDatabase } from "@/lib/db"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { scholarshipName, amount, deadline, requirements } = await req.json()

    if (!scholarshipName || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const application = {
      userId: new ObjectId(userId),
      scholarshipName,
      amount,
      deadline: deadline ? new Date(deadline) : null,
      requirements: requirements || [],
      status: "in_progress",
      progress: 0,
      completedSteps: [],
      createdAt: new Date(),
    }

    const result = await db.collection("scholarship_applications").insertOne(application)

    return NextResponse.json({
      success: true,
      applicationId: result.insertedId,
      application,
    })
  } catch (error) {
    console.error("Apply scholarship error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
