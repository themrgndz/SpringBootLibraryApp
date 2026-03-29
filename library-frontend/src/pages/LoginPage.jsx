import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('Giriş başarılı!');
        navigate('/');
      } else {
        alert('Hatalı e-posta veya şifre!');
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4 shadow" style={{ backgroundColor: 'var(--bg-card)', color: 'white' }}>
        <h2 className="text-center mb-4">Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">E-posta</label>
            <input 
              type="email" 
              className="form-control" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Şifre</label>
            <input 
              type="password" 
              className="form-control" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;