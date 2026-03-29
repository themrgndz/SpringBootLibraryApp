import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-lg" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" style={{ color: "var(--primary-color)" }} to="/">
          📚 LibraryApp
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "var(--text-muted)", fontWeight: "500" }}>
                    Merhaba, {user.firstName}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={handleLogout}
                    className="btn btn-sm ms-lg-3 px-4 shadow-sm" 
                    style={{ backgroundColor: "#dc3545", color: "white", fontWeight: "600", border: "none" }}>
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link btn btn-sm ms-lg-3 px-4 shadow-sm" 
                      style={{ backgroundColor: "var(--primary-color)", color: "var(--bg-dark)", fontWeight: "600" }} 
                      to="/login">
                  Giriş Yap
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}