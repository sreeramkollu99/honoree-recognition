"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useHonorees } from "@/context/honoree-context"
import { useRouter } from "next/navigation"
import { getLetterTemplate } from "@/utils/templates"

interface LetterPreviewProps {
  letterData: {
    recipientName: string
    recipientTitle: string
    honoreeName: string
    project: string
    date: string
    state: string
    additionalDetails: string
  }
  letterType: string
  honoreeId: string
}

export function LetterPreview({ letterData, letterType, honoreeId }: LetterPreviewProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const { updateRecognitionStatus, getHonoree } = useHonorees()
  const router = useRouter()

  const letterContent = getLetterTemplate(letterType, letterData)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letterContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Letter text copied to clipboard.",
    })
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([letterContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${letterType}-${letterData.honoreeName.replace(/\s+/g, "-")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Downloaded!",
      description: "Letter has been downloaded.",
    })
  }

  const handleSave = () => {
    const honoree = getHonoree(honoreeId)
    if (honoree) {
      const recognition = honoree.recognitions.find((r) => r.type === letterType)
      if (recognition) {
        updateRecognitionStatus(honoreeId, recognition.id, "in-progress")
        toast({
          title: "Letter saved!",
          description: "Recognition status updated to in progress.",
        })
        router.push(`/honoree/${honoreeId}`)
      }
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white text-black p-8 rounded-lg shadow-inner min-h-[600px] font-serif">
            <div className="whitespace-pre-wrap leading-relaxed">{letterContent}</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDownload} size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handleCopy} variant="outline" size="lg">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Copy Text"}
        </Button>
        <Button onClick={handleSave} variant="outline" size="lg">
          Save & Return
        </Button>
      </div>
    </div>
  )
}
