import type { Question } from './Question';
import type { Rating } from './Rating';

export interface Game {
    name: string;
    questions: Question[];
    creatorId: string;
    timesPlayed: number;
    ratings: Rating[];
}
