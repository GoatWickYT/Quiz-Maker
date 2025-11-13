import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';
import RegisterPage from './pages/RegisterPage';
import LanguageSwitch from './components/LanguageSwitch';

const AppRoutes = () => {
    const { isAuth } = useAuth();

    return isAuth ? (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
                <Route path="/login" element={<Navigate to="/home" />} />
            </Routes>
            <LanguageSwitch />
        </>
    ) : (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <LanguageSwitch />
        </>
    );
};

export default AppRoutes;
