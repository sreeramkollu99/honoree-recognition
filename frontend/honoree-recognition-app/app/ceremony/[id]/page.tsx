"use client"

import { useParams } from "next/navigation"
import { useHonorees } from "@/context/honoree-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CeremonyBanner } from "@/components/ceremony-banner"
import { Award, Download, Share2, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CeremonyPage() {
  const params = useParams()
  const { getHonoree } = useHonorees()
  const { toast } = useToast()

  const honoreeId = params.id as string
  const honoree = getHonoree(honoreeId)

  if (!honoree) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ceremony page not found</h2>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedRecognitions = honoree.recognitions.filter((r) => r.status === "completed")
  const inProgressRecognitions = honoree.recognitions.filter((r) => r.status === "in-progress")

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied!",
        description: "Ceremony page link copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Share this page",
        description: url,
      })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl">HonorTrack</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Ceremony Banner */}
      <CeremonyBanner honoree={honoree} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Achievements Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Achievements & Recognitions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {honoree.recognitions.map((recognition) => (
              <Card key={recognition.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        recognition.status === "completed"
                          ? "bg-green-500/10"
                          : recognition.status === "in-progress"
                            ? "bg-amber-500/10"
                            : "bg-muted"
                      }`}
                    >
                      {recognition.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : recognition.status === "in-progress" ? (
                        <Clock className="h-6 w-6 text-amber-600" />
                      ) : (
                        <Award className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <Badge variant={recognition.status === "completed" ? "default" : "secondary"}>
                      {recognition.status === "completed"
                        ? "Completed"
                        : recognition.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{recognition.title}</h3>
                  <p className="text-sm text-muted-foreground">{recognition.description}</p>
                  {recognition.dateCompleted && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Completed {new Date(recognition.dateCompleted).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Letters & Certificates Section */}
        {completedRecognitions.length > 0 && (
          <section className="bg-card rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Letters & Certificates</h2>
            <div className="space-y-4">
              {completedRecognitions.map((recognition) => (
                <div
                  key={recognition.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{recognition.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {recognition.dateCompleted &&
                          new Date(recognition.dateCompleted).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </p>
                    </div>
                  </div>
                  {recognition.fileUrl && (
                    <Button onClick={() => window.open(recognition.fileUrl, "_blank")} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">{completedRecognitions.length}</div>
                <div className="text-sm text-muted-foreground">Completed Recognitions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">{inProgressRecognitions.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">{honoree.recognitions.length}</div>
                <div className="text-sm text-muted-foreground">Total Recognitions</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Created with HonorTrack - Celebrating excellence, one recognition at a time.</p>
        </div>
      </footer>
    </div>
  )
}
