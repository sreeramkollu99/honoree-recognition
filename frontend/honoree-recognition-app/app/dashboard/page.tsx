"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useHonorees } from "@/context/honoree-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { HonoreeCard } from "@/components/honoree-card"
import { ProgressTracker } from "@/components/progress-tracker"
import { AddHonoreeDialog } from "@/components/add-honoree-dialog"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { honorees } = useHonorees()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage and track your honorees</p>
              </div>
            </div>

            {/* Progress Tracker */}
            {honorees.length > 0 && <ProgressTracker honorees={honorees} />}

            {/* Honorees Grid */}
            {honorees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No honorees yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Get started by adding your first honoree to begin tracking their recognitions.
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Honoree
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {honorees.map((honoree) => (
                  <HonoreeCard key={honoree.id} honoree={honoree} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Add Button */}
      {honorees.length > 0 && (
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Add Honoree Dialog */}
      <AddHonoreeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
