// Validates all required environment variables at startup and provides helpful error messages

export function validateEnvironmentVariables() {
  const errors: string[] = []

  // Check required variables
  if (!process.env.DATABASE_URL) {
    errors.push("DATABASE_URL is not set. For local MongoDB, use: mongodb://localhost:27017/academyai")
  }

  if (!process.env.SESSION_SECRET) {
    errors.push("SESSION_SECRET is not set. Generate with: openssl rand -base64 32")
  }

  // Warn about optional but recommended variables
  if (process.env.NODE_ENV === "production") {
    if (!process.env.VERCEL_URL && !process.env.NEXTAUTH_URL) {
      console.warn("Warning: VERCEL_URL or NEXTAUTH_URL should be set in production")
    }
  }

  const hasOpenAI = !!process.env.OPENAI_API_KEY
  const hasGemini = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY
  const hasGroq = !!process.env.GROQ_API_KEY

  if (!hasOpenAI && !hasGemini && !hasAnthropic && !hasGroq) {
    errors.push(
      "No AI provider API key found. Please add one of: OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, ANTHROPIC_API_KEY, or GROQ_API_KEY",
    )
  }

  // If there are critical errors, throw them
  if (errors.length > 0) {
    console.error("\n❌ Environment Configuration Errors:\n")
    errors.forEach((error) => console.error(`   - ${error}`))
    console.error("\n📋 Setup Instructions for Local Development:")
    console.error("   1. Start MongoDB: mongod")
    console.error("   2. Copy .env.local template from project")
    console.error("   3. Generate SESSION_SECRET: openssl rand -base64 32")
    console.error("   4. Get an API key from your chosen AI provider:")
    console.error("      - OpenAI: https://platform.openai.com/api-keys")
    console.error("      - Google Gemini: https://makersuite.google.com/app/apikey")
    console.error("      - Anthropic Claude: https://console.anthropic.com/")
    console.error("      - Groq (Free): https://console.groq.com/")
    console.error("   5. Add values to .env.local")
    console.error("   6. Restart development server\n")
    throw new Error("Missing required environment variables")
  }

  return {
    databaseUrl: process.env.DATABASE_URL,
    sessionSecret: process.env.SESSION_SECRET,
    aiProvider: process.env.AI_PROVIDER || "openai",
    openaiApiKey: process.env.OPENAI_API_KEY,
    geminiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    groqApiKey: process.env.GROQ_API_KEY,
  }
}

// Get validated environment variables
export function getEnvironmentVariables() {
  try {
    return validateEnvironmentVariables()
  } catch (error) {
    console.error("Failed to load environment variables:", error)
    throw error
  }
}
