import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısını tutacağız
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Sayfa değişiminde yükleniyor ibaresini gösterelim
      try {
        const response = await api.get(`/books?page=${currentPage}&size=${pageSize}`);
        
        // Spring Boot Page nesnesinden verileri alıyoruz
        setBooks(response.data.content);
        setTotalPages(response.data.totalPages); // Backend'den gelen toplam sayfa bilgisi
      } catch (error) {
        console.error("Kitaplar çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]); // currentPage değiştikçe bu fonksiyon tekrar çalışacak

  if (loading) return <div>Kitaplar yükleniyor, beklemede kalın...</div>;

  return (
    <div>
      <h1>Kütüphane Rafları</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{book.title}</h3>
            <p>Yazar: {book.author?.name}</p>
            <p>Stok: {book.stock}</p>
            <button onClick={() => navigate(`/book/${book.id}`)}> Detayları Gör </button>
          </div>
        ))}
      </div>

      {/* Sayfalama Kontrolleri */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <button 
          disabled={currentPage === 0} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Önceki Sayfa
        </button>

        <span>Sayfa {currentPage + 1} / {totalPages}</span>

        <button 
          disabled={currentPage >= totalPages - 1} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Sonraki Sayfa
        </button>
      </div>
    </div>
  );
}