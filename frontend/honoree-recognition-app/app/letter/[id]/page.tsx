"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useHonorees } from "@/context/honoree-context"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { LetterForm } from "@/components/letter-form"
import { LetterPreview } from "@/components/letter-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LetterGeneratorPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { user, isLoading } = useAuth()
  const { getHonoree } = useHonorees()

  const honoreeId = params.id as string
  const letterType = searchParams.get("type") as string
  const honoree = getHonoree(honoreeId)

  const [letterData, setLetterData] = useState({
    recipientName: "",
    recipientTitle: "",
    honoreeName: honoree?.name || "",
    project: honoree?.project || "",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    state: honoree?.state || "",
    additionalDetails: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (honoree) {
      setLetterData((prev) => ({
        ...prev,
        honoreeName: honoree.name,
        project: honoree.project,
        state: honoree.state,
      }))
    }
  }, [honoree])

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto px-6 py-8">
            <Link href={`/honoree/${honoreeId}`}>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {honoree.name}
              </Button>
            </Link>

            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Letter Generator</h1>
              <p className="text-muted-foreground mt-1">Create a personalized {letterType?.replace("-", " ")} letter</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <LetterForm letterData={letterData} setLetterData={setLetterData} letterType={letterType} />
              <LetterPreview letterData={letterData} letterType={letterType} honoreeId={honoreeId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
