import { NextResponse, type NextRequest } from "next/server"
import { generateText } from "ai"
import { cookies } from "next/headers"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { text, numQuestions = 5 } = await req.json()

    if (!text) {
      return NextResponse.json({ success: false, message: "No text provided" }, { status: 400 })
    }

    const model = process.env.AI_MODEL || "openai/gpt-4o-mini"

    const prompt = `Based on the following academic document, create ${numQuestions} multiple-choice quiz questions to test comprehension.

For each question:
1. The question should test understanding of key concepts
2. Provide 4 options (A, B, C, D)
3. Indicate which option (0-3) is correct
4. Provide a brief explanation of why it's correct

Format your response as a JSON array with objects containing: question (string), options (array of 4 strings), correctAnswer (number 0-3), explanation (string).

Document:
---
${text}
---

Respond with only valid JSON array, no markdown formatting.`

    const { text: quizText } = await generateText({
      model: model as any,
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    const questions = JSON.parse(quizText) as QuizQuestion[]

    return NextResponse.json({
      success: true,
      questions,
    })
  } catch (error) {
    console.error("Generate quiz error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
