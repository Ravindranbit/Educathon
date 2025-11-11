"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Zap, Globe, Headphones, FileText, Trophy, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LandingPage() {
  const [envStatus, setEnvStatus] = useState<{ healthy: boolean; message?: string }>({ healthy: true })
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkHealth = async () => {
      if (process.env.NODE_ENV === "development") {
        try {
          const response = await fetch("/api/health")
          if (!response.ok) {
            setEnvStatus({
              healthy: false,
              message: "Database connection issue. Check DATABASE_URL in .env.local",
            })
          }
        } catch (error) {
          setEnvStatus({
            healthy: false,
            message: "Backend unreachable. Verify environment variables and restart dev server.",
          })
        }
      }
    }
    checkHealth()

    // check auth status
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        setIsAuth(Boolean(data?.success && data?.user))
      } catch (e) {
        setIsAuth(false)
      }
    }
    checkAuth()
  }, [])

  const handleGetStarted = () => {
    if (isAuth) {
      router.push("/dashboard")
    } else {
      router.push("/auth/signin")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {!envStatus.healthy && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4">
          <Alert className="bg-destructive/10 border-destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">⚠️ {envStatus.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header removed here - keep only the main hero section below */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground text-balance">
              Ace Your Exams & Scholarships in Your Language
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Simplify complex academic documents, get personalized exam guidance, and apply for scholarships—all with
              AI-powered support in 10+ Indian languages.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleGetStarted} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition border-border">
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-3" />
              <CardTitle className="text-lg">Document Simplification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload any academic document or form. Our AI reads and explains it in simple, conversational language.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition border-border">
            <CardHeader>
              <Globe className="w-8 h-8 text-secondary mb-3" />
              <CardTitle className="text-lg">10+ Indian Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Urdu, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition border-border">
            <CardHeader>
              <Headphones className="w-8 h-8 text-accent mb-3" />
              <CardTitle className="text-lg">Voice Interaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Listen to explanations and speak your questions for truly accessible learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold text-foreground">Everything You Need</h3>
          <p className="text-muted-foreground">Comprehensive tools to succeed academically</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Zap,
              title: "Exam Preparation",
              description: "Step-by-step guidance for competitive exams with personalized study paths.",
            },
            {
              icon: Trophy,
              title: "Scholarship Navigator",
              description: "Discover and apply for scholarships with guided application walkthroughs.",
            },
            {
              icon: FileText,
              title: "OCR Technology",
              description: "Scan and extract text from physical forms and documents instantly.",
            },
            {
              icon: Zap,
              title: "AI-Powered Insights",
              description: "Get instant answers to your academic questions with context-aware AI.",
            },
          ].map((feature, i) => (
            <Card key={i} className="border-border">
              <CardHeader>
                <feature.icon className="w-8 h-8 text-primary mb-3" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="container mx-auto px-4 py-20 bg-card rounded-2xl border border-border">
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-foreground">Support for All Indian Languages</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your preferred language to get academic support in a language you're most comfortable with.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
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
              "English",
              "Assamese",
            ].map((lang) => (
              <div
                key={lang}
                className="px-4 py-2 bg-background rounded-lg border border-border text-center font-medium text-sm"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center space-y-6">
        <h3 className="text-3xl font-bold text-foreground">Ready to Simplify Your Academic Journey?</h3>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join thousands of students who are using AcademyAI to understand complex concepts and ace their exams.
        </p>
        <Link href="/auth/signup">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AcademyAI - Making education accessible to every Indian student in their language</p>
        </div>
      </footer>
    </div>
  )
}
