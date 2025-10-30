import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Honoree } from "@/context/honoree-context"
import { Award, CheckCircle } from "lucide-react"

interface ProgressTrackerProps {
  honorees: Honoree[]
}

export function ProgressTracker({ honorees }: ProgressTrackerProps) {
  const totalRecognitions = honorees.reduce((sum, h) => sum + h.recognitions.length, 0)
  const completedRecognitions = honorees.reduce(
    (sum, h) => sum + h.recognitions.filter((r) => r.status === "completed").length,
    0,
  )
  const progressPercentage = totalRecognitions > 0 ? (completedRecognitions / totalRecognitions) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold">{completedRecognitions}</span>
            <span className="text-muted-foreground">of {totalRecognitions} recognitions completed</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="h-5 w-5" />
            <span className="text-sm">{honorees.length} honorees</span>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </CardContent>
    </Card>
  )
}
