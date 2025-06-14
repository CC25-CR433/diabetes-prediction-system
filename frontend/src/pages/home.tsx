import { Link } from "react-router-dom";
import { Heart, Shield, Zap } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-200/25 rounded-full blur-lg"></div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              Kesehatan Digital
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Cek Risiko
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Kesehatan{" "}
            </span>
            Anda
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Teknologi AI terdepan untuk prediksi risiko kesehatan yang akurat
            dan mudah dipahami
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Cepat & Akurat</h3>
            <p className="text-sm text-gray-600">
              Hasil prediksi dalam hitungan detik
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <Shield className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Aman & Privat</h3>
            <p className="text-sm text-gray-600">
              Data Anda terlindungi dengan baik
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Mudah Dipahami</h3>
            <p className="text-sm text-gray-600">
              Hasil yang jelas dan actionable
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Link to="/form">
            <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span>Mulai Cek Sekarang</span>
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                →
              </div>
            </button>
          </Link>

          <p className="text-sm text-gray-500">
            Gratis • Tanpa registrasi • 2 menit saja
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
