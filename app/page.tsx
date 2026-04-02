"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { WaveBackground, ContentCard } from "@/components/wave-background"
import { ProfileSection } from "@/components/profile-section"
import { ApplicationHistory, ApplicationDetailView } from "@/components/application-history"
import { MessagesSection, mockMessages } from "@/components/messages-section"
import { CareerSection, mockJobs } from "@/components/career-section"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Briefcase, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock user data
const mockUser = {
  name: "CRISTIANO RONALDO",
  avatar: "",
  initials: "CR",
}

// Mock profile data
const mockProfile = {
  name: "CRISTIANO RONALDO",
  avatar: "",
  initials: "CR",
  email: "CRISTIANALDOWIDJAJA@GMAIL.COM",
  phone: "08986081533",
  altPhone: "",
  birthPlace: "PONTIANAK",
  birthDate: "28 Mei 2005",
  gender: "LAKI-LAKI" as const,
  religion: "KATOLIK",
  maritalStatus: "LAJANG",
  idNumber: "6171052805050007",
  // Extended address info
  lastEducation: "DIPLOMA 4/STRATA 1",
  address: "JL. PANGLIMA AIM",
  province: "KALIMANTAN BARAT",
  city: "PONTIANAK",
  district: "PONTIANAK TIMUR",
  village: "DALAM BUGIS",
  rtRw: "000/000",
  postalCode: "78235",
}

// Mock education data
const mockEducation = [
  {
    id: "1",
    level: "SMA/SMK",
    schoolName: "SMAK IMMANUEL",
    graduationYear: "2023",
    major: "MIPA MANDARIN",
    grade: "81.86",
    gradeLabel: "Nilai Rata-Rata",
  },
  {
    id: "2",
    level: "DIPLOMA 4/STRATA 1",
    schoolName: "UNIVERSITAS WIDYA DHARMA PONTIANAK",
    graduationYear: "2027",
    major: "BISNIS DIGITAL",
    grade: "3.16",
    gradeLabel: "IPK Akhir",
  },
]

// Mock work experience data
const mockWorkExperience = [
  {
    id: "1",
    companyName: "Duta Media Elektronik",
    lastPosition: "Admin Sosial Media",
    description: "Mengelola akun media sosial dan memastikan respons yang cepat terhadap pelanggan. Membuat konten promosi sederhana sesuai kebutuhan produk serta membantu pencatatan data penjualan dan aktivitas promosi. Berkoordinasi dengan tim untuk memastikan informasi produk tersampaikan dengan jelas dan menjaga konsistensi komunikasi brand di platform digital.",
    isCurrentJob: false,
    startDate: "1 Okt 2022",
    endDate: "1 Des 2025",
  },
  {
    id: "2",
    companyName: "PT. Teknologi Nusantara",
    lastPosition: "Junior Data Analyst",
    description: "Menganalisis data penjualan dan membuat laporan bulanan untuk manajemen.",
    isCurrentJob: true,
    startDate: "1 Jan 2026",
    endDate: undefined,
  },
]

// Mock skills data
const mockSkills = [
  "ADOBE CREATIVE SUITE (ADOBE PHOTOSHOP, ILLUSTRATOR, INDESIGN, DLL.)",
  "KETELITIAN",
  "PEMAHAMAN BISNIS",
  "KOMUNIKASI",
  "BERPIKIR KRITIS",
  "ENTRI DATA",
  "ANALISIS DATA",
  "EXCEL",
  "INISIATIF",
  "MANAJEMEN WAKTU",
]

// Mock social media data
const mockSocialMedia = {
  instagram: "nnosferatu",
  facebook: "https://www.facebook.com/cristianaldowidjaja",
  x: "",
  linkedin: "",
}

// Mock documents data
const mockDocuments = [
  {
    id: "1",
    name: "Curriculum Vitae",
    type: "cv" as const,
    fileName: "CV_Cristiano_Ronaldo_2026.pdf",
    uploadDate: "15 Mar 2026",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    name: "Portfolio Design",
    type: "portfolio" as const,
    fileName: "Portfolio_Design_2026.pdf",
    uploadDate: "15 Mar 2026",
    fileSize: "8.2 MB",
  },
]

// Mock applications data
const mockApplications = [
  {
    id: "1",
    position: "MGB WIL 11 - PONTIANAK",
    date: "19 Maret 2026 03:51 (UTC+7)",
    status: "TES ONLINE",
    statusType: "info" as const,
  },
  {
    id: "2",
    position: "ANALYST PROGRAM IT",
    date: "15 Maret 2026 10:20 (UTC+7)",
    status: "SELEKSI ADMINISTRASI",
    statusType: "info" as const,
  },
  {
    id: "3",
    position: "MANAGEMENT TRAINEE",
    date: "10 Maret 2026 14:30 (UTC+7)",
    status: "LAMARAN BERHASIL",
    statusType: "success" as const,
  },
  {
    id: "4",
    position: "DATA ANALYST",
    date: "05 Maret 2026 09:15 (UTC+7)",
    status: "WAWANCARA HR",
    statusType: "warning" as const,
  },
]

// Mock application detail
const mockApplicationDetail = {
  position: "MGB WIL 11 - PONTIANAK",
  registrationDate: "19 Maret 2026 03:51 (UTC+7)",
  history: [
    {
      id: "1",
      date: "26 Maret 2026 14:54 (UTC+7)",
      stage: "TES ONLINE",
      type: "MAGANG BAKTI",
    },
    {
      id: "2",
      date: "19 Maret 2026 03:51 (UTC+7)",
      stage: "SELEKSI ADMINISTRASI",
      type: "MAGANG BAKTI",
    },
    {
      id: "3",
      date: "19 Maret 2026 03:51 (UTC+7)",
      stage: "LAMARAN BERHASIL",
      type: "MAGANG BAKTI",
    },
  ],
}

type ViewType = "profil" | "riwayat" | "detail-riwayat" | "pesan" | "karir"

export default function RecruitmentPortal() {
  const [currentView, setCurrentView] = React.useState<ViewType>("profil")
  const [selectedApplicationId, setSelectedApplicationId] = React.useState<string | null>(null)

  const handleNavigate = (section: string) => {
    if (section === "profil" || section === "riwayat" || section === "pesan" || section === "karir") {
      setCurrentView(section)
      setSelectedApplicationId(null)
    }
  }

  const handleViewDetail = (id: string) => {
    setSelectedApplicationId(id)
    setCurrentView("detail-riwayat")
  }

  const handleBack = () => {
    if (currentView === "detail-riwayat") {
      setCurrentView("riwayat")
      setSelectedApplicationId(null)
    } else if (currentView === "karir") {
      setCurrentView("profil")
    } else if (currentView !== "profil") {
      setCurrentView("profil")
    }
  }

  const getPageTitle = () => {
    switch (currentView) {
      case "profil":
        return "Profil Saya"
      case "riwayat":
        return "Riwayat Lamaran"
      case "detail-riwayat":
        return "Detail Riwayat Lamaran"
      case "pesan":
        return "Pesan"
      case "karir":
        return "Karir"
      default:
        return "Profil Saya"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={mockUser} 
        onNavigate={handleNavigate}
        activeSection={currentView}
      />

      <main className="flex-1">
        <WaveBackground>
          <div className="px-4 py-8 md:py-12">
            {/* Page Header */}
            <div className="max-w-6xl mx-auto mb-6">
              <div className="flex items-center gap-4">
                {currentView !== "profil" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="text-white hover:bg-white/10"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </Button>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - Desktop (hidden on karir view) */}
                {currentView !== "karir" && (
                  <aside className="hidden lg:block w-64 flex-shrink-0">
                    <ContentCard className="p-4 sticky top-24">
                      <nav className="space-y-1">
                        <SidebarItem
                          icon={<User className="w-5 h-5" />}
                          label="Profil Saya"
                          active={currentView === "profil"}
                          onClick={() => handleNavigate("profil")}
                        />
                        <SidebarItem
                          icon={<Briefcase className="w-5 h-5" />}
                          label="Riwayat Lamaran"
                          active={currentView === "riwayat" || currentView === "detail-riwayat"}
                          onClick={() => handleNavigate("riwayat")}
                        />
                        <SidebarItem
                          icon={<MessageSquare className="w-5 h-5" />}
                          label="Pesan"
                          active={currentView === "pesan"}
                          onClick={() => handleNavigate("pesan")}
                        />
                      </nav>
                    </ContentCard>
                  </aside>
                )}

                {/* Mobile Tab Navigation (hidden on karir view) */}
                {currentView !== "karir" && (
                  <div className="lg:hidden flex gap-2 mb-4">
                    <Button
                      variant={currentView === "profil" ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        currentView === "profil" 
                          ? "bg-[#00609D] hover:bg-[#0078c2] text-white" 
                          : "bg-white/90 border-0 text-gray-700"
                      )}
                      onClick={() => handleNavigate("profil")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profil Saya
                    </Button>
                    <Button
                      variant={(currentView === "riwayat" || currentView === "detail-riwayat") ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        (currentView === "riwayat" || currentView === "detail-riwayat")
                          ? "bg-[#00609D] hover:bg-[#0078c2] text-white" 
                          : "bg-white/90 border-0 text-gray-700"
                      )}
                      onClick={() => handleNavigate("riwayat")}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Riwayat Lamaran
                    </Button>
                  </div>
                )}

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <ContentCard>
                    {currentView === "profil" && (
                      <ProfileSection 
                        profile={mockProfile}
                        education={mockEducation}
                        workExperience={mockWorkExperience}
                        skills={mockSkills}
                        socialMedia={mockSocialMedia}
                        documents={mockDocuments}
                      />
                    )}

                    {currentView === "riwayat" && (
                      <ApplicationHistory 
                        applications={mockApplications}
                        onViewDetail={handleViewDetail}
                      />
                    )}

                    {currentView === "detail-riwayat" && (
                      <ApplicationDetailView detail={mockApplicationDetail} />
                    )}

                    {currentView === "pesan" && (
                      <MessagesSection messages={mockMessages} />
                    )}

                    {currentView === "karir" && (
                      <CareerSection jobs={mockJobs} userName={mockUser.name} />
                    )}
                  </ContentCard>
                </div>
              </div>
            </div>
          </div>
        </WaveBackground>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  )
}

// Sidebar Item Component
function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors",
        active 
          ? "bg-[#00609D] text-white" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </button>
  )
}
