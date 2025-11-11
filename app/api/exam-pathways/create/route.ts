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

    const { examType, targetDate, currentLevel, studyHours } = await req.json()

    if (!examType || !targetDate || !currentLevel) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const pathway = {
      userId: new ObjectId(userId),
      examType,
      targetDate: new Date(targetDate),
      currentLevel,
      studyHours: studyHours || 2,
      status: "active",
      progress: 0,
      createdAt: new Date(),
      topics: generateTopicsForExam(examType),
    }

    const result = await db.collection("exam_pathways").insertOne(pathway)

    return NextResponse.json({
      success: true,
      pathwayId: result.insertedId,
      pathway,
    })
  } catch (error) {
    console.error("Create pathway error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

function generateTopicsForExam(examType: string): Array<{
  name: string
  subtopics: string[]
  completed: boolean
  progress: number
}> {
  const examTopics: Record<string, Array<{ name: string; subtopics: string[] }>> = {
    JEE_MAINS: [
      {
        name: "Physics",
        subtopics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
      },
      {
        name: "Chemistry",
        subtopics: ["Inorganic Chemistry", "Organic Chemistry", "Physical Chemistry", "Biochemistry"],
      },
      {
        name: "Mathematics",
        subtopics: ["Algebra", "Trigonometry", "Calculus", "Vectors", "Probability"],
      },
    ],
    NEET: [
      {
        name: "Biology",
        subtopics: ["Cell Biology", "Genetics", "Evolution", "Ecology", "Human Physiology"],
      },
      {
        name: "Chemistry",
        subtopics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
      },
      {
        name: "Physics",
        subtopics: ["Mechanics", "Thermodynamics", "Electricity", "Waves", "Modern Physics"],
      },
    ],
    UPSC: [
      {
        name: "History",
        subtopics: ["Ancient India", "Medieval India", "Modern India", "World History"],
      },
      {
        name: "Geography",
        subtopics: ["Physical Geography", "Human Geography", "Indian Geography"],
      },
      {
        name: "Polity",
        subtopics: ["Constitution", "Government Systems", "Rights and Duties"],
      },
    ],
    GATE: [
      {
        name: "Core Subjects",
        subtopics: ["Data Structures", "Algorithms", "Databases", "Operating Systems"],
      },
      {
        name: "Mathematics",
        subtopics: ["Discrete Math", "Linear Algebra", "Probability", "Calculus"],
      },
      {
        name: "General Aptitude",
        subtopics: ["Verbal Ability", "Numerical Ability"],
      },
    ],
  }

  const topics = examTopics[examType] || []
  return topics.map((topic) => ({
    name: topic.name,
    subtopics: topic.subtopics,
    completed: false,
    progress: 0,
  }))
}
