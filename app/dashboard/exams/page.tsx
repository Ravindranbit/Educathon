"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, Clock, Target, BarChart3 } from "lucide-react"
import { t, getLanguageCookie } from "@/lib/translations"
import type { LanguageCode } from "@/lib/languages"
import { EXAM_PREP_DATA, type ExamType } from "@/lib/exam-data"
// HomeNavigation removed from this page; use global SiteHeader for consistent navigation

interface ExamPathway {
  _id: string
  examType: string
  targetDate: string
  currentLevel: string
  studyHours: number
  progress: number
  status: string
}

const EXAM_TYPES = [
  { id: "JEE_MAINS", name: "JEE Mains", description: "Engineering entrance exam" },
  { id: "NEET", name: "NEET", description: "Medical entrance exam" },
  { id: "UPSC", name: "UPSC", description: "Civil Services exam" },
  { id: "GATE", name: "GATE", description: "Graduate Aptitude Test" },
]

export default function ExamsPage() {
  const [pathways, setPathways] = useState<ExamPathway[]>([])
  const [loading, setLoading] = useState(true)
  const [language] = useState<LanguageCode>(getLanguageCookie())
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    examType: "JEE_MAINS",
    targetDate: "",
    currentLevel: "beginner",
    studyHours: 2,
  })
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null)

  useEffect(() => {
    fetchPathways()
  }, [])

  const fetchPathways = async () => {
    try {
      const response = await fetch("/api/exam-pathways/list")
      const data = await response.json()
      if (data.success) {
        setPathways(data.pathways || [])
      }
    } catch (error) {
      console.error("Error fetching pathways:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePathway = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/exam-pathways/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setPathways([...pathways, data.pathway])
        setShowForm(false)
        setFormData({ examType: "JEE_MAINS", targetDate: "", currentLevel: "beginner", studyHours: 2 })
        alert("Exam pathway created successfully!")
      } else {
        alert(data.message || "Failed to create pathway")
      }
    } catch (error) {
      console.error("Error creating pathway:", error)
      alert("An error occurred")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "studyHours" ? Number.parseInt(value) : value,
    }))
  }

  const getExamDetails = (examType: string) => {
    return EXAM_PREP_DATA[examType as ExamType] || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8">
        {/* Create Pathway Form */}
        {showForm ? (
          <Card className="mb-8 border-border">
            <CardHeader>
              <CardTitle>Create New Exam Pathway</CardTitle>
              <CardDescription>Choose your exam and set your study goals</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePathway} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Select Exam</label>
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    {EXAM_TYPES.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.name} - {exam.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Target Date</label>
                  <input
                    type="date"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Current Level</label>
                    <select
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Study Hours/Day</label>
                    <input
                      type="number"
                      name="studyHours"
                      value={formData.studyHours}
                      onChange={handleInputChange}
                      min="1"
                      max="12"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Pathway
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Pathway
          </Button>
        )}

        {/* Pathways List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Study Pathways</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading pathways...</p>
          ) : pathways.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No study pathways yet. Create one to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {pathways.map((pathway) => (
                <Link key={pathway._id} href={`/dashboard/exams/${pathway._id}`}>
                  <Card className="border-border hover:shadow-lg transition cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-2">
                        <span>{pathway.examType.replace(/_/g, " ")}</span>
                        <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          {pathway.status}
                        </span>
                      </CardTitle>
                      <CardDescription>{new Date(pathway.targetDate).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Target className="w-4 h-4" />
                        <span>Level: {pathway.currentLevel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{pathway.studyHours} hours/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <BarChart3 className="w-4 h-4" />
                        <span>Progress: {pathway.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${pathway.progress}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Exam Preparation Guidelines */}
        {!showForm && pathways.length > 0 && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Exam Preparation Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(EXAM_PREP_DATA).map(([key, exam]) => (
                <Card key={key} className="border-border hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{exam.name}</CardTitle>
                    <CardDescription>{exam.fullName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground">{exam.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Marks</p>
                        <p className="font-semibold">{exam.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{exam.duration}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">SUBJECTS</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.map((subject) => (
                          <span key={subject} className="px-2 py-1 bg-muted rounded text-xs">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">KEY RESOURCES</p>
                      <div className="space-y-1">
                        {exam.resources.slice(0, 2).map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline block"
                          >
                            {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => setSelectedExamType(key)} variant="outline" size="sm" className="w-full">
                      View Full Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Exam Guide Modal */}
        {selectedExamType && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto border-border">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{getExamDetails(selectedExamType)?.name}</CardTitle>
                    <CardDescription>{getExamDetails(selectedExamType)?.fullName}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedExamType(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {getExamDetails(selectedExamType) && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-sm text-muted-foreground">{getExamDetails(selectedExamType)?.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Marks</p>
                        <p className="text-lg font-semibold">{getExamDetails(selectedExamType)?.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-lg font-semibold">{getExamDetails(selectedExamType)?.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Timeline</p>
                        <p className="text-sm">{getExamDetails(selectedExamType)?.timeline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Official Website</p>
                        <a
                          href={getExamDetails(selectedExamType)?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Topics & Chapters</h3>
                      <div className="space-y-3">
                        {getExamDetails(selectedExamType)?.topics.map((topic, i) => (
                          <div key={i}>
                            <p className="text-sm font-semibold text-primary mb-1">{topic.subject}</p>
                            <div className="flex flex-wrap gap-1">
                              {topic.chapters.map((chapter, j) => (
                                <span key={j} className="px-2 py-1 bg-muted rounded text-xs">
                                  {chapter}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Recommended Resources</h3>
                      <div className="space-y-2">
                        {getExamDetails(selectedExamType)?.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 border border-border rounded hover:bg-muted transition"
                          >
                            <p className="text-sm font-semibold">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">{resource.type}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
