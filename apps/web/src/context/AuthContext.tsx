import { createContext, useContext, useState } from 'react';
import isAuthenticated from '../utils/auth';

interface AuthContextType {
    isAuth: boolean;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    const login = (token: string, username: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuth(true);
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
