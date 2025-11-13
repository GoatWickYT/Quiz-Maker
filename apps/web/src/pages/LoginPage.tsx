import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import './AuthPage.css';
import '../index.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await apiClient.post('/login', { username, password });
            login(result.data, username);
            navigate('/home');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <main className="Auth auth-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <span>
                    Not an agent yet? <a onClick={() => navigate('/register')}>Register</a>
                </span>
            </form>
        </main>
    );
};

export default LoginPage;
