"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Honoree } from "@/context/honoree-context"
import { Calendar, Award } from "lucide-react"

interface HonoreeCardProps {
  honoree: Honoree
}

export function HonoreeCard({ honoree }: HonoreeCardProps) {
  const router = useRouter()

  const completedCount = honoree.recognitions.filter((r) => r.status === "completed").length
  const totalCount = honoree.recognitions.length
  const progressPercentage = (completedCount / totalCount) * 100

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/honoree/${honoree.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={honoree.photo || "/placeholder.svg"} alt={honoree.name} />
            <AvatarFallback className="text-lg">{getInitials(honoree.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight truncate">{honoree.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{honoree.project}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{new Date(honoree.dateOfBirth).toLocaleDateString()}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedCount} of {totalCount}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-2">
          {honoree.recognitions.slice(0, 3).map((recognition) => (
            <Badge
              key={recognition.id}
              variant={recognition.status === "completed" ? "default" : "secondary"}
              className="text-xs"
            >
              <Award className="h-3 w-3 mr-1" />
              {recognition.type.split("-")[0]}
            </Badge>
          ))}
          {honoree.recognitions.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{honoree.recognitions.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
