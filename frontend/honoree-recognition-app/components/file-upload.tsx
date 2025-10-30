"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, LinkIcon } from "lucide-react"

interface FileUploadProps {
  onUpload: (fileUrl: string) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [fileUrl, setFileUrl] = useState("")
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fileUrl) {
      onUpload(fileUrl)
      setFileUrl("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a storage service
      // For now, we'll create a mock URL
      const mockUrl = URL.createObjectURL(file)
      setFileUrl(mockUrl)
    }
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-muted/50 space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={uploadMethod === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMethod("url")}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          URL
        </Button>
        <Button
          type="button"
          variant={uploadMethod === "file" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMethod("file")}
        >
          <Upload className="h-4 w-4 mr-2" />
          File
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {uploadMethod === "url" ? (
          <div className="space-y-2">
            <Label htmlFor="fileUrl">File URL</Label>
            <Input
              id="fileUrl"
              type="url"
              placeholder="https://example.com/document.pdf"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="fileInput">Choose File</Label>
            <Input id="fileInput" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
          </div>
        )}

        <Button type="submit" size="sm" disabled={!fileUrl}>
          <Upload className="h-4 w-4 mr-2" />
          Upload & Mark Complete
        </Button>
      </form>
    </div>
  )
}
