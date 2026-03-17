import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12; // 6'lı grid için 12 (2 satır) idealdir

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/books", {
          params: {
            query: searchQuery,
            page: currentPage,
            size: pageSize
          }
        });
        setBooks(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Kitaplar yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

  return (
    <div className="container py-4">
      {/* 1. Bölüm: Büyük Arama Kutusu (Tasarımındaki gibi) */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h2 className="mb-4 fw-light">Hangi kitabı aramıştınız?</h2>
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Kitap adı, yazar veya ISBN yazın..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0); // Arama yapıldığında 1. sayfaya dön
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Kitap Grid Yapısı */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status"></div>
          <p className="mt-2 text-muted">Kitaplar raflara diziliyor...</p>
        </div>
      ) : (
        <>
          <div className="row">
            {books.length > 0 ? (
              books.map(book => <BookCard key={book.id} book={book} />)
            ) : (
              <div className="text-center my-5">
                <h4>Aradığınız kriterde kitap bulunamadı. 😔</h4>
              </div>
            )}
          </div>

          {/* 3. Bölüm: Sayfalama (Pagination) */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
                  </li>
                  <li className="page-item disabled">
                    <span className="page-link text-dark fw-bold">
                      {currentPage + 1} / {totalPages}
                    </span>
                  </li>
                  <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}