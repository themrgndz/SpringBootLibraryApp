import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm w-100">
      <div className="container">
        {/* Logo - Bizi her zaman anasayfaya götürür */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          📚 LibraryApp
        </Link>

        {/* Mobil cihazlar için menü butonu */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menü İçeriği */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Anasayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Giriş Yap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}