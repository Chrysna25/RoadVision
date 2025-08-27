"use client";

import {
  AlertTriangle,
  CheckCircle,
  Download,
  Target,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface ResultsSectionProps {
  results: {
    processedImageUrl?: string;
    processedVideoUrl?: string; // Added processed video URL
    downloadUrl?: string; // Added downloadUrl for video download functionality
    processingTime: number;
    hasDetections: boolean;
    fileType: "image" | "video";
    videoId?: string;
    detections: Array<{
      id: number;
      confidence: number;
      bbox: [number, number, number, number];
    }>;
    totalPotholes: number;
  } | null;
}

export function ResultsSection({ results }: ResultsSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const downloadResult = () => {
    if (results?.processedImageUrl) {
      const link = document.createElement("a");
      link.href = results.processedImageUrl;
      link.download = `hasil-deteksi-lubang-jalan-${results.fileType}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadVideo = () => {
    if (results?.downloadUrl) {
      const link = document.createElement("a");
      link.href = results.downloadUrl;
      link.download = `hasil-deteksi-video-${
        results.videoId || "processed"
      }.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {!results ? (
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-700/30">
              <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Belum Ada Hasil
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Unggah gambar atau video untuk memulai deteksi
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Result Display */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white">
                    Hasil Deteksi
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base">
                    {results.fileType === "video" ? "Video" : "Gambar"} berhasil
                    dianalisis
                    {results.videoId && (
                      <span className="block text-xs text-slate-500 mt-1">
                        ID Video: {results.videoId}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {results.fileType === "video" && results.downloadUrl && (
                  <Button
                    onClick={downloadVideo}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-sm sm:text-base"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Unduh Video
                  </Button>
                )}
                {results.fileType === "image" && (
                  <Button
                    onClick={downloadResult}
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm sm:text-base"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Unduh Gambar
                  </Button>
                )}
              </div>
            </div>

            {results.fileType === "video" ? (
              <div className="space-y-4">
                {/* Video Processing Success Message */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-700/50 border border-slate-600/50 p-8 text-center">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/10 inline-block">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Video Berhasil Diproses
                      </h3>
                      <p className="text-slate-400 mb-4">
                        Video Anda telah dianalisis dan siap untuk diunduh
                        dengan deteksi lubang jalan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-700/50 border border-slate-600/50">
                <img
                  src={results.processedImageUrl || "/placeholder.svg"}
                  alt={`${results.fileType} yang diproses dengan deteksi lubang jalan`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Detection Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {results.fileType === "image" && (
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Deteksi Lubang Jalan
                  </h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm sm:text-base">
                    Total Terdeteksi:
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-cyan-400">
                    {results.totalPotholes}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">
                    Detail Akurasi:
                  </span>
                  <div className="max-h-32 overflow-y-auto border border-slate-700 rounded-lg mt-1 p-2 bg-slate-900/30">
                    {results.detections.length > 0 ? (
                      results.detections.map((detection) => (
                        <div
                          key={detection.id}
                          className="flex items-center justify-between text-xs py-0.5"
                        >
                          <span className="text-slate-400">
                            Lubang #{detection.id}
                          </span>
                          <span className="text-green-400 font-medium">
                            {(detection.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-500 italic">-</div>
                    )}
                  </div>
                </div>
                <div className="mt-auto space-y-1">
                  <p className="text-xs sm:text-sm text-slate-300">
                    {results.totalPotholes > 0
                      ? `${results.totalPotholes} lubang jalan terdeteksi pada gambar ini.`
                      : "Tidak ada lubang jalan terdeteksi pada gambar ini."}
                  </p>
                </div>
              </div>
            )}
            {/* Processing Time */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Informasi Pemrosesan
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">
                    {results.processingTime}d
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Waktu Pemrosesan
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400">Jenis File:</span>
                    <span className="text-white capitalize">
                      {results.fileType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-green-400">Berhasil</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400">Model:</span>
                    <span className="text-white">YOLOv8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
