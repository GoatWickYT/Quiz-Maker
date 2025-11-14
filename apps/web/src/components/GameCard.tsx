import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Game } from '../types/Game';
import type { Rating } from '../types/Rating';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const GameCard = (game: Game) => {
    const getAverage = (ratings: Rating[]) => {
        const sum: number = ratings.map((rating) => rating.rating).reduce((a, b) => a + b);
        const average = sum / ratings.length;
        return <>{average}/10</>;
    };
    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-image">
                    <img src="" alt="" />
                    <div className="card-ratings">{getAverage(game.ratings)}</div>
                </div>
                <div className="card-desc">
                    <div className="card-title">{game.name}</div>
                    <div className="card-button">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
