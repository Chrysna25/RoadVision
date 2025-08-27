"use client"

import type React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, ImageIcon, Video, Play, Pause, RotateCcw, Zap, AlertCircle } from "lucide-react"

interface UploadSectionProps {
  uploadedFile: File | null
  previewUrl: string
  isProcessing: boolean
  progress: number
  isVideoPlaying: boolean
  error: string | null
  onFileUpload: (file: File) => void
  onStartDetection: () => void
  onReset: () => void
  onToggleVideo: () => void
  videoRef: React.RefObject<HTMLVideoElement>
}

export function UploadSection({
  uploadedFile,
  previewUrl,
  isProcessing,
  progress,
  isVideoPlaying,
  error,
  onFileUpload,
  onStartDetection,
  onReset,
  onToggleVideo,
  videoRef,
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const file = files[0]
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      onFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const isVideo = uploadedFile?.type.startsWith("video/")
  const isImage = uploadedFile?.type.startsWith("image/")

  return (
    <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Unggah Media</h2>
          <p className="text-slate-400 text-sm sm:text-base">Gambar (JPG, PNG) atau Video (MP4, MOV, AVI)</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium text-sm sm:text-base">Deteksi Gagal</p>
              <p className="text-red-300 text-xs sm:text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Processing Info */}
      {isVideo && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-blue-400 font-medium text-sm sm:text-base">Pemrosesan Video</p>
              <p className="text-blue-300 text-xs sm:text-sm">
                Video akan diproses dan hasilnya dikembalikan sebagai gambar komposit.
              </p>
            </div>
          </div>
        </div>
      )}

      {!uploadedFile ? (
        <div
          className="group border-2 border-dashed border-slate-600 rounded-xl sm:rounded-2xl p-8 sm:p-16 text-center hover:border-cyan-500/50 hover:bg-slate-800/20 transition-all duration-300 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-semibold text-white">
                Letakkan file di sini atau klik untuk menelusuri
              </p>
              <p className="text-slate-400 text-sm sm:text-base">Mendukung gambar dan video hingga 50MB</p>
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-slate-500 mt-4">
                <span>📷 JPG, PNG</span>
                <span>🎥 MP4, MOV, AVI</span>
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,video/mp4,video/mov,video/avi,video/quicktime"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* File Preview */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-700/50">
            {isVideo ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={previewUrl}
                  className="w-full h-48 sm:h-64 object-cover"
                  controls={false}
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    size="lg"
                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-sm"
                    onClick={onToggleVideo}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-4 h-4 sm:w-6 sm:h-6" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
                    )}
                  </Button>
                </div>
                {/* Video Controls Overlay */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <div className="bg-black/50 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-white text-xs sm:text-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span>Pratinjau Video</span>
                      <span className="px-1 sm:px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        Pemrosesan Frame
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Pratinjau unggahan"
                className="w-full h-48 sm:h-64 object-cover"
              />
            )}
          </div>

          {/* File Info */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-700/30 rounded-xl sm:rounded-2xl border border-slate-600/50">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex-shrink-0">
                {isVideo ? (
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                ) : (
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-sm sm:text-base truncate">{uploadedFile.name}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-slate-400">
                  <span>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span className="capitalize">{isVideo ? "Video" : "Gambar"}</span>
                  {isVideo && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Ekstraksi Frame</span>
                  )}
                  {isImage && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Analisis Gambar</span>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Processing */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium text-sm sm:text-base">
                  {isVideo
                    ? "Memproses video dan menghasilkan gambar hasil..."
                    : "Menganalisis gambar untuk deteksi lubang jalan..."}
                </span>
                <span className="text-cyan-400 font-bold text-sm sm:text-base">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 sm:h-3 bg-slate-700 rounded-full" />
              <p className="text-slate-400 text-xs sm:text-sm">
                {isVideo
                  ? progress < 50
                    ? "Mengunggah dan memproses video..."
                    : "Mengambil frame yang diproses..."
                  : "Menganalisis gambar untuk deteksi lubang jalan..."}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={onStartDetection}
              disabled={isProcessing}
              className="flex-1 group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {isProcessing
                ? isVideo
                  ? "Memproses Video..."
                  : "Memproses..."
                : isVideo
                  ? "Analisis Video"
                  : "Mulai Deteksi"}
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base"
            >
              Reset
            </Button>
          </div>

          
        </div>
      )}
    </div>
  )
}
