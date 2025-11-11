import { connectToDatabase } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const authHeader = request.headers.get("cookie")

    if (!authHeader?.includes("admin")) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const scholarships = await db.collection("scholarship_applications").find({}).sort({ createdAt: -1 }).toArray()

    return Response.json({ success: true, scholarships })
  } catch (error) {
    console.error("Error fetching scholarships:", error)
    return Response.json({ success: false, message: "Failed to fetch scholarships" }, { status: 500 })
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
    const { name, amount, eligibility, deadline, description } = body

    const result = await db.collection("scholarships").insertOne({
      name,
      amount,
      eligibility,
      deadline,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return Response.json({
      success: true,
      scholarship: { _id: result.insertedId, ...body },
    })
  } catch (error) {
    console.error("Error creating scholarship:", error)
    return Response.json({ success: false, message: "Failed to create scholarship" }, { status: 500 })
  }
}
