"use client"

import * as React from "react"
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginSectionProps {
  onLogin: (email: string, password: string) => void
  onForgotPassword?: () => void
  onRegister?: () => void
}

export function LoginSection({ onLogin, onForgotPassword, onRegister }: LoginSectionProps) {
  const [email, setEmail] = React.useState("cristianaldowidjaja@gmail.com")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    onLogin(email, password)
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Masuk ke Akun
        </h1>
        <p className="text-gray-600">
          Lengkapi email dan kata sandi untuk masuk ke akun Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[#00609D] text-sm font-medium block mb-2">
            Email
          </label>
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="pl-10 h-12 border-gray-300 focus:border-[#00609D] focus:ring-[#00609D]"
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="text-[#00609D] text-sm font-medium block mb-2">
            Kata Sandi
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#00609D] focus:ring-[#00609D]"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#00609D] hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#00609D] hover:bg-[#0078c2] text-white font-medium rounded-full"
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>

        <p className="text-center text-gray-600">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-[#00609D] hover:underline font-medium"
          >
            Daftar akun
          </button>
        </p>
      </form>
    </div>
  )
}

interface ResetPasswordSectionProps {
  onBack: () => void
  onSubmit: (currentPassword: string, newPassword: string) => void
}

export function ResetPasswordSection({ onBack, onSubmit }: ResetPasswordSectionProps) {
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Kata sandi baru tidak cocok dengan konfirmasi kata sandi")
      return
    }

    if (newPassword.length < 8) {
      setError("Kata sandi baru minimal 8 karakter")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    onSubmit(currentPassword, newPassword)
    setIsLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kata Sandi Berhasil Diubah</h2>
        <p className="text-gray-600 mb-6">Kata sandi Anda telah berhasil diperbarui.</p>
        <Button
          onClick={onBack}
          className="bg-[#00609D] hover:bg-[#0078c2] text-white rounded-full px-8"
        >
          Kembali ke Profil
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan Kata Sandi</h1>
          <p className="text-gray-600 text-sm">Ubah kata sandi akun Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="text-[#00609D] text-sm font-medium block mb-2">
            Kata Sandi Saat Ini <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan kata sandi saat ini"
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#00609D] focus:ring-[#00609D]"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-[#00609D] text-sm font-medium block mb-2">
            Kata Sandi Baru <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan kata sandi baru"
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#00609D] focus:ring-[#00609D]"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
        </div>

        <div>
          <label className="text-[#00609D] text-sm font-medium block mb-2">
            Konfirmasi Kata Sandi Baru <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi kata sandi baru"
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#00609D] focus:ring-[#00609D]"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#00609D] hover:bg-[#0078c2] text-white font-medium rounded-full"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  )
}
