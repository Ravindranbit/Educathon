"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Award, FileText, LogOut, BarChart3 } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

interface Stats {
  totalUsers: number
  totalDocuments: number
  totalExams: number
  totalScholarships: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/users/list")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/auth/signin"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered students</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats?.totalDocuments || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Total uploads</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Exam Pathways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats?.totalExams || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Active study plans</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Scholarship Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats?.totalScholarships || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/admin/users">
            <Card className="border-border hover:shadow-lg transition cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Manage Users
                </CardTitle>
                <CardDescription>View, edit, and manage student accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor user registrations, activities, and preferences
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Users
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/exams">
            <Card className="border-border hover:shadow-lg transition cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Manage Exams
                </CardTitle>
                <CardDescription>Create and manage exam pathways</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Add new exams, update syllabi, and manage topics</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Exams
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/scholarships">
            <Card className="border-border hover:shadow-lg transition cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Manage Scholarships
                </CardTitle>
                <CardDescription>Create and manage scholarship opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Add new scholarships and track applications</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Scholarships
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/content">
            <Card className="border-border hover:shadow-lg transition cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Content Library
                </CardTitle>
                <CardDescription>Manage study materials and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Upload and organize study materials for students</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Content
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
