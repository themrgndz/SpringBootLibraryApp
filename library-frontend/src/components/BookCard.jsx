import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-md-4 col-lg-2 mb-4">
      <div className="card h-100 shadow-sm border-0 position-relative book-card">
        {/* Stok Durumu Rozeti */}
        <span className={`badge position-absolute top-0 end-0 m-2 ${book.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
          {book.stock > 0 ? 'Stokta' : 'Tükendi'}
        </span>
        
        {/* Kitap Görseli */}
        <img 
          src={book.imageUrl || "https://via.placeholder.com/150x220?text=Kitap+Kapağı"} 
          className="card-img-top" 
          alt={book.title}
          style={{ height: "220px", objectFit: "cover" }}
        />
        
        <div className="card-body d-flex flex-column p-2 text-center">
          <h6 className="card-title fw-bold text-truncate mb-1" title={book.title}>
            {book.title}
          </h6>
          <p className="card-text small text-muted mb-2 text-truncate">
            {book.author?.name || "Bilinmeyen Yazar"}
          </p>
          
          <button 
            className="btn btn-outline-dark btn-sm mt-auto"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            İncele
          </button>
        </div>
      </div>
    </div>
  );
}