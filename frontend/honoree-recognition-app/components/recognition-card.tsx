"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { FileUpload } from "@/components/file-upload"
import type { Recognition } from "@/context/honoree-context"
import { useHonorees } from "@/context/honoree-context"
import { ExternalLink, FileText, Download, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RecognitionCardProps {
  recognition: Recognition
  honoreeId: string
}

const recognitionConfig = {
  "capitol-flag": {
    icon: "🏛️",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    link: "https://www.aoc.gov/what-we-do/programs-ceremonies/flags",
    linkText: "Order Flag",
  },
  "governor-letter": {
    icon: "📜",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    link: null,
    linkText: "Generate Letter",
  },
  "presidential-greeting": {
    icon: "🇺🇸",
    color: "bg-red-500/10 text-red-700 dark:text-red-400",
    link: null,
    linkText: "Generate Letter",
  },
//   "nasa-cert": {
//     icon: "🚀",
//     color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
//     link: "https://www.nasa.gov/stem-content/certificates/",
//     linkText: "Download Certificate",
//   },
  "dod-cert": {
    icon: "⭐",
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
    link: "https://www.defense.gov/",
    linkText: "Visit DoD Site",
  },
}

export function RecognitionCard({ recognition, honoreeId }: RecognitionCardProps) {
  const router = useRouter()
  const { updateRecognitionStatus } = useHonorees()
  const { toast } = useToast()
  const [showUpload, setShowUpload] = useState(false)

  const config = recognitionConfig[recognition.type]

  const handleGenerateLetter = () => {
    router.push(`/letter/${honoreeId}?type=${recognition.type}`)
  }

  const handleExternalLink = () => {
    if (config.link) {
      window.open(config.link, "_blank")
    }
  }

  const handleFileUpload = (fileUrl: string) => {
    updateRecognitionStatus(honoreeId, recognition.id, "completed", fileUrl)
    setShowUpload(false)
    toast({
      title: "File uploaded!",
      description: "Recognition marked as completed.",
    })
  }

  const handleMarkInProgress = () => {
    updateRecognitionStatus(honoreeId, recognition.id, "in-progress")
    toast({
      title: "Status updated",
      description: "Recognition marked as in progress.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${config.color}`}>
              {config.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-xl">{recognition.title}</CardTitle>
                <StatusBadge status={recognition.status} />
              </div>
              <CardDescription className="mt-1">{recognition.description}</CardDescription>
              {recognition.dateCompleted && (
                <p className="text-xs text-muted-foreground mt-2">
                  Completed on {new Date(recognition.dateCompleted).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {/* Generate Letter or External Link */}
          {recognition.type === "governor-letter" || recognition.type === "presidential-greeting" ? (
            <Button onClick={handleGenerateLetter} variant="default">
              <FileText className="h-4 w-4 mr-2" />
              {config.linkText}
            </Button>
          ) : (
            <Button onClick={handleExternalLink} variant="default">
              <ExternalLink className="h-4 w-4 mr-2" />
              {config.linkText}
            </Button>
          )}

          {/* Upload Button */}
          {recognition.status !== "completed" && (
            <>
              <Button onClick={() => setShowUpload(!showUpload)} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>

              {recognition.status === "pending" && (
                <Button onClick={handleMarkInProgress} variant="outline">
                  Mark In Progress
                </Button>
              )}
            </>
          )}

          {/* Download if completed */}
          {recognition.status === "completed" && recognition.fileUrl && (
            <Button onClick={() => window.open(recognition.fileUrl, "_blank")} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              View File
            </Button>
          )}
        </div>

        {/* File Upload Component */}
        {showUpload && (
          <div className="mt-4">
            <FileUpload onUpload={handleFileUpload} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
