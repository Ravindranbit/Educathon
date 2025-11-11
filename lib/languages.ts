export const SUPPORTED_LANGUAGES = {
  en: { name: "English", nativeName: "English", code: "en" },
  hi: { name: "Hindi", nativeName: "हिंदी", code: "hi" },
  ta: { name: "Tamil", nativeName: "தமிழ்", code: "ta" },
  te: { name: "Telugu", nativeName: "తెలుగు", code: "te" },
  bn: { name: "Bengali", nativeName: "বাংলা", code: "bn" },
  mr: { name: "Marathi", nativeName: "मराठी", code: "mr" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", code: "kn" },
  ml: { name: "Malayalam", nativeName: "മലയാളം", code: "ml" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", code: "gu" },
  pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", code: "pa" },
  ur: { name: "Urdu", nativeName: "اردو", code: "ur" },
  as: { name: "Assamese", nativeName: "অসমীয়া", code: "as" },
}

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: LanguageCode = "en"

export function getLanguageName(code: string): string {
  const lang = SUPPORTED_LANGUAGES[code as LanguageCode]
  return lang ? lang.name : "English"
}

export function getLanguageNativeName(code: string): string {
  const lang = SUPPORTED_LANGUAGES[code as LanguageCode]
  return lang ? lang.nativeName : "English"
}

export function getAllLanguages() {
  return Object.values(SUPPORTED_LANGUAGES)
}
