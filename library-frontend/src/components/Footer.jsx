export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto w-100">
      <div className="container">
        <div className="row align-items-center">
          {/* Sol Kısım: Logo veya Kısa Bilgi */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold fs-5">📚 LibraryApp</span>
            <p className="small text-muted mb-0">
              Modern kütüphane yönetim sistemi.
            </p>
          </div>

          {/* Sağ Kısım: Telif Hakkı ve Linkler */}
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 small">
              &copy; {new Date().getFullYear()} LibraryApp. Tüm hakları saklıdır.
            </p>
            <div className="mt-2">
              <a href="#" className="text-muted text-decoration-none small me-3">Gizlilik Politikası</a>
              <a href="#" className="text-muted text-decoration-none small">İletişim</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}