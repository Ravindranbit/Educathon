"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader, Copy, Download } from "lucide-react"

interface DocumentSimplifierProps {
  documentId: string
  originalText: string
  initialSimplifiedText?: string
}

export function DocumentSimplifier({ documentId, originalText, initialSimplifiedText }: DocumentSimplifierProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [simplifiedText, setSimplifiedText] = useState(initialSimplifiedText || "")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Marathi",
    "Kannada",
    "Malayalam",
    "Gujarati",
    "Punjabi",
    "Urdu",
  ]

  const handleSimplify = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/documents/${documentId}/simplify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: selectedLanguage }),
      })

      const data = await response.json()
      if (data.success) {
        setSimplifiedText(data.simplifiedText)
      } else {
        alert(data.message || "Simplification failed")
      }
    } catch (error) {
      console.error("Simplification error:", error)
      alert("An error occurred during simplification")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy error:", error)
    }
  }

  const handleDownloadText = () => {
    const element = document.createElement("a")
    const file = new Blob([simplifiedText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "simplified-document.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-4">
      {/* Control Panel */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            AI-Powered Simplification
          </CardTitle>
          <CardDescription>Choose your preferred language for simplified explanation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground block mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground disabled:opacity-50"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleSimplify}
              disabled={isLoading}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Simplify
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Display */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Text */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Original Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{originalText}</p>
            </div>
          </CardContent>
        </Card>

        {/* Simplified Text */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg">Simplified Version</CardTitle>
                <CardDescription>{selectedLanguage} • AI Generated</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {simplifiedText ? (
              <>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{simplifiedText}</p>
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={handleCopyText} className="flex-1 bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadText} className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>Simplified text will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
