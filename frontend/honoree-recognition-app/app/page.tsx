import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, FileText, Medal } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl">HonorTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Celebrate Achievements with <span className="text-accent">Official Recognition</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Track and manage official recognitions for your honorees. From Capitol flags to Presidential greetings,
              streamline every milestone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8">
                  Start Tracking
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Honor Excellence</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor recognition status with visual progress indicators and real-time updates.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Generate Letters</h3>
              <p className="text-muted-foreground">
                Create personalized letters for governors, representatives, and officials instantly.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Medal className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Celebrate Publicly</h3>
              <p className="text-muted-foreground">
                Share achievement pages with families and communities to celebrate success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 HonorTrack. Celebrating excellence, one recognition at a time.</p>
        </div>
      </footer>
    </div>
  )
}
