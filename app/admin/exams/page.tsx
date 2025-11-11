"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react"

interface Exam {
  _id: string
  name: string
  description: string
  difficulty: string
  duration: number
  topics: string[]
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "medium",
    duration: 180,
    topics: "",
  })

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/admin/exams")
      const data = await response.json()
      if (data.success) {
        setExams(data.exams)
      }
    } catch (error) {
      console.error("Error fetching exams:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          topics: formData.topics.split(",").map((t) => t.trim()),
        }),
      })
      const data = await response.json()
      if (data.success) {
        setExams([data.exam, ...exams])
        setFormData({ name: "", description: "", difficulty: "medium", duration: 180, topics: "" })
        setShowForm(false)
      }
    } catch (error) {
      console.error("Error creating exam:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground mt-2">Manage Exams</h1>
          </div>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            New Exam
          </Button>
        </div>
        {showForm && (
          <Card className="border-border mb-6">
            <CardHeader>
              <CardTitle>Create New Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Exam Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., JEE Mains 2024"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Input
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Exam details..."
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Duration (minutes)</label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Topics (comma-separated)</label>
                  <Input
                    value={formData.topics}
                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                    placeholder="Physics, Chemistry, Mathematics"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary text-primary-foreground">
                    Create Exam
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {exams.length === 0 ? (
              <Card className="border-border col-span-full">
                <CardContent className="py-12 text-center text-muted-foreground">No exams yet</CardContent>
              </Card>
            ) : (
              exams.map((exam) => (
                <Card key={exam._id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                        <CardDescription>{exam.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{exam.duration} mins</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Level:</span>
                        <p className="font-medium capitalize">{exam.difficulty}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Topics:</span>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {exam.topics?.map((topic, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}
