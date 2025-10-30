import { Badge } from "@/components/ui/badge"
import type { Recognition } from "@/context/honoree-context"
import { CheckCircle, Clock, Circle } from "lucide-react"

interface StatusBadgeProps {
  status: Recognition["status"]
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    pending: {
      label: "Pending",
      variant: "secondary" as const,
      icon: Circle,
    },
    "in-progress": {
      label: "In Progress",
      variant: "default" as const,
      icon: Clock,
    },
    completed: {
      label: "Completed",
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-500 hover:bg-green-600",
    },
  }

  const { label, variant, icon: Icon, className } = config[status]

  return (
    <Badge variant={variant} className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  )
}
