import type { Answer } from './Answer';

export interface Question {
    question: string;
    answers: Answer[];
}
