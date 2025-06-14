import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Heart, Activity, BarChart3 } from "lucide-react";

type FormData = {
  age: string;
  gender: string;
  bloodPressure: string;
  cholesterol: string;
};

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterol: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Using sessionStorage instead of localStorage for better privacy
    sessionStorage.setItem("formData", JSON.stringify(formData));
    navigate("/result");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepIcon = (step: number) => {
    const icons = [User, Heart, Activity, BarChart3];
    const Icon = icons[step - 1];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cek Risiko Kesehatan
          </h1>
          <p className="text-gray-600">
            Isi data berikut untuk mendapatkan prediksi risiko kesehatan Anda
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
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
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {/* Step 1: Age */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Berapa usia Anda?
                </h2>
                <p className="text-gray-600">
                  Usia mempengaruhi profil risiko kesehatan
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
                  min="1"
                  max="120"
                  required
                />

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.age}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                >
                  Lanjut
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Gender */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Jenis kelamin Anda?
                </h2>
                <p className="text-gray-600">
                  Perbedaan biologis mempengaruhi risiko penyakit
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: "male" })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.gender === "male"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">👨</div>
                    <div className="font-semibold">Laki-laki</div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, gender: "female" })
                    }
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.gender === "female"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">👩</div>
                    <div className="font-semibold">Perempuan</div>
                  </button>
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
                    disabled={!formData.gender}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Blood Pressure */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Tekanan darah Anda?
                </h2>
                <p className="text-gray-600">
                  Masukkan nilai sistolik (angka atas)
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="bloodPressure"
                    placeholder="Contoh: 120"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="70"
                    max="250"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    mmHg
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Tips:</strong> Normal: 90-120 | Tinggi: {">"}140 |
                    Rendah: {"<"}90
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

          {/* Step 4: Cholesterol */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Kadar kolesterol total?
                </h2>
                <p className="text-gray-600">
                  Hasil tes darah kolesterol terbaru Anda
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    name="cholesterol"
                    placeholder="Contoh: 180"
                    value={formData.cholesterol}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors text-center"
                    min="100"
                    max="400"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    mg/dL
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800">
                    <strong>Tips:</strong> Normal: {"<"}200 | Borderline:
                    200-239 | Tinggi: ≥240
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
                    type="submit"
                    disabled={!formData.cholesterol}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-2xl font-semibold transition-all"
                  >
                    Lihat Hasil
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
