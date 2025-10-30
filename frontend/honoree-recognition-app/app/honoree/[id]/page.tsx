"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useHonorees } from "@/context/honoree-context"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RecognitionCard } from "@/components/recognition-card"
import { ArrowLeft, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function HonoreePage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useAuth()
  const { getHonoree } = useHonorees()

  const honoreeId = params.id as string
  const honoree = getHonoree(honoreeId)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user || !honoree) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Honoree not found</h2>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const completedCount = honoree.recognitions.filter((r) => r.status === "completed").length
  const totalCount = honoree.recognitions.length

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border">
            <div className="container mx-auto px-6 py-8">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>

              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={honoree.photo || "/placeholder.svg"} alt={honoree.name} />
                  <AvatarFallback className="text-2xl">{getInitials(honoree.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{honoree.name}</h1>
                  <p className="text-lg text-muted-foreground">{honoree.project}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(honoree.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{honoree.state}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-accent">
                    {completedCount}/{totalCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Recognitions Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recognition Cards */}
          <div className="container mx-auto px-6 py-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Official Recognitions</h2>
              <p className="text-muted-foreground">
                Track and manage all official recognitions for {honoree.name.split(" ")[0]}.
              </p>

              <div className="grid gap-4 mt-6">
                {honoree.recognitions.map((recognition) => (
                  <RecognitionCard key={recognition.id} recognition={recognition} honoreeId={honoree.id} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
