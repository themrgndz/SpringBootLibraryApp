import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import './index.css';
import LoginPage from './pages/LoginPage'; 

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-dark)" }}>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;