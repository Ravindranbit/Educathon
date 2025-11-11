"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Mic, MicOff, Send, Loader } from "lucide-react"

interface VoiceQuestionPanelProps {
  onAsk: (question: string) => Promise<string>
  language?: string
  title?: string
}

export function VoiceQuestionPanel({ onAsk, language = "en-IN", title = "Ask a Question" }: VoiceQuestionPanelProps) {
  const { transcript, isListening, startListening, stopListening, speak, error, resetTranscript, isSpeaking } =
    useSpeechRecognition()
  const [manualQuestion, setManualQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const currentQuestion = transcript || manualQuestion

  const handleAsk = async () => {
    if (!currentQuestion.trim()) return

    setIsLoading(true)
    try {
      const response = await onAsk(currentQuestion)
      setAnswer(response)
      speak(response, language)
      resetTranscript()
      setManualQuestion("")
    } catch (err) {
      console.error("Error asking question:", err)
      setAnswer("Sorry, I couldn't process your question. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Ask questions using voice or text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Input Controls */}
        <div className="flex gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={
              isListening
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }
            size="sm"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Speak
              </>
            )}
          </Button>
          <div className="flex-1 text-sm text-muted-foreground py-2">
            {isListening && <span className="animate-pulse">Listening...</span>}
            {error && <span className="text-destructive">{error}</span>}
          </div>
        </div>

        {/* Question Input */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Question</label>
          <textarea
            value={currentQuestion || manualQuestion}
            onChange={(e) => !transcript && setManualQuestion(e.target.value)}
            placeholder="Ask anything about the document or exam preparation..."
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground min-h-16 resize-vertical"
            disabled={isLoading}
          />
        </div>

        {/* Ask Button */}
        <Button
          onClick={handleAsk}
          disabled={isLoading || !currentQuestion.trim()}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Ask Question
            </>
          )}
        </Button>

        {/* Answer Display */}
        {answer && (
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">AI Response</label>
            <div className="bg-muted rounded-lg p-4 min-h-16">
              <p className="text-sm text-foreground whitespace-pre-wrap">{answer}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
