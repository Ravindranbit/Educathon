import { connectToDatabase } from "@/lib/db"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const pathway = await db.collection("exam_pathways").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    })

    if (!pathway) {
      return NextResponse.json({ success: false, message: "Pathway not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      pathway,
    })
  } catch (error) {
    console.error("Get pathway error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { progress, status, topics } = await req.json()

    const { db } = await connectToDatabase()

    const updateData: Record<string, any> = { updatedAt: new Date() }
    if (progress !== undefined) updateData.progress = progress
    if (status) updateData.status = status
    if (topics) updateData.topics = topics

    const result = await db
      .collection("exam_pathways")
      .updateOne({ _id: new ObjectId(params.id), userId: new ObjectId(userId) }, { $set: updateData })

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Pathway not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Pathway updated successfully",
    })
  } catch (error) {
    console.error("Update pathway error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
