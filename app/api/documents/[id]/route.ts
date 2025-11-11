import { connectToDatabase } from "@/lib/db"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const { id } = (await params) as { id: string }

    const document = await db.collection("documents").findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    })

    if (!document) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error("Get document error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const { id } = (await params) as { id: string }

    const result = await db.collection("documents").deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    })
  } catch (error) {
    console.error("Delete document error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
