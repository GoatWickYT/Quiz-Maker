import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import './AuthPage.css';
import '../index.css';
import { useTranslation } from 'react-i18next';
import PasswordInput from '../components/PasswordInput';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await apiClient.post('/login', { username, password });
            login(result.data, username);
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <main className="Auth ">
            <div className="auth-page">
                <div className="auth-inner">
                    <h1>{t('log-title')}</h1>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <input
                            type="text"
                            placeholder={t('log-username')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <PasswordInput
                            placeholder={t('log-password')}
                            password={password}
                            setPassword={setPassword}
                            required={true}
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                        <button type="submit">{t('log-button')}</button>
                        <span>
                            {t('log-register')}{' '}
                            <a onClick={() => navigate('/register')}>
                                {t('log-register-redirect')}
                            </a>
                        </span>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
