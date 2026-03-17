import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function BookDetailPage() {
  const { id } = useParams(); // URL'deki id'yi yakalar
  const [book, setBook] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Giriş yapan kullanıcıyı al

  useEffect(() => {
    api.get(`/books/${id}`).then(res => setBook(res.data));
  }, [id]);

  const handleCheckout = async () => {
    if (!user) {
      alert("Önce giriş yapmalısın brom!");
      return;
    }

    try {
      // Backend'deki @PutMapping("/checkout") metoduna istek atıyoruz
      const response = await api.put(`/books/checkout?userId=${user.id}&bookId=${id}`);
      setBook(response.data); // Kitabın güncel halini (stok azaldı, user eklendi) state'e yaz
      alert("Kitap başarıyla ödünç alındı!");
    } catch (error) {
      alert("Bir hata oluştu. Stok bitmiş olabilir!");
    }
  };

  if (!book) return <div>Yükleniyor...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <p><strong>Yazar:</strong> {book.author?.name}</p>
      <p><strong>Açıklama:</strong> {book.description}</p>
      <p><strong>Stok Durumu:</strong> {book.stock}</p>

      {/* Eğer kitap zaten birindeyse butonu devre dışı bırakalım */}
      {book.currentUser ? (
        <div style={{ color: "red" }}>Bu kitap şu an {book.currentUser.username} adlı kullanıcıda.</div>
      ) : (
        <button 
          onClick={handleCheckout} 
          disabled={book.stock <= 0}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {book.stock > 0 ? "Ödünç Al" : "Stokta Yok"}
        </button>
      )}
    </div>
  );
}