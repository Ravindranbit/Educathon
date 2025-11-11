import { type NextRequest, NextResponse } from "next/server"
import { fetchScholarships, searchScholarships } from "@/lib/scholarship-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category")

    let scholarships
    if (query || category) {
      scholarships = await searchScholarships(query, category || undefined)
    } else {
      scholarships = await fetchScholarships()
    }

    return NextResponse.json({
      success: true,
      count: scholarships.length,
      scholarships,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error fetching scholarships:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch scholarships",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
