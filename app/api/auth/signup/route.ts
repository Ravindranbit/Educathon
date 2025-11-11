import { connectToDatabase } from "@/lib/db"
import bcrypt from "bcryptjs"
import { type NextRequest, NextResponse } from "next/server"
import { getEnvironmentVariables } from "@/lib/env"

export async function POST(req: NextRequest) {
  try {
    getEnvironmentVariables()

    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      preferences: {
        language: "English",
        theme: "light",
      },
    })

    return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    const message =
      error instanceof Error && error.message.includes("Environment")
        ? "Server configuration error. Please check environment variables."
        : "Internal server error"

    return NextResponse.json(
      { success: false, message },
      { status: error instanceof Error && error.message.includes("Environment") ? 503 : 500 },
    )
  }
}
