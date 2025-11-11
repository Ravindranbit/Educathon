import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const authHeader = request.headers.get("cookie")

    if (!authHeader?.includes("admin")) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const exams = await db.collection("exam_pathways").find({}).sort({ createdAt: -1 }).toArray()

    return Response.json({ success: true, exams })
  } catch (error) {
    console.error("Error fetching exams:", error)
    return Response.json({ success: false, message: "Failed to fetch exams" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const authHeader = request.headers.get("cookie")

    if (!authHeader?.includes("admin")) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, topics, duration, difficulty } = body

    const result = await db.collection("exam_pathways").insertOne({
      name,
      description,
      topics: topics || [],
      duration,
      difficulty,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return Response.json({
      success: true,
      exam: { _id: result.insertedId, ...body },
    })
  } catch (error) {
    console.error("Error creating exam:", error)
    return Response.json({ success: false, message: "Failed to create exam" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const authHeader = request.headers.get("cookie")

    if (!authHeader?.includes("admin")) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const examId = url.searchParams.get("id")

    if (!examId) {
      return Response.json({ success: false, message: "Exam ID required" }, { status: 400 })
    }

    await db.collection("exam_pathways").deleteOne({ _id: new ObjectId(examId) })

    return Response.json({ success: true, message: "Exam deleted" })
  } catch (error) {
    console.error("Error deleting exam:", error)
    return Response.json({ success: false, message: "Failed to delete exam" }, { status: 500 })
  }
}
