"use client"

import { Navigation } from "@/components/navigation"
import { CameraSection } from "@/components/camera-section"
import { DetectionGuide } from "@/components/detection-guide"

export default function CameraPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-4 sm:space-y-6 py-12 sm:py-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">Deteksi Real-Time</h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              Gunakan kamera perangkat Anda untuk deteksi lubang jalan secara real-time saat berkendara atau inspeksi
              jalan menggunakan computer vision bertenaga AI.
            </p>
          </div>

          <CameraSection />

          {/* Detection Guide Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Tips & Panduan Deteksi</h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Tips dan panduan untuk mendapatkan hasil deteksi yang optimal
              </p>
            </div>

            <DetectionGuide />
          </div>
        </div>
      </main>
    </div>
  )
}
