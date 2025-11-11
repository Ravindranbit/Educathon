"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/languages"
import { setLanguageCookie, getLanguageCookie } from "@/lib/translations"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  onLanguageChange?: (language: LanguageCode) => void
  variant?: "compact" | "expanded"
}

export function LanguageSwitcher({ onLanguageChange, variant = "compact" }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = getLanguageCookie()
    setCurrentLanguage(saved)
  }, [])

  const handleLanguageChange = (language: LanguageCode) => {
    setCurrentLanguage(language)
    setLanguageCookie(language)
    setIsOpen(false)
    onLanguageChange?.(language)
    window.location.reload()
  }

  const currentLang = SUPPORTED_LANGUAGES[currentLanguage]

  if (variant === "expanded") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground block">Select Language</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
            <Button
              key={code}
              variant={currentLanguage === code ? "default" : "outline"}
              onClick={() => handleLanguageChange(code as LanguageCode)}
              className="text-xs"
            >
              <div className="flex flex-col items-center gap-1">
                <span>{lang.name}</span>
                <span className="text-[10px] opacity-75">{lang.nativeName}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Globe className="w-4 h-4" />
        {currentLang?.name}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as LanguageCode)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition ${
                  currentLanguage === code ? "bg-primary text-primary-foreground" : "text-foreground"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{lang.name}</span>
                  <span className="text-xs opacity-75">{lang.nativeName}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
