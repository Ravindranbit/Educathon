"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

interface HomeNavigationProps {
  showLabel?: boolean
}

export function HomeNavigation({ showLabel = true }: HomeNavigationProps) {
  return (
    <Link href="/dashboard">
      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
        <Home className="w-4 h-4" />
        {showLabel && "Home"}
      </Button>
    </Link>
  )
}

export default HomeNavigation
