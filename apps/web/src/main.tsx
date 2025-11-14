import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import AppRoutes from './AppRoutes';
import './i18n';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
        <ToastContainer />
    </StrictMode>,
);
