import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import '../index.css';
import apiClient, { BACKEND_URL } from '../api/apiClient';
import { useTranslation } from 'react-i18next';
import AvatarPicker from '../components/AvatarPicker';
import { toast } from 'react-toastify';
import PasswordInput from '../components/PasswordInput';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (password === passwordAgain) {
                apiClient
                    .post('/register', { username, password, avatar })
                    .then(() => {
                        toast.success(t('toast-suc-reg'));
                        navigate('/login');
                    })
                    .catch((err) => {
                        if (err.response?.status === 409) {
                            return toast.error(t('toast-err-reg-taken'));
                        }
                        toast.error(t('toast-err-general'));
                    });
            } else {
                toast.error(`${t('toast-err-psw-match')}`);
            }
        } catch {
            toast.error(`${t('toast-err-reg')}`);
        }
    };

    return (
        <main className="Auth">
            <div className="auth-page">
                <div className="auth-inner">
                    <h1>{t('reg-title')}</h1>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <input
                            type="text"
                            placeholder={t('reg-username')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <PasswordInput
                            placeholder={t('reg-password')}
                            password={password}
                            setPassword={setPassword}
                            required={true}
                        />
                        <PasswordInput
                            placeholder={t('reg-password')}
                            password={passwordAgain}
                            setPassword={setPasswordAgain}
                            required={true}
                        />
                        <AvatarPicker
                            value={`${BACKEND_URL.replace('/api', '')}/assets/${avatar}`}
                            onChange={setAvatar}
                        />
                        <button type="submit">{t('reg-button')}</button>
                        <span>
                            {t('reg-login')}{' '}
                            <a onClick={() => navigate('/login')}>{t('reg-login-redirect')}</a>
                        </span>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
