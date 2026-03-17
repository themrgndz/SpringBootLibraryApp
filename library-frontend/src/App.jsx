import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Anasayfa - Şimdilik buraya bir placeholder koyalım */}
        <Route path="/" element={<HomePage />} />
        
        <Route path="/book/:id" element={<BookDetailPage />} />

        {/* 404 Sayfası (Opsiyonel) */}
        <Route path="*" element={<div>Sayfa Bulunamadı Brom!</div>} />
      </Routes>
    </Router>
  );
}

export default App;