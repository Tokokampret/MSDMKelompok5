"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Calendar, Phone, Mail, MapPin, User, Building, ChevronUp, ChevronDown, Instagram, Facebook, Linkedin, Upload, FileText, Folder, X, Eye } from "lucide-react"

interface ProfileData {
  name: string
  avatar?: string
  initials: string
  email: string
  phone: string
  altPhone?: string
  birthPlace: string
  birthDate: string
  gender: "LAKI-LAKI" | "PEREMPUAN"
  religion: string
  maritalStatus: string
  idNumber: string
  // Extended address info
  lastEducation: string
  address: string
  province: string
  city: string
  district: string
  village: string
  rtRw: string
  postalCode: string
}

interface Education {
  id: string
  level: string
  schoolName: string
  graduationYear: string
  major: string
  grade: string
  gradeLabel: string
}

interface WorkExperience {
  id: string
  companyName: string
  lastPosition: string
  description: string
  isCurrentJob: boolean
  startDate: string
  endDate?: string
}

interface SocialMedia {
  instagram?: string
  facebook?: string
  x?: string
  linkedin?: string
}

interface Document {
  id: string
  name: string
  type: "cv" | "portfolio"
  fileName: string
  uploadDate: string
  fileSize: string
}

interface ProfileSectionProps {
  profile: ProfileData
  education?: Education[]
  workExperience?: WorkExperience[]
  skills?: string[]
  socialMedia?: SocialMedia
  documents?: Document[]
}

export function ProfileSection({ 
  profile, 
  education = [], 
  workExperience = [], 
  skills = [],
  socialMedia = {},
  documents = []
}: ProfileSectionProps) {
  const [expandedEducation, setExpandedEducation] = useState<string[]>(education.map(e => e.id))
  const [expandedWork, setExpandedWork] = useState<string[]>(workExperience.length > 0 ? [workExperience[0].id] : [])

  const toggleEducation = (id: string) => {
    setExpandedEducation(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleWork = (id: string) => {
    setExpandedWork(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="informasi" className="w-full">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 gap-8">
          <TabsTrigger 
            value="informasi" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00609D] data-[state=active]:bg-transparent data-[state=active]:text-[#00609D] pb-3 px-0 font-medium"
          >
            Informasi Profil
          </TabsTrigger>
        </TabsList>

        <TabsContent value="informasi" className="mt-8 space-y-10">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-gray-100 shadow-lg">
                <AvatarImage src={profile.avatar || "/images/profile.png"} alt={profile.name} />
                <AvatarFallback className="bg-[#00609D] text-white text-3xl">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary"
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="mb-6">
                <label className="text-[#00609D] text-sm font-medium">
                  Nama Lengkap (sesuai KTP) <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-900 font-semibold text-lg mt-1">{profile.name}</p>
              </div>

              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-4">Informasi Kontak</h3>
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <p className="text-gray-900 mt-1 break-all">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        No Handphone <span className="text-red-500">*</span>
                      </label>
                      <p className="text-gray-900 mt-1">{profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        No Handphone Alternatif
                      </label>
                      <p className="text-gray-400 mt-1">{profile.altPhone || "Contoh: 0819999999"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-gray-900 font-bold text-xl mb-6">Informasi Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoField 
                icon={<MapPin className="w-4 h-4" />}
                label="Tempat Lahir"
                value={profile.birthPlace}
                required
              />
              <InfoField 
                icon={<Calendar className="w-4 h-4" />}
                label="Tanggal Lahir"
                value={profile.birthDate}
                required
              />
              <div>
                <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={profile.gender === "LAKI-LAKI"}
                      readOnly
                      className="w-4 h-4 text-[#00609D] accent-[#00609D]"
                    />
                    <span className="text-gray-700">LAKI-LAKI</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={profile.gender === "PEREMPUAN"}
                      readOnly
                      className="w-4 h-4 text-[#00609D] accent-[#00609D]"
                    />
                    <span className="text-gray-700">PEREMPUAN</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <InfoField 
                icon={<Building className="w-4 h-4" />}
                label="Agama"
                value={profile.religion}
                required
              />
              <InfoField 
                label="Status Perkawinan"
                value={profile.maritalStatus}
                required
              />
              <InfoField 
                label="No. KTP"
                value={profile.idNumber}
                required
              />
            </div>

            {/* Extended Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InfoField 
                label="Pendidikan Terakhir"
                value={profile.lastEducation}
                required
              />
              <InfoField 
                label="Alamat (sesuai KTP)"
                value={profile.address}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <InfoField 
                label="Provinsi"
                value={profile.province}
                required
              />
              <InfoField 
                label="Kota"
                value={profile.city}
                required
              />
              <InfoField 
                label="Kecamatan"
                value={profile.district}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <InfoField 
                label="Kelurahan"
                value={profile.village}
                required
              />
              <InfoField 
                label="RT/RW"
                value={profile.rtRw}
                required
              />
              <InfoField 
                label="Kode Pos"
                value={profile.postalCode}
                required
              />
            </div>
          </div>

          {/* Education History */}
          {education.length > 0 && (
            <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Riwayat Pendidikan</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleEducation(edu.id)}
                      className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#00609D]">
                        {edu.level}<span className="text-red-500">*</span>
                      </span>
                      {expandedEducation.includes(edu.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedEducation.includes(edu.id) && (
                      <div className="px-4 md:px-5 pb-5 pt-2 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InfoField 
                            label={edu.level.includes("DIPLOMA") || edu.level.includes("STRATA") ? "Nama Institusi" : "Nama Sekolah"}
                            value={edu.schoolName}
                            required
                          />
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <InfoField 
                                label="Tahun Kelulusan"
                                value={edu.graduationYear}
                                required
                              />
                            </div>
                            <Calendar className="w-5 h-5 text-gray-400 mt-6" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <InfoField 
                            label="Jurusan"
                            value={edu.major}
                            required
                          />
                          <InfoField 
                            label={edu.gradeLabel}
                            value={edu.grade}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Pengalaman Kerja</h3>
              <div className="space-y-4">
                {workExperience.map((work, index) => (
                  <div key={work.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleWork(work.id)}
                      className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#00609D]">
                        PENGALAMAN KERJA {index + 1}<span className="text-red-500">*</span>
                      </span>
                      {expandedWork.includes(work.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedWork.includes(work.id) && (
                      <div className="px-4 md:px-5 pb-5 pt-2 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InfoField 
                            label="Nama Perusahaan"
                            value={work.companyName}
                            required
                          />
                          <InfoField 
                            label="Posisi Terakhir"
                            value={work.lastPosition}
                            required
                          />
                        </div>
                        <div className="mt-4">
                          <label className="text-[#00609D] text-sm font-medium">
                            Deskripsi <span className="text-red-500">*</span>
                          </label>
                          <p className="text-gray-900 mt-1 leading-relaxed">{work.description}</p>
                        </div>
                        <div className="mt-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={work.isCurrentJob}
                              readOnly
                              className="w-4 h-4 accent-[#00609D] rounded"
                            />
                            <span className="text-gray-700 text-sm">Saya masih bekerja di sini</span>
                          </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <InfoField 
                                label="Tanggal Mulai"
                                value={work.startDate}
                                required
                              />
                            </div>
                            <Calendar className="w-5 h-5 text-gray-400 mt-6" />
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <InfoField 
                                label="Tanggal Akhir"
                                value={work.endDate || "-"}
                                required
                              />
                            </div>
                            <Calendar className="w-5 h-5 text-gray-400 mt-6" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Keahlian</h3>
              <div>
                <label className="text-[#00609D] text-sm font-medium">
                  Keahlian
                </label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="bg-white border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-gray-50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Social Media */}
          <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-900 font-bold text-xl mb-6">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Username Instagram
                </label>
                <p className="text-gray-900 mt-1">{socialMedia.instagram || "-"}</p>
              </div>
              <div>
                <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Akun Facebook (dalam bentuk link)
                </label>
                <p className="text-gray-900 mt-1 break-all">{socialMedia.facebook || "-"}</p>
              </div>
              <div>
                <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Username X
                </label>
                <p className="text-gray-400 mt-1">{socialMedia.x || "Ketik username X"}</p>
              </div>
              <div>
                <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  Akun LinkedIn (dalam bentuk link)
                </label>
                <p className="text-gray-400 mt-1">{socialMedia.linkedin || "Ketik link akun LinkedIn"}</p>
              </div>
            </div>
          </div>

          {/* CV & Portfolio Upload */}
          <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-900 font-bold text-xl mb-6">CV & Portofolio</h3>
            
            {/* CV Upload */}
            <div className="mb-8">
              <label className="text-[#00609D] text-sm font-medium flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" />
                Curriculum Vitae (CV) <span className="text-red-500">*</span>
              </label>
              
              {documents.filter(d => d.type === "cv").length > 0 ? (
                <div className="space-y-3">
                  {documents.filter(d => d.type === "cv").map((doc) => (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00609D]/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#00609D]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.fileName}</p>
                          <p className="text-sm text-gray-500">{doc.fileSize} - Diunggah {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-[#00609D] hover:bg-[#00609D]/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00609D] transition-colors cursor-pointer bg-white">
                  <div className="w-12 h-12 bg-[#00609D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-[#00609D]" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Klik untuk mengunggah CV</p>
                  <p className="text-sm text-gray-500">PDF, DOC, atau DOCX (Maks. 5MB)</p>
                </div>
              )}
            </div>

            {/* Portfolio Upload */}
            <div>
              <label className="text-[#00609D] text-sm font-medium flex items-center gap-2 mb-3">
                <Folder className="w-4 h-4" />
                Portofolio
              </label>
              
              {documents.filter(d => d.type === "portfolio").length > 0 ? (
                <div className="space-y-3">
                  {documents.filter(d => d.type === "portfolio").map((doc) => (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F68B1F]/10 rounded-lg flex items-center justify-center">
                          <Folder className="w-5 h-5 text-[#F68B1F]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.fileName}</p>
                          <p className="text-sm text-gray-500">{doc.fileSize} - Diunggah {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-[#00609D] hover:bg-[#00609D]/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#00609D] transition-colors bg-white flex items-center justify-center gap-2 text-[#00609D] font-medium">
                    <Upload className="w-4 h-4" />
                    Tambah Portofolio Lainnya
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00609D] transition-colors cursor-pointer bg-white">
                  <div className="w-12 h-12 bg-[#F68B1F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-[#F68B1F]" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Klik untuk mengunggah Portofolio</p>
                  <p className="text-sm text-gray-500">PDF, ZIP, atau Link (Maks. 10MB)</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InfoField({ 
  icon, 
  label, 
  value, 
  required 
}: { 
  icon?: React.ReactNode
  label: string
  value: string
  required?: boolean 
}) {
  return (
    <div>
      <label className="text-[#00609D] text-sm font-medium flex items-center gap-2">
        {icon}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <p className="text-gray-900 mt-1">{value}</p>
    </div>
  )
}
