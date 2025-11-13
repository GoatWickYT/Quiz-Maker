import { faMoon, faSun, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import ElectricBorder from './ElectricBorder';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchActive, setSearchActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
        localStorage.setItem('theme', `${darkMode ? 'light' : 'dark'}`);
        document.body.classList.toggle('dark', !darkMode);
    };

    const handleSearchClick = () => {
        setSearchActive(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleSearchBlur = () => {
        setSearchActive(false);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('Searching for:', inputRef.current?.value);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-home">
                <button onClick={() => navigate('/')}>
                    <FontAwesomeIcon className="navbar-home-icon" icon={faHome} />
                </button>
            </div>
            <div className="navbar-search-phone">
                {!searchActive ? (
                    <div className="navbar-search-phone-icon" onClick={handleSearchClick}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                ) : (
                    <ElectricBorder
                        color="#ffd447"
                        speed={1}
                        chaos={0.5}
                        thickness={2}
                        style={{ borderRadius: 8 }}
                    >
                        <input
                            ref={inputRef}
                            autoFocus={true}
                            className="navbar-search-input"
                            type="text"
                            placeholder={t('nav-search')}
                            onBlur={handleSearchBlur}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </ElectricBorder>
                )}
            </div>
            <div className="navbar-search">
                <h1 className="navbar-title">{t('nav-title')}</h1>
                {!searchActive ? (
                    <span className="search-hint" onClick={handleSearchClick}>
                        {t('nav-search-placeholder')}
                    </span>
                ) : (
                    <ElectricBorder
                        color="#ffd447"
                        speed={1}
                        chaos={0.5}
                        thickness={2}
                        style={{ borderRadius: 8 }}
                    >
                        <input
                            ref={inputRef}
                            className="navbar-search-input"
                            autoFocus={true}
                            type="text"
                            placeholder={t('nav-search')}
                            onBlur={handleSearchBlur}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </ElectricBorder>
                )}
            </div>
            <div className="theme-switch-container">
                <div className="theme-switch" onClick={toggleTheme}>
                    <div className={`slider ${darkMode ? 'dark' : 'light'}`}>
                        <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
