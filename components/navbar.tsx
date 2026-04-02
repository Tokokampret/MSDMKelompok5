"use client"
import Image from "next/image"
import * as React from "react"
import Link from "next/link"
import { 
  Home, 
  Mail, 
  ChevronDown, 
  User, 
  Briefcase, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface NavbarProps {
  user?: {
    name: string
    avatar?: string
    initials: string
  }
  onNavigate?: (section: string) => void
  onLogout?: () => void
  activeSection?: string
}

export function Navbar({ user, onNavigate, onLogout, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navLinks = [
    { href: "#", label: "Beranda", icon: Home },
    { href: "#karir", label: "Karir", id: "karir" },
    { href: "#magang", label: "Magang", id: "magang" },
    { href: "#beasiswa", label: "Beasiswa", id: "beasiswa" },
  ]

  return (
    <>
      {/* Alert Banner */}
      <div className="bg-[#F68B1F] text-white py-2 px-4 text-center text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="bg-white text-[#F68B1F] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</span>
          <span className="font-semibold">PERHATIAN</span>
          {" "}Examine Industry tidak memungut biaya apapun selama proses pendaftaran dan seleksi karir berlangsung.
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#00609D] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
  <Image 
    src="/Logo.jpeg" 
    alt="Logo" 
    width={40} 
    height={40} 
    className="object-contain"
  />
</div>
              <span className="font-bold text-xl hidden sm:block">Examine Industry</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.id && onNavigate) {
                      e.preventDefault()
                      onNavigate(link.id)
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10",
                    activeSection === link.id && "bg-white/20"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4 inline mr-1" />}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/10 relative"
                    aria-label="Messages"
                    onClick={() => onNavigate?.("pesan")}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#F68B1F] rounded-full" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 text-white hover:bg-white/10 px-2"
                      >
                        <Avatar className="w-8 h-8 border-2 border-white/30">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#0078c2] text-white text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:block font-medium text-sm max-w-[150px] truncate">
                          {user.name}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem 
                        onClick={() => onNavigate?.("profil")}
                        className="cursor-pointer"
                      >
                        <User className="w-4 h-4 mr-2 text-[#00609D]" />
                        Profil Saya
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onNavigate?.("riwayat")}
                        className="cursor-pointer"
                      >
                        <Briefcase className="w-4 h-4 mr-2 text-[#00609D]" />
                        Riwayat Lamaran
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onNavigate?.("reset-password")}
                        className="cursor-pointer"
                      >
                        <Settings className="w-4 h-4 mr-2 text-[#00609D]" />
                        Pengaturan Kata Sandi
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={onLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#00609D]"
                >
                  Masuk
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.id && onNavigate) {
                      e.preventDefault()
                      onNavigate(link.id)
                    }
                    setMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
