"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, BookOpen, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SiteHeader() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" })
        const data = await res.json()
        if (data?.success && data.user) {
          setUserName(data.user.name)
          setIsAuth(true)
        } else {
          setUserName(null)
          setIsAuth(false)
        }
      } catch (e) {
        setUserName(null)
        setIsAuth(false)
      }
    }
    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsAuth(false)
      setUserName(null)
      router.push("/auth/signin")
    } catch (e) {
      console.error("Logout failed", e)
    }
  }

  const isDashboard = pathname?.startsWith("/dashboard")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <div className="p-2 bg-[#0F4886] rounded-lg flex items-center justify-center hover:bg-[#155aa8] transition-shadow">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-foreground">{isDashboard ? "AcademyAI Dashboard" : "AcademyAI"}</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#languages" className="text-sm text-muted-foreground hover:text-foreground transition">
            Languages
          </Link>

          {isAuth ? (
            <div className="flex items-center gap-4">
              <LanguageSwitcher onLanguageChange={() => {}} />
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-[#0F4886] text-white hover:bg-[#155aa8]">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
