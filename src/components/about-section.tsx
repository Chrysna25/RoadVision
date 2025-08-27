import { Lightbulb, Shield, Zap } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Lightbulb,
      title: "Analisis AI Mendalam",
      description:
        "Teknologi machine learning menganalisis gambar jalan Anda secara komprehensif untuk memberikan insight yang akurat.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Deteksi Personal",
      description: "Dapatkan hasil deteksi yang sesuai dengan kebutuhan infrastruktur dan preferensi analisis Anda.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Hasil Instan",
      description:
        "Proses analisis yang cepat dengan hasil yang dapat langsung Anda gunakan untuk meningkatkan infrastruktur.",
      gradient: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Mengapa Memilih RoadVision?
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            Platform AI terdepan untuk analisis lubang jalan dan rekomendasi perbaikan infrastruktur yang personal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="text-center space-y-4 sm:space-y-6">
                  <div
                    className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
