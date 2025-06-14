import { useEffect, useState } from "react";
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
  Baby,
  TestTube2,
  Scale,
  Dna,
} from "lucide-react";

type FormData = {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
};

type RiskLevel = "low" | "medium" | "high";

function Result() {
  const [data, setData] = useState<FormData | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [riskScore, setRiskScore] = useState(0);
  const [diabetesRisk, setDiabetesRisk] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("formData");
    if (stored) {
      const formData = JSON.parse(stored);
      setData(formData);

      // Diabetes risk calculation algorithm
      const pregnancies = parseInt(formData.pregnancies) || 0;
      const glucose = parseFloat(formData.glucose) || 0;
      const bloodPressure = parseFloat(formData.bloodPressure) || 0;
      const skinThickness = parseFloat(formData.skinThickness) || 0;
      const insulin = parseFloat(formData.insulin) || 0;
      const bmi = parseFloat(formData.bmi) || 0;
      const diabetesPedigree = parseFloat(formData.diabetesPedigree) || 0;
      const age = parseInt(formData.age) || 0;

      let score = 0;

      // Glucose factor (most important)
      if (glucose >= 126) score += 40; // Diabetes range
      else if (glucose >= 100) score += 25; // Pre-diabetes
      else if (glucose >= 70) score += 5; // Normal high
      else if (glucose < 70) score += 15; // Hypoglycemia risk

      // BMI factor
      if (bmi >= 30) score += 20; // Obese
      else if (bmi >= 25) score += 15; // Overweight
      else if (bmi >= 18.5) score += 5; // Normal
      else score += 10; // Underweight

      // Age factor
      if (age >= 45) score += 15;
      else if (age >= 35) score += 10;
      else if (age >= 25) score += 5;

      // Blood pressure factor
      if (bloodPressure >= 140) score += 10;
      else if (bloodPressure >= 120) score += 5;

      // Diabetes pedigree function (genetic predisposition)
      if (diabetesPedigree >= 0.5) score += 10;
      else if (diabetesPedigree >= 0.3) score += 5;

      // Pregnancies factor (for women)
      if (pregnancies >= 4) score += 10;
      else if (pregnancies >= 2) score += 5;

      // Insulin factor
      if (insulin >= 200) score += 10;
      else if (insulin >= 100) score += 5;

      // Skin thickness factor
      if (skinThickness >= 40) score += 5;
      else if (skinThickness >= 30) score += 3;

      const finalScore = Math.min(score, 100);
      setRiskScore(finalScore);

      // Calculate diabetes risk percentage
      const riskPercentage = Math.min((finalScore / 100) * 80 + 5, 85);
      setDiabetesRisk(Math.round(riskPercentage));

      if (finalScore < 30) setRiskLevel("low");
      else if (finalScore < 65) setRiskLevel("medium");
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
          description:
            "Profil kesehatan Anda menunjukkan risiko diabetes yang rendah",
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
          description:
            "Ada beberapa faktor risiko diabetes yang perlu diperhatikan",
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
          description: "Disarankan untuk segera berkonsultasi dengan dokter",
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

    const glucose = parseFloat(data.glucose) || 0;
    const bmi = parseFloat(data.bmi) || 0;
    const bloodPressure = parseFloat(data.bloodPressure) || 0;
    const age = parseInt(data.age) || 0;

    if (glucose >= 100) {
      recommendations.push({
        icon: "🩺",
        title: "Kontrol Gula Darah",
        desc: "Konsultasi dengan dokter untuk penanganan kadar gula darah",
      });
    }

    if (bmi >= 25) {
      recommendations.push({
        icon: "🥗",
        title: "Diet Seimbang",
        desc: "Kurangi karbohidrat sederhana dan makanan tinggi gula",
      });
    }

    if (bmi >= 25 || age >= 35) {
      recommendations.push({
        icon: "🏃‍♂️",
        title: "Olahraga Teratur",
        desc: "Minimal 150 menit aktivitas fisik per minggu",
      });
    }

    if (bloodPressure >= 120) {
      recommendations.push({
        icon: "💊",
        title: "Pantau Tekanan Darah",
        desc: "Monitor tekanan darah secara rutin",
      });
    }

    recommendations.push({
      icon: "📅",
      title: "Cek Kesehatan Rutin",
      desc: "Lakukan tes HbA1c dan gula darah berkala",
    });

    return recommendations;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Hasil Prediksi Risiko Diabetes",
        text: `Skor risiko diabetes saya: ${riskScore}/100 (${
          riskLevel === "low"
            ? "Rendah"
            : riskLevel === "medium"
            ? "Sedang"
            : "Tinggi"
        })`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link telah disalin ke clipboard!");
    }
  };

  const handleDownload = () => {
    const reportContent = `
LAPORAN HASIL PREDIKSI RISIKO DIABETES
======================================

Data Kesehatan:
- Kehamilan: ${data?.pregnancies} kali
- Glukosa: ${data?.glucose} mg/dL  
- Tekanan Darah: ${data?.bloodPressure} mmHg
- Ketebalan Kulit: ${data?.skinThickness} mm
- Insulin: ${data?.insulin} μU/mL
- BMI: ${data?.bmi}
- Riwayat Keluarga: ${data?.diabetesPedigree}
- Usia: ${data?.age} tahun

Hasil Prediksi:
- Skor Risiko: ${riskScore}/100
- Tingkat Risiko: ${
      riskLevel === "low"
        ? "Rendah"
        : riskLevel === "medium"
        ? "Sedang"
        : "Tinggi"
    }
- Estimasi Risiko: ${diabetesRisk}%

Disclaimer: Hasil ini hanya prediksi berdasarkan algoritma sederhana. 
Konsultasikan dengan dokter untuk diagnosis yang akurat.
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan-risiko-diabetes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <button
            onClick={() => (window.location.href = "/form")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Isi Formulir
          </button>
        </div>
      </div>
    );
  }

  const riskConfig = getRiskConfig();
  const recommendations = getRecommendations();
  const RiskIcon = riskConfig.icon;

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Prediksi Risiko Diabetes
          </h1>
          <p className="text-gray-600">
            Berdasarkan data kesehatan yang Anda berikan
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Risk Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Risk Card */}
            <div
              className={`${riskConfig.bgColor} ${riskConfig.borderColor} border-2 rounded-3xl p-8 text-center shadow-lg`}
            >
              <div className="text-6xl mb-4">{riskConfig.emoji}</div>
              <RiskIcon
                className={`w-16 h-16 ${riskConfig.textColor} mx-auto mb-4`}
              />
              <h2 className={`text-3xl font-bold ${riskConfig.textColor} mb-2`}>
                {riskConfig.title}
              </h2>
              <p className={`text-lg ${riskConfig.textColor} mb-6`}>
                {riskConfig.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-2">Skor Risiko</div>
                  <div className={`text-3xl font-bold ${riskConfig.textColor}`}>
                    {riskScore}/100
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Estimasi Risiko
                  </div>
                  <div className={`text-3xl font-bold ${riskConfig.textColor}`}>
                    {diabetesRisk}%
                  </div>
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
                Data Kesehatan Anda
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Baby className="w-5 h-5 text-pink-600" />
                  <div>
                    <div className="text-sm text-gray-600">Kehamilan</div>
                    <div className="font-semibold">{data.pregnancies} kali</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <TestTube2 className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">Glukosa</div>
                    <div className="font-semibold">{data.glucose} mg/dL</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Tekanan Darah</div>
                    <div className="font-semibold">
                      {data.bloodPressure} mmHg
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">
                    ST
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ketebalan Kulit</div>
                    <div className="font-semibold">{data.skinThickness} mm</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Scale className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">BMI</div>
                    <div className="font-semibold">{data.bmi}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <TestTube2 className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Insulin</div>
                    <div className="font-semibold">{data.insulin} μU/mL</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <Dna className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">
                      Riwayat Keluarga
                    </div>
                    <div className="font-semibold">{data.diabetesPedigree}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">Usia</div>
                    <div className="font-semibold">{data.age} tahun</div>
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
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan Hasil
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Unduh Laporan
                </button>

                <button
                  onClick={() => (window.location.href = "/form")}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Cek Ulang
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Disclaimer:</strong> Hasil ini hanya prediksi
                  berdasarkan algoritma sederhana. Konsultasikan dengan dokter
                  untuk diagnosis yang akurat dan pemeriksaan lebih lanjut.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
