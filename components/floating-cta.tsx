"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingCTAProps {
  onNavigate?: (section: string) => void
}

export function FloatingCTA({ onNavigate }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        className="bg-[#00609D] hover:bg-[#0078c2] text-white shadow-lg rounded-full px-6 py-6 h-auto gap-2 transition-all hover:scale-105"
        size="lg"
        onClick={() => onNavigate?.("karir")}
      >
        Cari Karir
        <Search className="w-5 h-5" />
      </Button>
    </div>
  )
}
