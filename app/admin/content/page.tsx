"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, BookOpen, Zap } from "lucide-react"

export default function ContentPage() {
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null)

  const categories = [
    {
      id: "study-materials",
      name: "Study Materials",
      icon: BookOpen,
      description: "Notes, textbooks, and reference materials",
      count: 24,
    },
    {
      id: "tips-tricks",
      name: "Exam Tips & Tricks",
      icon: Zap,
      description: "Quick tips and strategies for exam success",
      count: 12,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground mt-4">Content Library</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-semibold">
                      {category.count}
                    </span>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{category.count} items in this category</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => setUploadingCategory(uploadingCategory === category.id ? null : category.id)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingCategory === category.id ? "Cancel" : "Upload Content"}
                  </Button>
                  {uploadingCategory === category.id && (
                    <div className="mt-4 p-3 border border-dashed border-primary rounded-lg">
                      <input type="file" multiple accept=".pdf,.doc,.docx,.txt,.mp4,.mp3" className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
