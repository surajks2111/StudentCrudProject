import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const query = `http://localhost:8000/users?email=${email}&password=${password}`;
      const response = await fetch(query);

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      const data = await response.json();

      if (data.length > 0) {
        navigate('/student/table'); // Redirect to student table page
      } else {
        setError('Invalid email or mobile number');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Mobile Number (as Password):</label>
          <input
            type="text"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter mobile number"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
