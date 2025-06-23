import { useState } from "react";
import {
  ArrowLeft,
  User,
  Activity,
  Scale,
  TestTube,
  Baby,
  Dna,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

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

function Form() {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 8;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      pregnancies: parseInt(formData.pregnancies) || 0,
      glucose: parseFloat(formData.glucose) || 0,
      bloodPressure: parseFloat(formData.bloodPressure) || 0,
      skinThickness: parseFloat(formData.skinThickness) || 0,
      insulin: parseFloat(formData.insulin) || 0,
      bmi: parseFloat(formData.bmi) || 0,
      diabetesPedigree: parseFloat(formData.diabetesPedigree) || 0,
      age: parseInt(formData.age) || 0,
    };

    console.log("Form data for ML:", processedData);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepIcon = (step: number) => {
    const icons = [Baby, TestTube, Activity, Scale, TestTube, Scale, Dna, User];
    const Icon = icons[step - 1];
    return <Icon className="w-6 h-6" />;
  };

  if (isSubmitted) {
    // Using sessionStorage instead of localStorage for better privacy
    sessionStorage.setItem("formData", JSON.stringify(formData));
    navigate("/result");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cek Risiko Diabetes
          </h1>
          <p className="text-gray-600">
            Isi data kesehatan berikut untuk mendapatkan prediksi risiko
            diabetes Anda
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all flex-shrink-0 ${
                  step <= currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {getStepIcon(step)}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Langkah {currentStep} dari {totalSteps}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Baby className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Berapa kali Anda pernah hamil?
                </h2>
                <p className="text-gray-600">
                  Masukkan jumlah kehamilan (termasuk yang tidak berlanjut).
                  Jika laki-laki atau belum pernah hamil, isi 0
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="number"
                  name="pregnancies"
                  placeholder="Contoh: 0, 1, 2, ..."
                  value={formData.pregnancies}
                  onChange={handleChange}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                  min="0"
                  max="20"
                  required
                />

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.pregnancies}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                >
                  Lanjut
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <TestTube className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Kadar glukosa darah puasa?
                </h2>
                <p className="text-gray-600">
                  Hasil tes gula darah setelah puasa 8-12 jam
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="glucose"
                    placeholder="Contoh: 85"
                    value={formData.glucose}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="0"
                    max="300"
                    step="0.1"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    mg/dL
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Referensi:</strong> Normal: &lt;100 | Prediabetes:
                    100-125 | Diabetes: ≥126
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.glucose}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Tekanan darah diastolik?
                </h2>
                <p className="text-gray-600">
                  Angka bawah dari pengukuran tekanan darah (contoh: 120/80,
                  maka 80)
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="bloodPressure"
                    placeholder="Contoh: 80"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="0"
                    max="150"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    mmHg
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Referensi:</strong> Normal: &lt;80 | Tinggi: 80-89 |
                    Sangat Tinggi: ≥90
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.bloodPressure}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Ketebalan lipatan kulit trisep?
                </h2>
                <p className="text-gray-600">
                  Pengukuran lipatan kulit di belakang lengan atas (dalam mm).
                  Jika tidak tahu, isi 20
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="skinThickness"
                    placeholder="Contoh: 20"
                    value={formData.skinThickness}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    mm
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Info:</strong> Nilai normal berkisar 12-40mm. Jika
                    belum pernah diukur, gunakan nilai 20
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.skinThickness}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <TestTube className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Kadar insulin serum?
                </h2>
                <p className="text-gray-600">
                  Hasil tes insulin dalam darah. Jika tidak tahu atau belum
                  pernah tes, isi 100
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="insulin"
                    placeholder="Contoh: 100"
                    value={formData.insulin}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="0"
                    max="900"
                    step="0.1"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    μU/mL
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Referensi:</strong> Normal: 2.6-24.9 μU/mL. Jika
                    belum pernah tes, gunakan nilai 100
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.insulin}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center">
                <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Indeks Massa Tubuh (BMI)?
                </h2>
                <p className="text-gray-600">
                  BMI = Berat Badan (kg) ÷ Tinggi Badan² (m²)
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="bmi"
                    placeholder="Contoh: 23.5"
                    value={formData.bmi}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="10"
                    max="70"
                    step="0.1"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    kg/m²
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Kategori:</strong> Kurus: &lt;18.5 | Normal:
                    18.5-24.9 | Gemuk: 25-29.9 | Obesitas: ≥30
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.bmi}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="text-center">
                <Dna className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Riwayat keluarga diabetes?
                </h2>
                <p className="text-gray-600">
                  Seberapa kuat riwayat diabetes dalam keluarga (0.0-2.5). Jika
                  tidak ada riwayat: 0.2, Ada riwayat jauh: 0.5, Ada riwayat
                  dekat: 1.0
                </p>
              </div>

              <div className="space-y-4">
                <select
                  name="diabetesPedigree"
                  value={formData.diabetesPedigree}
                  onChange={handleChange}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Pilih riwayat keluarga</option>
                  <option value="0.078">Tidak ada riwayat diabetes</option>
                  <option value="0.254">
                    Riwayat jauh (kakek/nenek, paman/bibi)
                  </option>
                  <option value="0.627">
                    Riwayat sedang (sepupu, keponakan)
                  </option>
                  <option value="1.025">
                    Riwayat dekat (orangtua, saudara kandung)
                  </option>
                  <option value="1.373">
                    Riwayat sangat dekat (kedua orangtua)
                  </option>
                </select>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Info:</strong> Riwayat keluarga adalah faktor risiko
                    penting untuk diabetes tipe 2
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.diabetesPedigree}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="text-center">
                <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Berapa usia Anda?
                </h2>
                <p className="text-gray-600">
                  Usia mempengaruhi risiko diabetes secara signifikan
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Contoh: 25"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                  min="18"
                  max="120"
                  required
                />

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Info:</strong> Risiko diabetes meningkat seiring
                    bertambahnya usia, terutama setelah 45 tahun
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.age}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-2xl font-semibold transition-all"
                  >
                    Analisis Risiko
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
