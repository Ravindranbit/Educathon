import { generateText } from "ai"
import { getEnvironmentVariables } from "@/lib/env"

export async function POST(request: Request) {
  try {
    const env = getEnvironmentVariables()

    const { message, conversationHistory } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    const systemPrompt = `You are AcademyAI, a helpful academic assistant for Indian students. You help with:
- Exam preparation (JEE, NEET, UPSC, GATE)
- Scholarship guidance
- Document simplification and explanation
- Study tips and strategies
- Career guidance

Be concise, helpful, and always provide practical advice. If asked about exams or scholarships, provide information relevant to India.`

    const conversationMessages = conversationHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }))

    let modelString = "openai/gpt-4o-mini"

    if (env.aiProvider === "gemini" && env.geminiApiKey) {
      modelString = "google-generative-ai/gemini-1.5-flash"
    } else if (env.aiProvider === "anthropic" && env.anthropicApiKey) {
      modelString = "anthropic/claude-3-5-sonnet"
    } else if (env.aiProvider === "groq" && env.groqApiKey) {
      modelString = "groq/mixtral-8x7b-32768"
    }

    const result = await generateText({
      model: modelString,
      system: systemPrompt,
      messages: [...conversationMessages, { role: "user", content: message }],
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({
      reply: result.text,
      usage: {
        inputTokens: result.usage?.inputTokens || 0,
        outputTokens: result.usage?.outputTokens || 0,
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate response"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
