"use client"

import { Navigation } from "@/components/navigation"
import { UploadSection } from "@/components/upload-section"
import { ResultsSection } from "@/components/results-section"
import { DetectionGuide } from "@/components/detection-guide"
import { usePotholeDetection } from "@/hooks/use-pothole-detection"

export default function DetectionPage() {
  const {
    uploadedFile,
    previewUrl,
    isProcessing,
    progress,
    results,
    error,
    isVideoPlaying,
    videoRef,
    handleFileUpload,
    startDetection,
    resetUpload,
    toggleVideoPlayback,
  } = usePotholeDetection()

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-4 sm:space-y-6 py-12 sm:py-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Deteksi Lubang Jalan AI
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              Unggah gambar atau video jalan Anda dan dapatkan deteksi lubang jalan bertenaga AI secara instan dengan
              analisis detail menggunakan model YOLOv8.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <UploadSection
              uploadedFile={uploadedFile}
              previewUrl={previewUrl}
              isProcessing={isProcessing}
              progress={progress}
              isVideoPlaying={isVideoPlaying}
              error={error}
              onFileUpload={handleFileUpload}
              onStartDetection={startDetection}
              onReset={resetUpload}
              onToggleVideo={toggleVideoPlayback}
              //@ts-ignore
              videoRef={videoRef}
            />

            <ResultsSection results={results} />
          </div>

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
