import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { validateEnvironmentVariables } from "@/lib/env"
import Link from "next/link"
import { Home } from "lucide-react"
import SiteHeader from "@/components/site-header"
import "./globals.css"

try {
  validateEnvironmentVariables()
} catch (error) {
  console.error("Failed to start application:", error)
}

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AcademyAI",
  description: "Simplify academic documents and ace exams with AI-powered multilingual assistance in Indian languages",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
  {/* Shared site header */}
  <SiteHeader />
  {children}
        <Analytics />
      </body>
    </html>
  )
}
