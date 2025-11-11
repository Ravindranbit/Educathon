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

    const { language } = await req.json()

    const { db } = await connectToDatabase()

    const document = await db.collection("documents").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    })

    if (!document) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    const model = process.env.AI_MODEL || "openai/gpt-4o-mini"

    const prompt = buildSimplificationPrompt(document.text, language)

    const { text: simplifiedText } = await generateText({
      model: model as any,
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    // Save simplified version to database
    await db.collection("documents").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          simplifiedText,
          simplifiedLanguage: language,
          simplifiedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      success: true,
      simplifiedText,
    })
  } catch (error) {
    console.error("Simplify document error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

function buildSimplificationPrompt(text: string, language: string): string {
  const languageInstructions = getLanguageInstructions(language)

  return `You are an expert academic document simplifier. Your task is to take complex academic, legal, or technical documents and explain them in simple, easy-to-understand language for students.

${languageInstructions}

Key requirements:
1. Break down complex concepts into simple terms
2. Use everyday examples and analogies
3. Organize the content with clear headings and bullet points
4. Keep sentences short and direct
5. Explain any technical terms you use
6. Make it engaging and conversational
7. Preserve the main ideas and important information

Document to simplify:
---
${text}
---

Please provide a simplified version of this document that maintains all key information but is much easier to understand for a student.`
}

function getLanguageInstructions(language: string): string {
  const instructions: Record<string, string> = {
    English: "Provide the simplified explanation in clear, simple English suitable for school and college students.",
    Hindi:
      "Provide the simplified explanation in Hindi (Hindi/Devanagari script). Use simple, everyday Hindi that students understand.",
    Tamil: "Provide the simplified explanation in Tamil. Use simple, conversational Tamil.",
    Telugu: "Provide the simplified explanation in Telugu. Use simple, conversational Telugu.",
    Bengali: "Provide the simplified explanation in Bengali. Use simple, conversational Bengali.",
    Marathi: "Provide the simplified explanation in Marathi. Use simple, conversational Marathi.",
    Kannada: "Provide the simplified explanation in Kannada. Use simple, conversational Kannada.",
    Malayalam: "Provide the simplified explanation in Malayalam. Use simple, conversational Malayalam.",
    Gujarati: "Provide the simplified explanation in Gujarati. Use simple, conversational Gujarati.",
    Punjabi: "Provide the simplified explanation in Punjabi. Use simple, conversational Punjabi.",
    Urdu: "Provide the simplified explanation in Urdu. Use simple, conversational Urdu.",
  }

  return instructions[language] || instructions.English
}
