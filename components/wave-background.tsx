"use client"

import { cn } from "@/lib/utils"

interface WaveBackgroundProps {
  children: React.ReactNode
  className?: string
  showDots?: boolean
}

export function WaveBackground({ children, className, showDots = true }: WaveBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Wave SVG Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00609D] via-[#0078c2] to-[#00609D]">
        {/* Decorative wave shapes */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            fill="rgba(255,255,255,0.05)" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path 
            fill="rgba(255,255,255,0.08)" 
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 border-4 border-cyan-400/30 rounded-2xl rotate-12 hidden md:block" />
        <div className="absolute bottom-40 right-10 w-40 h-40 md:w-56 md:h-56 border-4 border-[#F68B1F]/30 rounded-2xl -rotate-12 hidden md:block" />
        
        {/* Dot patterns */}
        {showDots && (
          <>
            <div className="absolute top-40 left-20 hidden lg:grid grid-cols-6 gap-3 opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full" />
              ))}
            </div>
            <div className="absolute top-60 right-40 hidden lg:grid grid-cols-6 gap-3 opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full" />
              ))}
            </div>
            <div className="absolute bottom-60 left-40 hidden lg:grid grid-cols-4 gap-3 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full" />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function ContentCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-xl p-6 md:p-8",
      className
    )}>
      {children}
    </div>
  )
}
