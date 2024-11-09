import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPassword } = formData;

    let validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('/api/signup', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Signup failed. Please try again.' });
    }
  };

  return (
    <div className='signup-pages'>
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        {errors.general && <p className="error">{errors.general}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
