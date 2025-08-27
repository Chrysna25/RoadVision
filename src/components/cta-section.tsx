import { Camera, Sun, AlertTriangle, BookOpen } from "lucide-react"

export function DetectionGuide() {
  const guides = [
    {
      icon: Camera,
      title: "Tips Deteksi Terbaik",
      description: "Panduan untuk hasil optimal",
      tips: [
        "Pastikan lubang jalan terlihat jelas dalam frame",
        "Hindari gambar yang terlalu gelap atau terang",
        "Gunakan sudut yang tepat, tidak terlalu miring",
        "Fokus pada area jalan yang ingin dianalisis",
      ],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Sun,
      title: "Kualitas Gambar Optimal",
      description: "Spesifikasi gambar terbaik",
      tips: [
        "Resolusi minimal 640x480 piksel",
        "Format: JPG, PNG untuk gambar",
        "Format: MP4, MOV untuk video",
        "Ukuran file maksimal 50MB",
      ],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Pemecahan Masalah Umum",
      description: "Solusi masalah yang sering terjadi",
      tips: [
        "Jika deteksi lambat, coba kompres gambar",
        "Pastikan koneksi internet stabil",
        "Muat ulang halaman jika unggahan gagal",
        "Gunakan browser terbaru untuk performa optimal",
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: BookOpen,
      title: "Panduan Penggunaan",
      description: "Langkah-langkah mudah",
      tips: [
        "Klik area unggah atau seret & letakkan file",
        "Tunggu pratinjau gambar/video muncul",
        "Tekan 'Mulai Deteksi' untuk analisis",
        "Unduh hasil untuk dokumentasi",
      ],
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {guides.map((guide, index) => {
        const Icon = guide.icon
        return (
          <div
            key={index}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${guide.bgColor} flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold bg-gradient-to-r ${guide.color} bg-clip-text text-transparent text-sm sm:text-base`}
                  >
                    {guide.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">{guide.description}</p>
                </div>
              </div>

              {/* Tips List */}
              <div className="space-y-2 sm:space-y-3">
                {guide.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="flex items-start space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${guide.color} mt-2 flex-shrink-0`} />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
