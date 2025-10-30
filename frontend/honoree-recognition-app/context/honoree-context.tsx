"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Recognition {
  id: string
  type: "capitol-flag" | "governor-letter" | "presidential-greeting" | "nasa-cert" | "dod-cert"
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  dateCompleted?: string
  fileUrl?: string
}

export interface Honoree {
  id: string
  name: string
  photo?: string
  project: string
  dateOfBirth: string
  state: string
  recognitions: Recognition[]
  createdAt: string
}

interface HonoreeContextType {
  honorees: Honoree[]
  addHonoree: (honoree: Omit<Honoree, "id" | "createdAt">) => void
  updateHonoree: (id: string, updates: Partial<Honoree>) => void
  deleteHonoree: (id: string) => void
  getHonoree: (id: string) => Honoree | undefined
  updateRecognitionStatus: (
    honoreeId: string,
    recognitionId: string,
    status: Recognition["status"],
    fileUrl?: string,
  ) => void
}

const HonoreeContext = createContext<HonoreeContextType | undefined>(undefined)

const defaultRecognitions: Recognition[] = [
  {
    id: "1",
    type: "capitol-flag",
    title: "Capitol Flag",
    description: "Order a flag flown over the U.S. Capitol",
    status: "pending",
  },
  {
    id: "2",
    type: "governor-letter",
    title: "Governor's Letter",
    description: "Request state recognition letter",
    status: "pending",
  },
  {
    id: "3",
    type: "presidential-greeting",
    title: "Presidential Greeting",
    description: "Request greeting via Congress office",
    status: "pending",
  },
//   {
//     id: "4",
//     type: "nasa-cert",
//     title: "NASA Certificate",
//     description: "Download free NASA achievement certificate",
//     status: "pending",
//   },
  {
    id: "5",
    type: "dod-cert",
    title: "Department of Defense Certificate",
    description: "Download free DoD certificate",
    status: "pending",
  },
]

export function HonoreeProvider({ children }: { children: ReactNode }) {
  const [honorees, setHonorees] = useState<Honoree[]>([])

  const addHonoree = (honoreeData: Omit<Honoree, "id" | "createdAt">) => {
    const newHonoree: Honoree = {
      ...honoreeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      recognitions: defaultRecognitions,
    }
    setHonorees([...honorees, newHonoree])
  }

  const updateHonoree = (id: string, updates: Partial<Honoree>) => {
    setHonorees(honorees.map((h) => (h.id === id ? { ...h, ...updates } : h)))
  }

  const deleteHonoree = (id: string) => {
    setHonorees(honorees.filter((h) => h.id !== id))
  }

  const getHonoree = (id: string) => {
    return honorees.find((h) => h.id === id)
  }

  const updateRecognitionStatus = (
    honoreeId: string,
    recognitionId: string,
    status: Recognition["status"],
    fileUrl?: string,
  ) => {
    setHonorees(
      honorees.map((h) => {
        if (h.id === honoreeId) {
          return {
            ...h,
            recognitions: h.recognitions.map((r) => {
              if (r.id === recognitionId) {
                return {
                  ...r,
                  status,
                  ...(status === "completed" && { dateCompleted: new Date().toISOString() }),
                  ...(fileUrl && { fileUrl }),
                }
              }
              return r
            }),
          }
        }
        return h
      }),
    )
  }

  return (
    <HonoreeContext.Provider
      value={{
        honorees,
        addHonoree,
        updateHonoree,
        deleteHonoree,
        getHonoree,
        updateRecognitionStatus,
      }}
    >
      {children}
    </HonoreeContext.Provider>
  )
}

export function useHonorees() {
  const context = useContext(HonoreeContext)
  if (context === undefined) {
    throw new Error("useHonorees must be used within a HonoreeProvider")
  }
  return context
}
