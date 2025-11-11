"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { DocumentSimplifier } from "@/components/document-simplifier"
import { VoiceQuestionPanel } from "@/components/voice-question-panel"

interface DocumentDetail {
  _id: string
  filename: string
  text: string
  uploadedAt: string
  simplifiedText?: string
}

export default function DocumentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const docId = params.id as string

  const [document, setDocument] = useState<DocumentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showVoicePanel, setShowVoicePanel] = useState(false)

  useEffect(() => {
    fetchDocument()
  }, [docId])

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${docId}`)
      const data = await response.json()
      if (data.success) {
        setDocument(data.document)
      } else {
        alert("Document not found")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error fetching document:", error)
      alert("Error loading document")
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleAskQuestion = async (question: string): Promise<string> => {
    try {
      const response = await fetch(`/api/documents/${docId}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()
      if (data.success) {
        return data.answer
      } else {
        throw new Error(data.message || "Failed to get answer")
      }
    } catch (error) {
      console.error("Error asking question:", error)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <p className="text-muted-foreground">Document not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header provided by app/layout.tsx */}

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Inline document controls (moved out of per-page header) */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground truncate">{document.filename}</h1>
          <Button
            onClick={() => setShowVoicePanel(!showVoicePanel)}
            variant={showVoicePanel ? "default" : "outline"}
            size="sm"
          >
            {showVoicePanel ? "Hide Voice Panel" : "Show Voice Panel"}
          </Button>
        </div>
        {/* Voice Question Panel */}
        {showVoicePanel && <VoiceQuestionPanel onAsk={handleAskQuestion} title="Ask Questions About This Document" />}

        {/* Document Simplifier */}
        <DocumentSimplifier
          documentId={docId}
          originalText={document.text}
          initialSimplifiedText={document.simplifiedText}
        />
      </main>
    </div>
  )
}
