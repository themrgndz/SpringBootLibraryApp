import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-dark)" }}>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Diğer rotalar buraya gelecek */}
          </Routes>
        </main>
        <footer className="py-3 text-center" style={{ backgroundColor: "var(--bg-card)", borderTop: "1px solid var(--border-color)" }}>
          <p className="mb-0" style={{ color: "var(--text-muted)" }}>
            © 2024 LibraryApp - Tüm Hakları Saklıdır.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;