import Link from "next/link"

export function HeroSection() {
  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-12 sm:space-y-16">
          {/* Main Heading */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
              Platform analisis{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">jalan</span>
              <br />
              bertenaga AI
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed px-4">
              Kami memanfaatkan kekuatan kecerdasan buatan dan computer vision untuk menghadirkan berbagai produk yang
              tersedia untuk penggunaan individu maupun aplikasi bisnis & alur kerja untuk mencapai efisiensi dan
              inovasi.
            </p>
          </div>

          {/* Start Detection Section */}
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Mulai Deteksi</h2>
              <p className="text-slate-400 text-base sm:text-lg px-4">
                Pilih metode deteksi yang sesuai dengan kebutuhan Anda
              </p>
            </div>

            {/* Detection Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
              {/* Gallery Detection Option */}
              <Link href="/detection">
                <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-800/50 border-2 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <div className="p-6 sm:p-8 space-y-4 sm:space-y-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                        <span className="text-3xl sm:text-4xl">📁</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          Galeri & Video
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                          Unggah gambar atau video jalan dari galeri perangkat Anda untuk analisis deteksi lubang jalan
                          menggunakan AI
                        </p>

                        {/* Features */}
                        <div className="space-y-2 text-xs sm:text-sm text-slate-500">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                            <span>Format: JPG, PNG, MP4, MOV</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                            <span>Hasil dapat diunduh</span>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="pt-4">
                        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl sm:rounded-2xl group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 text-sm sm:text-base">
                          <span>Pilih dari Galeri</span>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Camera Detection Option */}
              <Link href="/camera">
                <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-800/50 border-2 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <div className="p-6 sm:p-8 space-y-4 sm:space-y-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                        <span className="text-3xl sm:text-4xl">📹</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          Kamera
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                          Gunakan kamera perangkat untuk deteksi lubang jalan secara langsung dan real-time saat
                          berkendara atau inspeksi
                        </p>

                        {/* Features */}
                        <div className="space-y-2 text-xs sm:text-sm text-slate-500">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            <span>Deteksi langsung real-time</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            <span>Capture frame untuk analisis</span>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="pt-4">
                        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25 text-sm sm:text-base">
                          <span>Buka Kamera</span>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="text-center px-4">
              <p className="text-slate-500 text-xs sm:text-sm">
                Kedua metode menggunakan model YOLOv8 untuk deteksi lubang jalan yang akurat dan cepat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
