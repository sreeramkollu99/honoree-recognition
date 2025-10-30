"use client"

import type React from "react"

import { useState } from "react"
import { useHonorees } from "@/context/honoree-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddHonoreeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddHonoreeDialog({ open, onOpenChange }: AddHonoreeDialogProps) {
  const { addHonoree } = useHonorees()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    dateOfBirth: "",
    state: "",
    photo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.project || !formData.dateOfBirth || !formData.state) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    addHonoree({
      name: formData.name,
      project: formData.project,
      dateOfBirth: formData.dateOfBirth,
      state: formData.state,
      photo: formData.photo || undefined,
      recognitions: [],
    })

    toast({
      title: "Honoree added!",
      description: `${formData.name} has been added to your dashboard.`,
    })

    // Reset form
    setFormData({
      name: "",
      project: "",
      dateOfBirth: "",
      state: "",
      photo: "",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Honoree</DialogTitle>
          <DialogDescription>Enter the details of the person you want to recognize.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">
                Project/Achievement <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="project"
                placeholder="Eagle Scout Project, Science Fair Winner, etc."
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="state"
                  placeholder="CA"
                  maxLength={2}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL (optional)</Label>
              <Input
                id="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Honoree</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
