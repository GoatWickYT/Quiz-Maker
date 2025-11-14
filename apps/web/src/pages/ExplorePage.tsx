import { useEffect, useState } from 'react';
import '../index.css';
import './ExplorePage.css';
import type { Game } from '../types/Game';
import apiClient, { token } from '../api/apiClient';
import { useTranslation } from 'react-i18next';
import GameCard from '../components/GameCard';

const ExplorePage = () => {
    const { t } = useTranslation();
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        apiClient
            .get('/games', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setGames(response.data.games))
            .catch(() => console.error('Error getting games'));
    }, []);

    return (
        <main className="game-page">
            <div className="games">
                <div className="games-inner">
                    {games.length === 0 ? (
                        <h1>{t('exp-notfound')}</h1>
                    ) : (
                        <>{games.map((game) => GameCard(game))}</>
                    )}
                </div>
            </div>
            <button className="create-game">{t('exp-create')}</button>
        </main>
    );
};

export default ExplorePage;
