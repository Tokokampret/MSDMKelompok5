"use client"

import Link from "next/link"
import { Mail, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00609D] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EI</span>
              </div>
              <span className="font-bold text-xl text-[#00609D]">Examine Industry</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Terima kasih atas kunjungan Anda pada situs Examine Industry. 
              Kami sangat menghargai komentar atau saran Anda agar kami dapat 
              memberikan pelayanan yang lebih baik.
            </p>
            <div className="flex items-center gap-2 mt-4 text-gray-600">
              <Mail className="w-4 h-4 text-[#00609D]" />
              <a href="mailto:recruitment@examineindustry.co.id" className="text-sm hover:text-[#00609D]">
                recruitment@examineindustry.co.id
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Examine Industry Corporate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Tentang Examine Industry
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Karir
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Bantuan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Syarat dan Ketentuan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 text-sm hover:text-[#00609D] transition-colors">
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Mulai Karir Anda</h4>
            <p className="text-gray-600 text-sm mb-4">
              Temukan peluang karir yang sesuai dengan passion dan keahlian Anda.
            </p>
            <Button className="bg-[#00609D] hover:bg-[#0078c2] text-white gap-2">
              <Search className="w-4 h-4" />
              Cari Karir
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Examine Industry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
