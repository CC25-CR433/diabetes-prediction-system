import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Share2,
  Download,
  Heart,
  Activity,
  User,
  BarChart3,
} from "lucide-react";

type FormData = {
  age: string;
  gender: string;
  bloodPressure: string;
  cholesterol: string;
};

type RiskLevel = "low" | "medium" | "high";

function Result() {
  const [data, setData] = useState<FormData | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("formData");
    if (stored) {
      const formData = JSON.parse(stored);
      setData(formData);

      // Simple risk calculation algorithm
      const age = parseInt(formData.age);
      const bp = parseInt(formData.bloodPressure);
      const cholesterol = parseInt(formData.cholesterol);

      let score = 0;

      // Age factor
      if (age > 65) score += 30;
      else if (age > 45) score += 20;
      else if (age > 35) score += 10;

      // Blood pressure factor
      if (bp > 180) score += 35;
      else if (bp > 140) score += 25;
      else if (bp > 120) score += 15;
      else if (bp < 90) score += 10;

      // Cholesterol factor
      if (cholesterol > 240) score += 25;
      else if (cholesterol > 200) score += 15;
      else if (cholesterol > 180) score += 5;

      // Gender factor (simplified)
      if (formData.gender === "male" && age > 45) score += 10;
      if (formData.gender === "female" && age > 55) score += 10;

      setRiskScore(Math.min(score, 100));

      if (score < 25) setRiskLevel("low");
      else if (score < 60) setRiskLevel("medium");
      else setRiskLevel("high");
    }
  }, []);

  const getRiskConfig = () => {
    switch (riskLevel) {
      case "low":
        return {
          icon: CheckCircle,
          color: "green",
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          title: "Risiko Rendah",
          description: "Profil kesehatan Anda menunjukkan risiko yang rendah",
          emoji: "✅",
        };
      case "medium":
        return {
          icon: AlertCircle,
          color: "yellow",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          title: "Risiko Sedang",
          description: "Ada beberapa faktor yang perlu diperhatikan",
          emoji: "⚠️",
        };
      case "high":
        return {
          icon: AlertTriangle,
          color: "red",
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          title: "Risiko Tinggi",
          description: "Disarankan untuk berkonsultasi dengan dokter",
          emoji: "🚨",
        };
    }
  };

  const getRecommendations = (): Array<{
    icon: string;
    title: string;
    desc: string;
  }> => {
    const recommendations: Array<{
      icon: string;
      title: string;
      desc: string;
    }> = [];

    if (!data) return recommendations;

    const age = parseInt(data.age);
    const bp = parseInt(data.bloodPressure);
    const cholesterol = parseInt(data.cholesterol);

    if (bp > 140) {
      recommendations.push({
        icon: "🩺",
        title: "Kontrol Tekanan Darah",
        desc: "Konsultasi dengan dokter untuk penanganan hipertensi",
      });
    }

    if (cholesterol > 200) {
      recommendations.push({
        icon: "🥗",
        title: "Diet Sehat",
        desc: "Kurangi makanan tinggi kolesterol dan lemak jenuh",
      });
    }

    if (age > 40) {
      recommendations.push({
        icon: "🏃‍♂️",
        title: "Olahraga Teratur",
        desc: "Minimal 150 menit aktivitas fisik per minggu",
      });
    }

    recommendations.push({
      icon: "📅",
      title: "Cek Kesehatan Rutin",
      desc: "Lakukan pemeriksaan kesehatan berkala",
    });

    return recommendations;
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">
            Silakan isi formulir terlebih dahulu untuk melihat hasil prediksi
          </p>
          <Link
            to="/form"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Isi Formulir
          </Link>
        </div>
      </div>
    );
  }

  const riskConfig = getRiskConfig();
  const recommendations = getRecommendations();
  const RiskIcon = riskConfig.icon;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Prediksi Risiko Kesehatan
          </h1>
          <p className="text-gray-600">Berdasarkan data yang Anda berikan</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Risk Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Risk Card */}
            <div
              className={`${riskConfig.bgColor} ${riskConfig.borderColor} border-2 rounded-3xl p-8 text-center`}
            >
              <div className="text-6xl mb-4">{riskConfig.emoji}</div>
              <RiskIcon
                className={`w-16 h-16 ${riskConfig.textColor} mx-auto mb-4`}
              />
              <h2 className={`text-3xl font-bold ${riskConfig.textColor} mb-2`}>
                {riskConfig.title}
              </h2>
              <p className={`text-lg ${riskConfig.textColor} mb-4`}>
                {riskConfig.description}
              </p>
              <div className="bg-white/50 rounded-2xl p-4">
                <div className="text-sm text-gray-600 mb-2">Skor Risiko</div>
                <div className={`text-4xl font-bold ${riskConfig.textColor}`}>
                  {riskScore}/100
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Rekomendasi untuk Anda
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{rec.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {rec.title}
                        </h4>
                        <p className="text-sm text-gray-600">{rec.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Summary */}
          <div className="space-y-6">
            {/* Your Data */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Data Anda
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Usia</div>
                    <div className="font-semibold">{data.age} tahun</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <div>
                    <div className="text-sm text-gray-600">Jenis Kelamin</div>
                    <div className="font-semibold">
                      {data.gender === "male" ? "Laki-laki" : "Perempuan"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Activity className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">Tekanan Darah</div>
                    <div className="font-semibold">
                      {data.bloodPressure} mmHg
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Kolesterol</div>
                    <div className="font-semibold">
                      {data.cholesterol} mg/dL
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Langkah Selanjutnya
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-colors">
                  <Share2 className="w-4 h-4" />
                  Bagikan Hasil
                </button>

                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors">
                  <Download className="w-4 h-4" />
                  Unduh Laporan
                </button>

                <Link
                  to="/form"
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Cek Ulang
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Disclaimer:</strong> Hasil ini hanya prediksi
                  berdasarkan data yang diberikan. Konsultasikan dengan dokter
                  untuk diagnosis yang akurat.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
