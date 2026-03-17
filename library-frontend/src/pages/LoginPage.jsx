import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            if (response.data && response.data.id) { 
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("Giriş başarılı brom!");
                navigate("/");
            } else {
                alert("E-posta veya şifre hatalı!");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Sunucuya bağlanılamadı!");
        }
    };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Kütüphane Girişi</h2>
        {/* Email Inputu */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password Inputu */}
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}