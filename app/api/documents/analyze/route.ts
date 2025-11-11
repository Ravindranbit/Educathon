import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { generateText } from "ai"

interface AnalysisResult {
  keyPoints: string[]
  summary: string
  difficulty: string
  estimatedReadTime: number
  topics: string[]
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ success: false, message: "No text provided" }, { status: 400 })
    }

    const model = process.env.AI_MODEL || "openai/gpt-4o-mini"

    const prompt = `Analyze the following academic document and provide:
1. Key points (3-5 main ideas)
2. A brief summary (1-2 sentences)
3. Difficulty level (Easy, Medium, Hard)
4. Estimated reading time (in minutes)
5. Main topics covered

Format your response as JSON with keys: keyPoints (array), summary (string), difficulty (string), estimatedReadTime (number), topics (array).

Document:
---
${text}
---

Respond with only valid JSON, no markdown formatting.`

    const { text: analysisText } = await generateText({
      model: model as any,
      prompt: prompt,
      temperature: 0.5,
      maxTokens: 1000,
    })

    const analysis = JSON.parse(analysisText) as AnalysisResult

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Analyze document error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
