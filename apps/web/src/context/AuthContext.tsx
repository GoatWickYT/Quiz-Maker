import { createContext, useContext, useState } from 'react';
import isAuthenticated from '../utils/auth';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuth: boolean;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(isAuthenticated());
    const { t } = useTranslation();

    const login = (token: string, username: string) => {
        localStorage.setItem('token', token);
        apiClient
            .get(`/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsAuth(true);
                navigate('/');
            })
            .catch(() => toast.error(`${t('toast-err-login')}`));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;

export default AuthProvider;
