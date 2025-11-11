import { connectToDatabase } from "@/lib/db"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { NextResponse, type NextRequest } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { question } = await req.json()

    if (!question) {
      return NextResponse.json({ success: false, message: "No question provided" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const document = await db.collection("documents").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    })

    if (!document) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    const model = process.env.AI_MODEL || "openai/gpt-4o-mini"

    const prompt = `You are a helpful academic assistant. Answer the following question based on the provided document. 
    
Be concise, clear, and educational in your response. If the question cannot be answered from the document, say so clearly.

Document:
---
${document.text}
---

Question: ${question}

Please provide a helpful, accurate answer.`

    const { text: answer } = await generateText({
      model: model as any,
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return NextResponse.json({
      success: true,
      answer,
    })
  } catch (error) {
    console.error("Ask question error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
