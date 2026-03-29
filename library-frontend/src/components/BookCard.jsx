import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const defaultImage = "https://images.isbndb.com/covers/91/26/9789750719126.jpg";

    const handleCardClick = () => {
        navigate(`/book/${book.id}`);
    };

    return (
        <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
            <div 
                className="card h-100 border-0 shadow-lg transition-card" 
                onClick={handleCardClick}
                style={{ 
                    backgroundColor: "var(--bg-card)", 
                    borderRadius: "18px", 
                    overflow: "hidden",
                    cursor: "pointer"
                }}
            >
                {/* --- Nizamî Görsel Kutusu --- */}
                <div className="position-relative p-2" 
                     style={{ 
                         height: "280px", 
                         backgroundColor: "#16111a", 
                         borderRadius: "15px 15px 0 0"
                     }}>
                    <img 
                        src={book.imageUrl && book.imageUrl.startsWith("/") ? book.imageUrl : defaultImage} 
                        className="card-img-top" 
                        alt={book.title}
                        style={{ 
                            height: "100%", 
                            width: "100%", 
                            objectFit: "contain",
                            filter: "brightness(0.9) drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
                        }}
                        onError={(e) => { e.target.src = defaultImage; }}
                    />
                    
                    <div className="position-absolute top-0 end-0 m-3">
                        <span className={`badge shadow ${book.stock > 0 ? 'bg-success' : 'bg-danger'}`} 
                              style={{ 
                                  fontSize: "0.75rem", 
                                  padding: "6px 12px", 
                                  borderRadius: "10px", 
                                  fontWeight: "600"
                              }}>
                            {book.stock > 0 ? 'Stokta' : 'Tükendi'}
                        </span>
                    </div>
                </div>
                
                {/* --- Kart İçeriği --- */}
                <div className="card-body pt-0 px-3 pb-3 text-center d-flex flex-column">
                    <h6 className="card-title fw-bold text-truncate mb-1" 
                        style={{ color: "var(--text-main)", fontSize: "0.95rem", marginTop: "12px" }}>
                        {book.title}
                    </h6>
                    <p className="small mb-1 text-truncate" 
                       style={{ color: "var(--text-muted)", fontSize: "0.85rem", opacity: "0.8" }}>
                        {book.author?.name || book.author || "Yazar"}
                    </p>
                    {/* Buton kaldırıldı, detay sayfası için tüm kart artık bir buton görevinde */}
                </div>
            </div>
        </div>
    );
};

export default BookCard;