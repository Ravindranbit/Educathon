"use client"

import { useState, useCallback, useEffect } from "react"

interface UseSpeechRecognitionResult {
  transcript: string
  isListening: boolean
  isSpeaking: boolean
  startListening: () => void
  stopListening: () => void
  speak: (text: string, language?: string) => void
  stopSpeaking: () => void
  error: string | null
  resetTranscript: () => void
  isSupported: boolean
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)

  const SpeechRecognition =
    typeof window !== "undefined" && (window.SpeechRecognition || (window as any).webkitSpeechRecognition)

  useEffect(() => {
    if (!SpeechRecognition) {
      setIsSupported(false)
    }
  }, [SpeechRecognition])

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError("Speech Recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-IN"

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event) => {
      let interim_transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript_segment = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript_segment + " ")
        } else {
          interim_transcript += transcript_segment
        }
      }
    }

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()

    return () => {
      recognition.stop()
    }
  }, [SpeechRecognition])

  const stopListening = useCallback(() => {
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.stop()
    setIsListening(false)
  }, [SpeechRecognition])

  const speak = useCallback((text: string, language = "en-IN") => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (event) => {
        setError(`Speech error: ${event.error}`)
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    } else {
      setError("Text-to-Speech not supported in this browser")
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
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
  }
}
