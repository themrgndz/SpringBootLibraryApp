import React, { useState, useEffect } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 12;

    useEffect(() => {
        fetchBooks();
    }, [currentPage, searchQuery]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/books', {
                params: {
                    title: searchQuery,
                    page: currentPage,
                    size: pageSize
                }
            });
            setBooks(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (error) {
            console.error("Kitaplar çekilirken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    const bgImageUrl = "https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
    
    const pageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        minHeight: '100vh',
    };

    return (
        <div style={pageStyle}>
            <div className="container py-5">
                {/* --- HERO & SEARCH SECTION --- */}
                <div className="row justify-content-center mb-5 py-4">
                    <div className="col-md-8 text-center">
                        <h1 className="display-4 fw-bold mb-3" style={{ color: "var(--primary-color)", textShadow: "0 4px 10px rgba(0,0,0,0.8)" }}>
                            Keşfedilmeyi Bekleyen Hikayeler
                        </h1>
                        <p className="fs-5 mb-4" style={{ color: "var(--text-main)", opacity: 0.8 }}>
                            Binlerce kitap arasından senin için doğru olanı bul.
                        </p>
                        
                        <div className="input-group input-group-lg shadow-lg" style={{ borderRadius: "15px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                            <span className="input-group-text border-0" style={{ backgroundColor: "var(--bg-card)", color: "var(--primary-color)" }}>
                                🔍
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-0 py-3 shadow-none" 
                                placeholder="Kitap ismi, yazar veya ISBN ara..."
                                style={{ backgroundColor: "var(--bg-card)", color: "var(--text-main)" }}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(0);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- BOOKS GRID --- */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Yükleniyor...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row g-4">
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <p className="fs-4 text-muted">Aradığınız kriterlere uygun kitap bulunamadı.</p>
                                </div>
                            )}
                        </div>

                        {/* --- PAGINATION --- */}
                        {totalPages > 1 && (
                            <nav className="mt-5">
                                <ul className="pagination justify-content-center gap-2">
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link rounded-circle border-0 shadow-sm px-3 py-2" 
                                            style={{ backgroundColor: "var(--bg-card)", color: "var(--text-main)" }}
                                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                        >
                                            &laquo;
                                        </button>
                                    </li>
                                    
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className="page-item">
                                            <button 
                                                className={`page-link rounded-circle border-0 shadow-sm px-3 py-2`}
                                                style={{ 
                                                    backgroundColor: currentPage === index ? "var(--primary-color)" : "var(--bg-card)",
                                                    color: currentPage === index ? "var(--bg-dark)" : "var(--text-main)",
                                                    fontWeight: "600",
                                                    transition: "0.3s"
                                                }}
                                                onClick={() => setCurrentPage(index)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link rounded-circle border-0 shadow-sm px-3 py-2" 
                                            style={{ backgroundColor: "var(--bg-card)", color: "var(--text-main)" }}
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                        >
                                            &raquo;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;