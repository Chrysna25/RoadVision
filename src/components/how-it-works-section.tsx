import { Upload, Brain, FileCheck } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Unggah Gambar Jalan",
      description:
        "Unggah file gambar jalan dalam format JPG atau PNG. Sistem kami akan memproses dokumen Anda dengan aman dan terjamin.",
      icon: Upload,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      title: "AI Menganalisis",
      description:
        "Teknologi AI kami menganalisis kondisi jalan, lubang, dan kualifikasi infrastruktur untuk memberikan insight mendalam.",
      icon: Brain,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      number: "03",
      title: "Terima Laporan",
      description:
        "Dapatkan laporan deteksi yang detail, tips perbaikan, dan saran untuk meningkatkan kondisi infrastruktur jalan.",
      icon: FileCheck,
      gradient: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Cara Kerja RoadVision</h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            Tiga langkah sederhana untuk mendapatkan analisis infrastruktur jalan yang komprehensif
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-8">
                {/* Icon and Line */}
                <div className="flex flex-row sm:flex-col items-center sm:items-center">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-0.5 h-12 sm:h-16 bg-slate-700 mt-6"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6 sm:pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                    <span
                      className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
