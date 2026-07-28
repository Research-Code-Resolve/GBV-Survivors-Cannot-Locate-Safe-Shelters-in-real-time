import LandingPage from "./pages/LandingPage";
import ReportForm from "./pages/ReportForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<ReportForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
