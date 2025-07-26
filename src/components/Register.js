import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/users/register', {
        username,
        password
      });

      alert(res.data); // e.g., "User registered successfully"
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      alert('❌ Registration failed. Try a different username.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>📝 Register</h2>

        <input
          type="text"
          placeholder="Choose Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Choose Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p style={{ textAlign: 'center' }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;
