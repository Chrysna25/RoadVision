import { CheckCircle } from "lucide-react"

export function FeaturesSection() {
  const letters = [
    {
      letter: "V",
      title: "Visual",
      description:
        "Teknologi computer vision canggih yang mampu menganalisis kondisi jalan secara visual dengan presisi tinggi",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      letter: "I",
      title: "Intelligent",
      description:
        "Kecerdasan buatan yang terus belajar dan berkembang untuk memberikan hasil deteksi yang semakin akurat",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      letter: "S",
      title: "Smart",
      description:
        "Sistem pintar yang dapat membedakan berbagai jenis kerusakan jalan dan memberikan prioritas perbaikan",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      letter: "I",
      title: "Instant",
      description: "Hasil deteksi yang instan dan real-time, memungkinkan respons cepat untuk pemeliharaan jalan",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      letter: "O",
      title: "Optimal",
      description: "Optimalisasi sumber daya dan anggaran pemeliharaan jalan melalui deteksi dini yang tepat sasaran",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      letter: "N",
      title: "Network",
      description: "Jaringan monitoring infrastruktur yang terhubung untuk pemantauan kondisi jalan secara menyeluruh",
      gradient: "from-pink-500 to-red-600",
    },
  ]

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Apa Arti{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">VISION</span>?
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            Setiap huruf mewakili kekuatan teknologi RoadVision untuk infrastruktur jalan yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {letters.map((item, index) => (
            <div key={index} className="text-center space-y-3 sm:space-y-4">
              <div
                className={`inline-flex w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.gradient} items-center justify-center shadow-lg`}
              >
                <span className="text-lg sm:text-2xl font-bold text-white">{item.letter}</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-base sm:text-xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium text-sm sm:text-base">
              Wujudkan VISION infrastruktur jalan masa depan
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
