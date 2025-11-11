"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Plus, Calendar, DollarSign, CheckCircle, Search } from "lucide-react"
import { t, getLanguageCookie } from "@/lib/translations"
import type { LanguageCode } from "@/lib/languages"
import { SCHOLARSHIP_WEBSITES, SCHOLARSHIP_CATEGORIES } from "@/lib/scholarship-data"

interface Scholarship {
  _id: string
  scholarshipName: string
  amount: number
  deadline: string
  status: string
  progress: number
}

interface FetchedScholarship {
  id: string
  name: string
  amount: number | string
  deadline: string
  eligibility: string
  description: string
  source: string
  website: string
  category?: string
}

export default function ScholarshipsPage() {
  const [applications, setApplications] = useState<Scholarship[]>([])
  const [availableScholarships, setAvailableScholarships] = useState<FetchedScholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [language] = useState<LanguageCode>(getLanguageCookie())
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchData()
  }, [selectedCategory, searchQuery])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("q", searchQuery)
      if (selectedCategory) params.append("category", selectedCategory)

      const response = await fetch(`/api/scholarships/fetch?${params}`)
      const data = await response.json()

      if (data.success) {
        setAvailableScholarships(data.scholarships || [])
      }

      // Fetch user applications
      const appResponse = await fetch("/api/scholarships/list")
      const appData = await appResponse.json()
      if (appData.success) {
        setApplications(appData.scholarships || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyScholarship = async (scholarship: FetchedScholarship) => {
    try {
      const response = await fetch("/api/scholarships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scholarshipName: scholarship.name,
          amount: scholarship.amount,
          deadline: scholarship.deadline,
          requirements: ["Submit Application", "Academic Records", "Essay", "Recommendation Letters"],
        }),
      })

      const data = await response.json()
      if (data.success) {
        setApplications([...applications, data.application])
        alert("Scholarship application started successfully!")
      } else {
        alert(data.message || "Failed to apply")
      }
    } catch (error) {
      console.error("[v0] Error applying for scholarship:", error)
      alert("An error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8">
        {/* Your Applications */}
        {applications.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Applications</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {applications.map((app) => (
                <Card key={app._id} className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2">
                      <span>{app.scholarshipName}</span>
                      <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {app.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>₹{Number(app.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(app.deadline).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Progress</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all"
                          style={{ width: `${app.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link href={`/dashboard/scholarships/${app._id}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Continue Application
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Available Scholarships</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="">All Categories</option>
              {SCHOLARSHIP_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Available Scholarships */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading scholarships from trusted sources...</p>
          </div>
        ) : availableScholarships.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {availableScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="border-border hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2">
                    <span>{scholarship.name}</span>
                    <Award className="w-5 h-5 text-secondary" />
                  </CardTitle>
                  <CardDescription>{scholarship.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scholarship.category && (
                    <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {scholarship.category}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <DollarSign className="w-5 h-5" />₹
                    {typeof scholarship.amount === "string" ? scholarship.amount : scholarship.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Source:</strong> {scholarship.source}
                  </p>
                  <Button
                    onClick={() => handleApplyScholarship(scholarship)}
                    disabled={applications.some((app) => app.scholarshipName === scholarship.name)}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    {applications.some((app) => app.scholarshipName === scholarship.name) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Already Applied
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Apply Now
                      </>
                    )}
                  </Button>
                  <a
                    href={scholarship.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs text-primary hover:underline mt-2"
                  >
                    View Official Details →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No scholarships found matching your criteria</p>
          </div>
        )}

        {/* Trusted Scholarship Sources */}
        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-4 text-foreground">Official Scholarship Sources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {SCHOLARSHIP_WEBSITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-muted transition"
              >
                <p className="font-medium text-foreground">{site.name}</p>
                <p className="text-xs text-muted-foreground">{site.description}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
