import Link from "next/link"
import { Eye } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-white">RoadVision</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Platform AI terdepan untuk deteksi lubang jalan dan analisis infrastruktur yang akurat dan real-time
        </p>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
          <Link href="/privacy" className="hover:text-white transition-colors text-sm sm:text-base">
            Kebijakan Privasi
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors text-sm sm:text-base">
            Syarat Layanan
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors text-sm sm:text-base">
            Kontak
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-xs sm:text-sm">© 2024 RoadVision. Semua hak dilindungi.</p>
      </div>
    </footer>
  )
}
