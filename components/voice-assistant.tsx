"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Mic, MicOff, Volume2, VolumeX, RotateCcw } from "lucide-react"

interface VoiceAssistantProps {
  onTranscriptChange?: (text: string) => void
  language?: string
  placeholder?: string
}

export function VoiceAssistant({ onTranscriptChange, language = "en-IN", placeholder }: VoiceAssistantProps) {
  const {
    transcript,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    error,
    resetTranscript,
    isSupported,
  } = useSpeechRecognition()
  const [responseText, setResponseText] = useState("")

  if (!isSupported) {
    return (
      <Card className="border-border">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground">
            Voice features are not supported in your browser. Please use Chrome, Edge, or Safari.
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speak(text, language)
    }
  }

  const handleTranscriptUpdate = () => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript)
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Voice Assistant
        </CardTitle>
        <CardDescription>Use voice to input text and listen to responses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Microphone Controls */}
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
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Listening
              </>
            )}
          </Button>
          {transcript && (
            <Button variant="outline" onClick={resetTranscript} size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap">{transcript}</p>
          </div>
        )}

        {/* Voice Feedback */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {isListening && <p className="animate-pulse">Listening...</p>}
            {error && <p className="text-destructive">{error}</p>}
          </div>

          {/* Response Area */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">AI Response</label>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder={placeholder || "AI response will appear here or type manually..."}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground min-h-24 resize-vertical"
            />
          </div>

          {/* Speaker Controls */}
          {responseText && (
            <Button
              onClick={() => handleSpeak(responseText)}
              className={
                isSpeaking
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full"
                  : "bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              }
              size="sm"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Speak Response
                </>
              )}
            </Button>
          )}

          {/* Use Transcript Button */}
          {transcript && (
            <Button onClick={handleTranscriptUpdate} variant="outline" size="sm" className="w-full bg-transparent">
              Use Transcript as Input
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
