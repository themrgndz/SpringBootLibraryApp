import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-lg" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" style={{ color: "var(--primary-color)" }} to="/">
          📚 LibraryApp
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item">
              <Link className="nav-link btn btn-sm ms-lg-3 px-4 shadow-sm" 
                    style={{ backgroundColor: "var(--primary-color)", color: "var(--bg-dark)", fontWeight: "600" }} 
                    to="/login">
                Giriş Yap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}