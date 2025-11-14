import type { EmblaOptionsType } from 'embla-carousel';
import '../index.css';
import './MainPage.css';
import EmblaCarousel from '../components/EmblaCarousel';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import apiClient, { BACKEND_URL, token } from '../api/apiClient';
import type { User } from '../types/User';

const MainPage = () => {
    const { t } = useTranslation();
    const user: User = JSON.parse(localStorage.getItem('user')!, (key, value) => {
        if (key === '') {
            return {
                id: value?.id ?? '',
                username: value?.username ?? 'Unknown',
                password: value?.password ?? '',
                avatar: value?.avatar ?? 'default-avatar.png',
            };
        }
        return value;
    });

    const OPTIONS: EmblaOptionsType = {};
    const SLIDE_COUNT = 10;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const QUALITIES: string[] = t('mp-qualities', { returnObjects: true }) as string[];
    const MISSIONS: string[] = t('mp-missions', { returnObjects: true }) as string[];

    const numbersRef = useRef<number[]>(
        Array.from(
            { length: 6 },
            (_, i) =>
                i === 0
                    ? Math.floor(Math.random() * 10000) // Agent Number 0-9999
                    : i === 5
                    ? Math.floor(Math.random() * MISSIONS.length) // mission index
                    : Math.floor(Math.random() * QUALITIES.length), // quality indexes
        ),
    );

    useEffect(() => {
        apiClient
            .get('/games', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => console.table(response.data))
            .catch(() => console.error('Error getting games'));
    }, []);

    const numbers = numbersRef.current;

    const selectedQualities = [
        QUALITIES[numbers[1] % QUALITIES.length],
        QUALITIES[numbers[2] % QUALITIES.length],
        QUALITIES[numbers[3] % QUALITIES.length],
        QUALITIES[numbers[4] % QUALITIES.length],
    ];

    const selectedMission = MISSIONS[numbers[5] % MISSIONS.length].split('|');

    return (
        <main className="MainPage">
            <div className="welcome">
                <h1>{t('mp-welcome').split(',')[0]}</h1>
                <h1>
                    {t('mp-welcome')
                        .split(',')[1]
                        .replace(
                            '<name>',
                            user.username.charAt(0).toUpperCase() + user.username.slice(1),
                        )}
                </h1>
            </div>

            <div className="agent-container">
                <div className="agent-container-inner">
                    <div className="profile">
                        <h2>{t('mp-agentfile')}</h2>
                        <span className="description">
                            <div className="field-row">
                                <span className="field-name">{t('mp-file-name')}:</span>
                                <span className="field-value">
                                    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                </span>
                            </div>
                            <div className="field-row">
                                <span className="field-name">{t('mp-file-codename')}:</span>
                                <span className="field-value">
                                    {user.username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="field-row">
                                <span className="field-name">{t('mp-file-number')}:</span>
                                <span className="field-value">
                                    A-{numbers[0].toString().padStart(4, '0')}
                                </span>
                            </div>
                        </span>
                        <img
                            className="image"
                            src={`${BACKEND_URL.replace('/api', '')}/avatars/${user.avatar}`}
                            alt="avatar"
                        />

                        <div>
                            {t('mp-quality')}:
                            <ul>
                                {selectedQualities.map((q, i) => (
                                    <li key={i}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="agent-notes">
                        <h2>{t('mp-briefing')}</h2>
                        <div>
                            <h2>{selectedMission[0]}</h2>
                            {selectedMission[1]}
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel popular">
                <h1>{t('mp-popular')}:</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className="carousel most-played">
                <h1>{t('mp-played')}:</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className="carousel own">
                <h1>{t('mp-own')}:</h1>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
        </main>
    );
};

export default MainPage;
