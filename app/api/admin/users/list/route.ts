import { connectToDatabase } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const authHeader = request.headers.get("cookie")

    // Verify admin session
    if (!authHeader?.includes("admin")) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const users = await db.collection("users").find({}).project({ password: 0 }).sort({ createdAt: -1 }).toArray()

    const totalUsers = await db.collection("users").countDocuments()
    const totalDocuments = await db.collection("documents").countDocuments()
    const totalExams = await db.collection("exam_pathways").countDocuments()
    const totalScholarships = await db.collection("scholarship_applications").countDocuments()

    return Response.json({
      success: true,
      users,
      stats: {
        totalUsers,
        totalDocuments,
        totalExams,
        totalScholarships,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return Response.json({ success: false, message: "Failed to fetch users" }, { status: 500 })
  }
}
