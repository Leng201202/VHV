import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
export const Login = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await axios.post('/api/user/login', { username, password });


      if (response.status === 200) {
        // Handle successful login, for example, by saving the token
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token in local storage
        console.log('Login successful');
        navigate('/')
        
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <form  onSubmit={handleLogin}>
        <h2>Log in</h2>
        {error && <p className="error-message">{error}</p>}
        <label>Username or email address</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
        />
        <label>Password</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
        />
        <button type="submit" disabled={loading || !username || !password}>
            {loading ? 'Logging in...' : 'Confirm'}
        </button>
        <div className="signup-admin">
            <p>Or</p>
            <a href="/signup">Sign Up / Admin</a>
        </div>
        </form>
        </div>
    </div>);
};

export default Login;
