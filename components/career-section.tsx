"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Building2, 
  Users, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Filter
} from "lucide-react"

export interface JobListing {
  id: string
  title: string
  location: string
  department: string
  type: "Full-Time" | "Part-Time" | "Magang" | "Kontrak"
  level: string
  postedDate: string
  closingDate: string
  description: string
  requirements: string[]
  benefits: string[]
  quota: number
}

interface CareerSectionProps {
  jobs: JobListing[]
  userName?: string
}

export function CareerSection({ jobs, userName = "Pelamar" }: CareerSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [locationFilter, setLocationFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [selectedJob, setSelectedJob] = React.useState<JobListing | null>(null)
  const [showDetail, setShowDetail] = React.useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false)
  const [appliedJobTitle, setAppliedJobTitle] = React.useState("")

  const locations = React.useMemo(() => {
    const locs = [...new Set(jobs.map(job => job.location))]
    return locs.sort()
  }, [jobs])

  const filteredJobs = React.useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLocation = locationFilter === "all" || job.location === locationFilter
      const matchesType = typeFilter === "all" || job.type === typeFilter
      return matchesSearch && matchesLocation && matchesType
    })
  }, [jobs, searchQuery, locationFilter, typeFilter])

  const handleApply = (job: JobListing) => {
    setAppliedJobTitle(job.title)
    setShowDetail(false)
    setSelectedJob(null)
    setShowSuccessDialog(true)
  }

  const handleViewDetail = (job: JobListing) => {
    setSelectedJob(job)
    setShowDetail(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lowongan Kerja</h2>
        <p className="text-gray-600">Temukan karir impian Anda di Examine Industry</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari posisi atau departemen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 h-11"
            />
          </div>
          <div className="flex gap-3">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-200 h-11">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[160px] bg-white border-gray-200 h-11">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Magang">Magang</SelectItem>
                <SelectItem value="Kontrak">Kontrak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold text-gray-900">{filteredJobs.length}</span> lowongan
        </p>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter Lanjutan
        </Button>
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onApply={() => handleApply(job)}
            onViewDetail={() => handleViewDetail(job)}
          />
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci atau filter pencarian Anda</p>
          </div>
        )}
      </div>

      {/* Job Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl md:text-2xl text-[#00609D]">
                      {selectedJob.title}
                    </DialogTitle>
                    <DialogDescription className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-[#00609D]/10 text-[#00609D] border-[#00609D]/20">
                        {selectedJob.type}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700">
                        {selectedJob.level}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Job Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoItem icon={<MapPin className="w-4 h-4" />} label="Lokasi" value={selectedJob.location} />
                  <InfoItem icon={<Building2 className="w-4 h-4" />} label="Departemen" value={selectedJob.department} />
                  <InfoItem icon={<Users className="w-4 h-4" />} label="Kuota" value={`${selectedJob.quota} orang`} />
                  <InfoItem icon={<Calendar className="w-4 h-4" />} label="Batas Waktu" value={selectedJob.closingDate} />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Persyaratan</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Benefit</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowDetail(false)}
                  >
                    Tutup
                  </Button>
                  <Button 
                    className="flex-1 bg-[#00609D] hover:bg-[#0078c2] text-white"
                    onClick={() => handleApply(selectedJob)}
                  >
                    Lamar Sekarang
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl text-gray-900 mb-3">
              Lamaran Berhasil!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              Selamat, {userName}! Lamaran Anda untuk posisi <span className="font-semibold text-gray-900">{appliedJobTitle}</span> telah berhasil dikirim. 
              Tim rekrutmen kami akan meninjau lamaran Anda dan menghubungi Anda melalui email yang terdaftar.
            </DialogDescription>
            <div className="bg-[#00609D]/5 rounded-xl p-4 text-left mb-6">
              <p className="text-sm text-[#00609D] font-medium mb-2">Informasi Penting:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>- Data profil Anda telah dilampirkan secara otomatis</li>
                <li>- Pantau email Anda untuk update selanjutnya</li>
                <li>- Cek menu Riwayat Lamaran untuk status terkini</li>
              </ul>
            </div>
            <Button 
              className="w-full bg-[#00609D] hover:bg-[#0078c2] text-white"
              onClick={() => setShowSuccessDialog(false)}
            >
              Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function JobCard({ 
  job, 
  onApply, 
  onViewDetail 
}: { 
  job: JobListing
  onApply: () => void
  onViewDetail: () => void 
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:border-[#00609D]/20 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#00609D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-[#00609D]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-[#00609D] cursor-pointer" onClick={onViewDetail}>
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.department}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.postedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:flex-shrink-0">
          <Badge 
            variant="outline" 
            className={
              job.type === "Full-Time" 
                ? "bg-blue-50 text-blue-700 border-blue-200" 
                : job.type === "Magang"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : job.type === "Kontrak"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-green-50 text-green-700 border-green-200"
            }
          >
            {job.type}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#00609D] text-[#00609D] hover:bg-[#00609D] hover:text-white"
            onClick={onViewDetail}
          >
            Detail
          </Button>
          <Button 
            size="sm"
            className="bg-[#00609D] hover:bg-[#0078c2] text-white"
            onClick={onApply}
          >
            Lamar
          </Button>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-[#00609D]">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

// Mock job data export
export const mockJobs: JobListing[] = [
  {
    id: "1",
    title: "MGB WIL 11 - PONTIANAK",
    location: "Pontianak",
    department: "Magang Bakti",
    type: "Magang",
    level: "Entry Level",
    postedDate: "19 Mar 2026",
    closingDate: "30 Apr 2026",
    description: "Program Magang Bakti adalah program pengembangan diri bagi lulusan SMA/SMK hingga S1 untuk mendapatkan pengalaman kerja di industri. Peserta akan ditempatkan di berbagai divisi sesuai dengan kebutuhan perusahaan.",
    requirements: [
      "Warga Negara Indonesia",
      "Pendidikan minimal SMA/SMK sederajat",
      "Usia maksimal 25 tahun",
      "Belum menikah dan bersedia tidak menikah selama program",
      "Sehat jasmani dan rohani",
      "Tidak memiliki hubungan keluarga dengan karyawan Examine Industry",
      "Bersedia ditempatkan di seluruh wilayah kerja"
    ],
    benefits: ["Uang Saku", "BPJS Kesehatan", "Sertifikat", "Pengalaman Kerja"],
    quota: 50
  },
  {
    id: "2",
    title: "IT Analyst Program",
    location: "Jakarta",
    department: "Information Technology",
    type: "Full-Time",
    level: "Entry Level",
    postedDate: "15 Mar 2026",
    closingDate: "25 Apr 2026",
    description: "IT Analyst Program adalah program rekrutmen untuk posisi analis IT yang akan bertanggung jawab dalam pengembangan dan pemeliharaan sistem informasi perusahaan.",
    requirements: [
      "Pendidikan minimal S1 Teknik Informatika/Sistem Informasi",
      "IPK minimal 3.00",
      "Usia maksimal 27 tahun",
      "Menguasai bahasa pemrograman (Java, Python, atau SQL)",
      "Memiliki kemampuan analisis yang baik",
      "Mampu bekerja dalam tim"
    ],
    benefits: ["Gaji Kompetitif", "BPJS", "Asuransi Kesehatan", "Bonus Tahunan", "Training"],
    quota: 20
  },
  {
    id: "3",
    title: "Management Development Program",
    location: "Jakarta",
    department: "Human Capital",
    type: "Full-Time",
    level: "Fresh Graduate",
    postedDate: "10 Mar 2026",
    closingDate: "20 Apr 2026",
    description: "Program pengembangan untuk calon pemimpin masa depan Examine Industry. Peserta akan mendapatkan rotasi di berbagai divisi untuk memahami bisnis secara menyeluruh.",
    requirements: [
      "Pendidikan minimal S1 dari semua jurusan",
      "IPK minimal 3.25",
      "Usia maksimal 25 tahun",
      "Memiliki pengalaman organisasi",
      "Kemampuan leadership yang baik",
      "Fasih berbahasa Inggris",
      "Bersedia ditempatkan di seluruh Indonesia"
    ],
    benefits: ["Gaji Kompetitif", "BPJS", "Asuransi Kesehatan", "Bonus", "Jenjang Karir", "Training Intensif"],
    quota: 15
  },
  {
    id: "4",
    title: "Data Analyst",
    location: "Jakarta",
    department: "Business Intelligence",
    type: "Full-Time",
    level: "Junior",
    postedDate: "05 Mar 2026",
    closingDate: "15 Apr 2026",
    description: "Bertanggung jawab dalam menganalisis data bisnis untuk memberikan insight yang mendukung pengambilan keputusan strategis perusahaan.",
    requirements: [
      "Pendidikan minimal S1 Statistika/Matematika/IT",
      "Pengalaman minimal 1 tahun di bidang terkait",
      "Menguasai SQL, Python, dan tools visualisasi data",
      "Memiliki kemampuan analytical thinking yang kuat",
      "Mampu mengkomunikasikan hasil analisis dengan baik"
    ],
    benefits: ["Gaji Kompetitif", "BPJS", "Asuransi", "Bonus", "Remote Working"],
    quota: 10
  },
  {
    id: "5",
    title: "Customer Service Officer",
    location: "Surabaya",
    department: "Customer Experience",
    type: "Kontrak",
    level: "Entry Level",
    postedDate: "01 Mar 2026",
    closingDate: "10 Apr 2026",
    description: "Melayani nasabah dengan memberikan informasi produk dan layanan serta menangani keluhan dengan profesional.",
    requirements: [
      "Pendidikan minimal D3 semua jurusan",
      "Usia maksimal 25 tahun",
      "Berpenampilan menarik dan komunikatif",
      "Mampu berbahasa Inggris dengan baik",
      "Bersedia bekerja shift"
    ],
    benefits: ["Gaji", "BPJS", "Insentif", "Jenjang Karir"],
    quota: 30
  },
  {
    id: "6",
    title: "Relationship Manager SME",
    location: "Bandung",
    department: "Commercial Banking",
    type: "Full-Time",
    level: "Mid Level",
    postedDate: "28 Feb 2026",
    closingDate: "08 Apr 2026",
    description: "Mengelola dan mengembangkan portofolio nasabah UKM dengan memberikan solusi keuangan yang sesuai kebutuhan bisnis nasabah.",
    requirements: [
      "Pendidikan minimal S1 Ekonomi/Bisnis",
      "Pengalaman minimal 2 tahun sebagai RM atau posisi serupa",
      "Memiliki jaringan relasi bisnis yang luas",
      "Target oriented dan memiliki kemampuan negosiasi",
      "Memiliki SIM A dan kendaraan pribadi"
    ],
    benefits: ["Gaji Kompetitif", "BPJS", "Asuransi", "Bonus Pencapaian", "Kendaraan Operasional"],
    quota: 8
  }
]
