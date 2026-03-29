import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const BookDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const handleCheckout = async () => {
        if (!isLoggedIn) {
            alert("Kitap ödünç almak için lütfen giriş yapın.");
            return;
        }

        try {
            const response = await api.put('/books/checkout', null, {
                params: {
                    userEmail: "themrgndz@outlook.com", // Test için manuel verdik
                    bookId: id
                }
            });
            setBook(response.data);
            alert("Kitap başarıyla alındı!");
        } catch (error) {
            // Backend'den gelen "Bu kitabı zaten almışsınız" mesajını gösterir
            alert(error.response?.data?.message || "Bir hata oluştu.");
        }
    };
    const defaultImage = "https://images.isbndb.com/covers/91/26/9789750719126.jpg";

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Kitap detayları yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id]);

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
    if (!book) return <div className="text-center py-5 text-white">Kitap bulunamadı.</div>;

    const bgImageUrl = "https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=2070";

    return (
        <div style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.96)), url(${bgImageUrl})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '60px 0'
        }}>
            <div className="container">
                {/* --- Üst Başlık: Daha parlak ve belirgin --- */}
                <h1 className="display-3 fw-bold text-center mb-5" 
                    style={{ 
                        color: "#ffffff", 
                        textShadow: "0 0 20px rgba(209, 146, 196, 0.5)",
                        letterSpacing: "-1px"
                    }}>
                    {book.title}
                </h1>

                {/* --- Merkezi Detay Kartı --- */}
                <div className="card border-0 shadow-lg mx-auto" style={{ 
                    maxWidth: '1100px', 
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="row g-0">
                        {/* Sol: Görsel Alanı */}
                        <div className="col-md-5 d-flex align-items-center justify-content-center p-4" 
                             style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <img 
                                src={book.imageUrl || defaultImage} 
                                alt={book.title}
                                className="img-fluid shadow-lg"
                                style={{ 
                                    borderRadius: '15px', 
                                    maxHeight: '450px', 
                                    objectFit: 'contain',
                                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.6))" 
                                }}
                                onError={(e) => { e.target.src = defaultImage; }}
                            />
                        </div>

                        {/* Sağ: Bilgiler Alanı */}
                        <div className="col-md-7 p-5 d-flex flex-column justify-content-center">
                            {/* Yazar Kısmı */}
                            <div className="mb-4">
                                <label className="text-uppercase fw-bold mb-1" style={{ color: "var(--primary-color)", fontSize: "0.85rem", letterSpacing: "1px" }}>YAZAR</label>
                                <h2 className="fw-bold" style={{ color: "#ffffff" }}>{book.author?.name || "Bilinmeyen Yazar"}</h2>
                            </div>

                            {/* ISBN ve Dil Yan Yana */}
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label className="text-uppercase fw-bold mb-1" style={{ color: "var(--primary-color)", fontSize: "0.8rem", letterSpacing: "1px" }}>ISBN</label>
                                    <p className="fs-5 fw-medium" style={{ color: "#e0e0e0" }}>{book.isbn}</p>
                                </div>
                                <div className="col-6">
                                    <label className="text-uppercase fw-bold mb-1" style={{ color: "var(--primary-color)", fontSize: "0.8rem", letterSpacing: "1px" }}>DİL</label>
                                    <p className="fs-5 fw-medium" style={{ color: "#e0e0e0" }}>{book.language}</p>
                                </div>
                            </div>

                            {/* Açıklama Alanı */}
                            <div className="mb-4">
                                <label className="text-uppercase fw-bold mb-1" style={{ color: "var(--primary-color)", fontSize: "0.8rem", letterSpacing: "1px" }}>KİTAP ÖZETİ</label>
                                <p style={{ color: "#b0b0b0", lineHeight: '1.8', fontSize: "1.05rem" }}>
                                    {book.description || "Bu eşsiz eser hakkında henüz bir özet bilgisi eklenmemiş."}
                                </p>
                            </div>

                            {/* Alt Kısım: Stok ve Butonlar */}
                            <div className="d-flex align-items-center justify-content-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <div>
                                    <span className={`badge px-3 py-2 ${book.stock > 0 ? 'bg-success text-white' : 'bg-danger text-white'}`} 
                                          style={{ borderRadius: '8px', fontSize: "0.9rem" }}>
                                        {book.stock > 0 ? `Stokta: ${book.stock} Adet` : 'Tükendi'}
                                    </span>
                                </div>
                                
                                {/* Butonlar Grubu*/}
                            <div className="d-flex gap-3 align-items-center">
                                <button 
                                    onClick={() => navigate(-1)} 
                                    className="btn btn-link text-decoration-none fw-bold px-0 me-3 cancel-btn"
                                    style={{ 
                                        color: "rgba(255, 255, 255, 0.6)", // Varsayılan açık gri
                                        fontSize: "0.95rem",
                                        transition: "0.3s"
                                    }}
                                >
                                    ← Vazgeç
                                </button>
                                    <button 
                                        className="btn px-5 py-2 fw-bold" 
                                        disabled={book.stock <= 0}
                                        onClick={handleCheckout}
                                        style={{ 
                                            backgroundColor: "var(--primary-color)", 
                                            color: "#000", 
                                            borderRadius: '12px',
                                            boxShadow: book.stock > 0 ? '0 8px 20px rgba(209, 146, 196, 0.4)' : 'none',
                                            transition: "0.3s"
                                        }}
                                    >
                                        Ödünç Al
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;