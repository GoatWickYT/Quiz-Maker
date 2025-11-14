import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';
import { useEffect } from 'react';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const language = localStorage.getItem('language');
        if (language) i18n.changeLanguage(language);
    }, []);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'hu' : 'en');
        localStorage.setItem('language', i18n.language === 'en' ? 'hu' : 'en');
    };

    return (
        <div className="language-switch" onClick={() => toggleLanguage()}>
            {i18n.language !== 'en' ? 'HU' : 'EN'}
        </div>
    );
};

export default LanguageSwitch;
