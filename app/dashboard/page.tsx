"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Trash2, LogOut, Settings, Plus, Trophy, Zap, Home } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { t, getLanguageCookie } from "@/lib/translations"
import type { LanguageCode } from "@/lib/languages"

interface Document {
  _id: string
  filename: string
  text: string
  uploadedAt: string
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [language, setLanguage] = useState<LanguageCode>("en")

  useEffect(() => {
    const lang = getLanguageCookie()
    setLanguage(lang)
    fetchUserData()
    fetchDocuments()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me")
      const data = await response.json()
      if (data.success) {
        setUserName(data.user.name)
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setIsAuth(false)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents/list")
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents || [])
      }
    } catch (error) {
      console.error("Error fetching documents:", error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append("file", files[0])

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        await fetchDocuments()
        alert(t("document.upload", language))
        e.target.value = ""
      } else {
        alert(data.message || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("An error occurred during upload")
    } finally {
      setUploadingFile(false)
    }
  }

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return

    try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        await fetchDocuments()
      } else {
        alert(data.message || "Delete failed")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("An error occurred during delete")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header is rendered from app/layout.tsx - per-page header removed to avoid duplicates */}

      <main className="container mx-auto px-4 py-8">
        {/* Upload Section */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {t("document.upload", language)}
            </CardTitle>
            <CardDescription>Upload PDFs, images, or documents for AI-powered simplification</CardDescription>
          </CardHeader>
          <CardContent>
            {isAuth ? (
              <div className="flex items-center gap-4">
                {/* Hidden native file input - button triggers click for better UX */}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="hidden"
                />
                <Button
                  type="button"
                  disabled={uploadingFile}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {uploadingFile ? "Uploading..." : t("document.upload", language)}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">You must sign in to upload documents.</p>
                <Link href="/auth/signin">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/dashboard/exams">
            <Card className="border-border hover:shadow-lg transition cursor-pointer">
              <CardContent className="py-6 flex items-center gap-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("nav.exams", language)}</p>
                  <p className="text-xs text-muted-foreground">Create study pathways</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/scholarships">
            <Card className="border-border hover:shadow-lg transition cursor-pointer">
              <CardContent className="py-6 flex items-center gap-4">
                <Trophy className="w-8 h-8 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("nav.scholarships", language)}</p>
                  <p className="text-xs text-muted-foreground">Find scholarships</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Documents Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("nav.documents", language)}</h2>
            {documents.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No documents uploaded yet. Upload one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <Card key={doc._id} className="border-border hover:shadow-lg transition">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{doc.filename}</CardTitle>
                          <CardDescription className="text-xs">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(doc._id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{doc.text.substring(0, 150)}...</p>
                      <Link href={`/dashboard/document/${doc._id}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View & {t("document.simplify", language)}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
