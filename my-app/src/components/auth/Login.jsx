import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
export const Login = () => {
  const loginApi="http://localhost:8080/api/auth/login";
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
        const response = await axios.post(loginApi, { username, password });


      if (response.status === 200) {
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
        <label>Username</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
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
            <a href="/signup">Sign Up</a>
        </div>
        </form>
        </div>
    </div>);
};

export default Login;
