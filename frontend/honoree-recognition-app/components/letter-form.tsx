"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface LetterFormProps {
  letterData: {
    recipientName: string
    recipientTitle: string
    honoreeName: string
    project: string
    date: string
    state: string
    additionalDetails: string
  }
  setLetterData: React.Dispatch<React.SetStateAction<any>>
  letterType: string
}

export function LetterForm({ letterData, setLetterData, letterType }: LetterFormProps) {
  const updateField = (field: string, value: string) => {
    setLetterData((prev: any) => ({ ...prev, [field]: value }))
  }

  const getRecipientPlaceholder = () => {
    if (letterType === "governor-letter") return "Governor [Last Name]"
    if (letterType === "presidential-greeting") return "The President"
    return "Recipient Name"
  }

  const getTitlePlaceholder = () => {
    if (letterType === "governor-letter") return "Governor of [State]"
    if (letterType === "presidential-greeting") return "President of the United States"
    return "Title"
  }

  return (
    <Card className="h-fit sticky top-6">
      <CardHeader>
        <CardTitle>Letter Details</CardTitle>
        <CardDescription>Fill in the information to generate your letter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            id="recipientName"
            placeholder={getRecipientPlaceholder()}
            value={letterData.recipientName}
            onChange={(e) => updateField("recipientName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientTitle">Recipient Title</Label>
          <Input
            id="recipientTitle"
            placeholder={getTitlePlaceholder()}
            value={letterData.recipientTitle}
            onChange={(e) => updateField("recipientTitle", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="honoreeName">Honoree Name</Label>
          <Input
            id="honoreeName"
            value={letterData.honoreeName}
            onChange={(e) => updateField("honoreeName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project">Project/Achievement</Label>
          <Textarea
            id="project"
            value={letterData.project}
            onChange={(e) => updateField("project", e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" value={letterData.date} onChange={(e) => updateField("date", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              maxLength={2}
              value={letterData.state}
              onChange={(e) => updateField("state", e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
          <Textarea
            id="additionalDetails"
            placeholder="Any additional information to include in the letter..."
            value={letterData.additionalDetails}
            onChange={(e) => updateField("additionalDetails", e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
