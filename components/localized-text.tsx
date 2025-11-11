"use client"

import { useEffect, useState } from "react"
import { t } from "@/lib/translations"
import { getLanguageCookie } from "@/lib/translations"
import type { LanguageCode } from "@/lib/languages"

interface LocalizedTextProps {
  translationKey: string
  children?: string
  fallback?: string
}

export function LocalizedText({ translationKey, children, fallback }: LocalizedTextProps) {
  const [text, setText] = useState(children || fallback || translationKey)
  const [language, setLanguage] = useState<LanguageCode>("en")

  useEffect(() => {
    const lang = getLanguageCookie()
    setLanguage(lang)
    setText(t(translationKey, lang))
  }, [translationKey])

  return <>{text}</>
}
