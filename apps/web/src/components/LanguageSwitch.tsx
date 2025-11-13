import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';

const LanguageSwitch = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'hu' : 'en');
    };

    return (
        <div className="language-switch" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'HU' : 'EN'}
        </div>
    );
};

export default LanguageSwitch;
