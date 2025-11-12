import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import '../index.css';
import apiClient from '../api/apiClient';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await apiClient.post(`/register`, {
            username,
            password,
            avatar,
        });

        console.log(response);

        if (response.status === 201) {
            alert('User created successfully');
            navigate('/login');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <main className="auth-page">
            <h1>Register</h1>
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
                <input
                    type="text"
                    placeholder="Avatar URL (optional)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                />
                <button type="submit">Register</button>
                <span>
                    Already an agent? <a onClick={() => navigate('/login')}>Login</a>
                </span>
            </form>
        </main>
    );
};

export default RegisterPage;
