import { Routes, Route } from "react-router-dom"; // Hapus BrowserRouter
import Home from "./pages/home";
import Form from "./pages/form";
import Result from "./pages/result";

function App() {
  return (
    <div className="min-h-screen bg-[#fdfbf8] text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
