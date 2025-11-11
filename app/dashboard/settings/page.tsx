"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { t, getLanguageCookie } from "@/lib/translations"
import type { LanguageCode } from "@/lib/languages"
import { getAllLanguages } from "@/lib/languages"

interface UserSettings {
  name: string
  email: string
  language: string
  theme: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    email: "",
    language: "English",
    theme: "light",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [language, setLanguage] = useState<LanguageCode>("en")

  useEffect(() => {
    const lang = getLanguageCookie()
    setLanguage(lang)
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/auth/me")
      const data = await response.json()
      if (data.success) {
        setSettings({
          name: data.user.name,
          email: data.user.email,
          language: data.user.preferences?.language || "English",
          theme: data.user.preferences?.theme || "light",
        })
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/auth/update-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      const data = await response.json()
      if (data.success) {
        alert("Settings saved successfully!")
      } else {
        alert(data.message || "Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("An error occurred while saving settings")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const languages = getAllLanguages()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Shared header (app/layout.tsx) handles top navigation. Keep a compact language control here for settings. */}
      <div className="container mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher onLanguageChange={setLanguage} />
      </div>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* User Profile */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
              <Input
                name="name"
                value={settings.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="bg-background border-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <Input
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                disabled
                className="bg-background border-input opacity-75"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                {t("settings.language", language)}
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {saving ? (
              <>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t("settings.save", language)}
              </>
            )}
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
