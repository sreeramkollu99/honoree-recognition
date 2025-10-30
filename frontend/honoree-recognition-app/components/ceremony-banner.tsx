import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Honoree } from "@/context/honoree-context"
import { Calendar, MapPin, Award } from "lucide-react"

interface CeremonyBannerProps {
  honoree: Honoree
}

export function CeremonyBanner({ honoree }: CeremonyBannerProps) {
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
    <div className="relative bg-gradient-to-r from-accent/20 via-accent/10 to-background border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Avatar className="h-32 w-32 mx-auto border-4 border-background shadow-xl">
            <AvatarImage src={honoree.photo || "/placeholder.svg"} alt={honoree.name} />
            <AvatarFallback className="text-4xl">{getInitials(honoree.name)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{honoree.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{honoree.project}</p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(honoree.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{honoree.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>
                  {completedCount} of {totalCount} recognitions
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "Excellence is not a destination; it is a continuous journey that never ends."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
