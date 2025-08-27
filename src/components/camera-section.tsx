"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Square,
  AlertCircle,
  RefreshCw,
  Target,
  Clock,
  Download,
  CheckCircle,
  Zap,
} from "lucide-react";
import { PotholeAPI, type ImageDetectionResponse } from "@/lib/api";

export function CameraSection() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [capturedResults, setCapturedResults] = useState<{
    originalImageUrl: string;
    processedImageUrl: string;
    detections: Array<{
      id: number;
      confidence: number;
      bbox: [number, number, number, number];
      class: string;
    }>;
    processingTime: number;
    timestamp: string;
    totalPotholes: number;
    processingInfo?: {
      model: string;
      confidence_threshold: number;
      total_detections: number;
    };
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      console.log("Meminta akses kamera...");

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      console.log("Akses kamera diberikan, mengatur video...");

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        videoRef.current.onloadedmetadata = () => {
          console.log("Metadata video dimuat");
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                console.log("Video diputar dengan sukses");
                setIsStreaming(true);
                setIsLoading(false);
              })
              .catch((playError) => {
                console.error("Error memutar video:", playError);
                setError("Gagal memulai pemutaran video. Silakan coba lagi.");
                setIsLoading(false);
              });
          }
        };

        videoRef.current.onerror = (e) => {
          console.error("Error video:", e);
          setError("Error pemutaran video terjadi.");
          setIsLoading(false);
        };
      }

      setStream(mediaStream);
    } catch (err) {
      console.error("Error mengakses kamera:", err);
      setIsLoading(false);

      let errorMessage = "Tidak dapat mengakses kamera. ";

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          errorMessage += "Harap izinkan akses kamera dan coba lagi.";
        } else if (err.name === "NotFoundError") {
          errorMessage += "Tidak ada kamera ditemukan pada perangkat ini.";
        } else if (err.name === "NotReadableError") {
          errorMessage += "Kamera sedang digunakan oleh aplikasi lain.";
        } else {
          errorMessage += err.message;
        }
      }

      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    console.log("Menghentikan kamera...");

    if (stream) {
      stream.getTracks().forEach((track) => {
        console.log("Menghentikan track:", track.kind);
        track.stop();
      });
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }

    setIsStreaming(false);
  };

  const captureAndDetect = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        // Convert to blob and create URL for original image
        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const originalImageUrl = URL.createObjectURL(blob);

              // Start processing
              setIsProcessing(true);
              setProgress(0);

              try {
                // Simulate progress updates
                const progressInterval = setInterval(() => {
                  setProgress((prev) => {
                    if (prev >= 90) {
                      clearInterval(progressInterval);
                      return 90;
                    }
                    return prev + Math.random() * 15;
                  });
                }, 200);

                const startTime = Date.now();

                const file = new File([blob], "camera-capture.jpg", {
                  type: "image/jpeg",
                });
                const detectionResponse: ImageDetectionResponse =
                  await PotholeAPI.detectImage(file);

                const imageBlob = new Blob(
                  [
                    Uint8Array.from(atob(detectionResponse.image_base64), (c) =>
                      c.charCodeAt(0)
                    ),
                  ],
                  { type: "image/jpeg" }
                );
                const processedImageUrl = URL.createObjectURL(imageBlob);

                clearInterval(progressInterval);

                const processingTime = (Date.now() - startTime) / 1000;

                setProgress(100);
                setCapturedResults({
                  originalImageUrl,
                  processedImageUrl,
                  //@ts-ignore
                  detections: detectionResponse.detections,
                  processingTime: Math.round(processingTime * 10) / 10,
                  timestamp: new Date().toLocaleString("id-ID"),
                  totalPotholes: detectionResponse.total_potholes,
                  processingInfo: detectionResponse.processing_info,
                });

                setIsProcessing(false);
              } catch (err) {
                console.error("Detection error:", err);
                setError("Terjadi kesalahan saat memproses gambar");
                setIsProcessing(false);
                setProgress(0);
              }
            }
          },
          "image/jpeg",
          0.9
        );
      } else {
        setError("Tidak dapat mengambil frame: video tidak siap");
      }
    }
  };

  const downloadCapturedResult = () => {
    if (capturedResults?.processedImageUrl) {
      const link = document.createElement("a");
      link.href = capturedResults.processedImageUrl;
      link.download = `hasil-deteksi-kamera-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const refreshCamera = () => {
    stopCamera();
    setTimeout(() => {
      startCamera();
    }, 1000);
  };

  const resetResults = () => {
    setCapturedResults(null);
    setProgress(0);
    setIsProcessing(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {/* Camera Feed */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Kamera Langsung
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Tangkap gambar untuk deteksi lubang jalan
              </p>
            </div>
          </div>

          {isStreaming && (
            <Button
              onClick={refreshCamera}
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent text-sm sm:text-base"
            >
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Segarkan
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium text-sm sm:text-base">
                  Error Kamera
                </p>
                <p className="text-red-300 text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              <div>
                <p className="text-blue-400 font-medium text-sm sm:text-base">
                  Memulai Kamera...
                </p>
                <p className="text-blue-300 text-xs sm:text-sm">
                  Harap tunggu sementara kami mengakses kamera Anda
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Camera View */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-700/50 mb-4 sm:mb-6">
          {!isStreaming && !isLoading ? (
            <div className="aspect-video flex items-center justify-center bg-slate-800/50">
              <div className="text-center space-y-3 sm:space-y-4">
                <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-slate-500 mx-auto" />
                <div>
                  <p className="text-slate-400 text-base sm:text-lg font-medium">
                    Kamera tidak aktif
                  </p>
                  <p className="text-slate-500 text-sm">
                    Klik "Mulai Kamera" untuk memulai
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover bg-black"
                autoPlay
                playsInline
                muted
                style={{
                  display: isStreaming ? "block" : "none",
                  minHeight: "200px",
                }}
              />

              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white text-sm sm:text-base">
                      Memuat kamera...
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="mb-4 sm:mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm sm:text-base">
                Menganalisis gambar untuk deteksi lubang jalan...
              </span>
              <span className="text-cyan-400 font-bold text-sm sm:text-base">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 sm:h-3 bg-slate-700 rounded-full"
            />
            <p className="text-slate-400 text-xs sm:text-sm">
              Memproses gambar yang ditangkap dengan model YOLOv8...
            </p>
          </div>
        )}

        {/* Camera Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {!isStreaming ? (
            <Button
              onClick={startCamera}
              disabled={isLoading}
              className="flex-1 group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {isLoading ? "Memulai..." : "Mulai Kamera"}
            </Button>
          ) : (
            <>
              <Button
                onClick={captureAndDetect}
                disabled={isProcessing}
                className="flex-1 group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {isProcessing ? "Memproses..." : "Tangkap & Deteksi"}
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-red-600/50 text-red-400 hover:text-red-300 hover:border-red-500 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm sm:text-base"
              >
                Hentikan
              </Button>
            </>
          )}
        </div>

        {/* Debug Info */}
        {isStreaming && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-slate-700/30 text-xs text-slate-400">
            <p>Status Kamera: Aktif</p>
            <p>
              Dimensi Video: {videoRef.current?.videoWidth || 0} x{" "}
              {videoRef.current?.videoHeight || 0}
            </p>
            <p>Siap untuk menangkap gambar</p>
          </div>
        )}

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Detection Results */}
      <div className="space-y-4 sm:space-y-6">
        {!capturedResults ? (
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-700/30">
                <Square className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Belum Ada Hasil
                </h3>
                <p className="text-slate-400 text-sm sm:text-base">
                  Tangkap gambar dari kamera untuk memulai deteksi
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Main Result Image */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">
                      Hasil Deteksi
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base">
                      Gambar berhasil dianalisis
                      <span className="block text-xs text-slate-500 mt-1">
                        Waktu: {capturedResults.timestamp}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={downloadCapturedResult}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm sm:text-base"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Unduh
                </Button>
              </div>

              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-700/50 border border-slate-600/50">
                <img
                  src={capturedResults.processedImageUrl || "/placeholder.svg"}
                  alt="Gambar yang ditangkap dengan deteksi lubang jalan"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Detection Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Card Deteksi Lubang Jalan (versi baru) */}
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
                    {capturedResults.totalPotholes}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">
                    Detail Akurasi:
                  </span>
                  <div className="max-h-32 overflow-y-auto border border-slate-700 rounded-lg mt-1 p-2 bg-slate-900/30">
                    {capturedResults.detections.length > 0 ? (
                      capturedResults.detections.map((detection) => (
                        <div
                          key={detection.id}
                          className="flex items-center justify-between text-xs py-0.5"
                        >
                          <span className="text-slate-400">
                            Lubang #{detection.id}
                          </span>
                          <span className="text-green-400 font-medium">
                            {detection.confidence}%
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
                    {capturedResults.totalPotholes > 0
                      ? `${capturedResults.totalPotholes} lubang jalan terdeteksi pada gambar ini.`
                      : "Tidak ada lubang jalan terdeteksi pada gambar ini."}
                  </p>
                </div>
              </div>

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
                      {capturedResults.processingTime.toFixed(1)}d
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base">
                      Waktu Pemrosesan
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-slate-700">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Jenis File:</span>
                      <span className="text-white">Tangkapan Kamera</span>
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
    </div>
  );
}
