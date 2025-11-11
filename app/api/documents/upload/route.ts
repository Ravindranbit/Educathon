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

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const text = await extractTextFromFile(file, buffer)

    const { db } = await connectToDatabase()

    const result = await db.collection("documents").insertOne({
      userId: new ObjectId(userId),
      filename: file.name,
      text: text,
      uploadedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Document uploaded successfully",
      documentId: result.insertedId,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

async function extractTextFromFile(file: File, buffer: ArrayBuffer): Promise<string> {
  const filename = file.name.toLowerCase()

  if (filename.endsWith(".pdf")) {
    return extractTextFromPDF(buffer)
  } else if (filename.endsWith(".txt")) {
    const text = new TextDecoder().decode(buffer)
    return text
  } else if ([".jpg", ".jpeg", ".png", ".gif"].some((ext) => filename.endsWith(ext))) {
    return await extractTextFromImage(file)
  } else if ([".doc", ".docx"].some((ext) => filename.endsWith(ext))) {
    return "Document content extraction for Word files - implement using document parser library"
  }

  return "Unsupported file format"
}

function extractTextFromPDF(buffer: ArrayBuffer): string {
  return "PDF text extraction requires a PDF library like pdf-parse. For now, returning placeholder."
}

async function extractTextFromImage(file: File): Promise<string> {
  return "Image OCR requires integration with OCR service like Tesseract or Cloud Vision API"
}
