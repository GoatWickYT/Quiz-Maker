import { Schema, Document, model, Model } from 'mongoose';
import type { id } from '../types/id.js';

export interface IRating {
    user: id;
    rating: number;
}

export interface IAnswer {
    answer: string;
    correct: boolean;
}

export interface IQuestion {
    question: string;
    answers: IAnswer[];
}

export interface IGame extends Document {
    name: string;
    questions: IQuestion[];
    creatorId: id;
    timesPlayed: number;
    ratings: IRating[];
}

const ratingSchema = new Schema<IRating>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
});

const answerSchema = new Schema<IAnswer>({
    answer: {
        type: String,
        maxLength: 20,
        trim: true,
        required: true,
    },
    correct: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const questionSchema = new Schema<IQuestion>({
    question: {
        type: String,
        maxLength: 50,
        trim: true,
        required: true,
    },
    answers: {
        type: [answerSchema],
        required: true,
        validate: [
            {
                validator: (arr: IAnswer[]) => arr.length >= 2,
                message: 'Each question must have at least 2 answers',
            },
            {
                validator: (arr: IAnswer[]) => arr.some((a) => a.correct),
                message: 'Each question must have at least one correct answer',
            },
        ],
    },
});

const gameSchema = new Schema<IGame>(
    {
        name: {
            type: String,
            maxLength: 50,
            trim: true,
            unique: true,
            required: true,
        },
        questions: {
            type: [questionSchema],
            required: true,
            validate: {
                validator: (arr: IQuestion[]) => arr.length >= 1,
                message: 'A game must have at least one question',
            },
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        timesPlayed: {
            type: Number,
            default: 0,
        },
        ratings: {
            type: [ratingSchema],
            default: [],
        },
    },
    { timestamps: true },
);

gameSchema.statics['createGame'] = async function (
    name: string,
    questions: IQuestion[],
    creatorId: id,
) {
    const game = new this({ name, questions, creatorId });
    return game.save();
};

gameSchema.statics['getGamesByName'] = async function (name: string) {
    return this.find({ name: { $regex: name, $options: 'i' } });
};

gameSchema.statics['getAllGames'] = async function () {
    return this.find();
};

gameSchema.statics['deleteGame'] = async function (id: id) {
    return this.findByIdAndDelete(id);
};

gameSchema.statics['updateGameName'] = async function (id: id, name: string) {
    return this.findByIdAndUpdate(id, { name }, { new: true });
};

gameSchema.statics['updateGameQuestions'] = async function (id: id, questions: IQuestion[]) {
    return this.findByIdAndUpdate(id, { questions }, { new: true, runValidators: true });
};

gameSchema.statics['addRating'] = async function (id: id, rating: IRating) {
    return this.findByIdAndUpdate(
        id,
        { $push: { ratings: rating } },
        { new: true, runValidators: true },
    );
};

gameSchema.statics['changeRating'] = async function (gameId: id, userId: id, newRating: number) {
    return this.findOneAndUpdate(
        { '_id': gameId, 'ratings.user': userId },
        { 'ratings.$.rating': newRating },
        { new: true, runValidators: true },
    );
};

gameSchema.statics['incrementTimesPlayed'] = async function (id: id) {
    return this.findByIdAndUpdate(id, { $inc: { timesPlayed: 1 } }, { new: true });
};

export interface IGameModel extends Model<IGame> {
    createGame(name: string, questions: IQuestion[], creatorId: id): Promise<IGame>;
    getGamesByName(name: string): Promise<IGame[] | null>;
    getAllGames(): Promise<IGame[]>;
    deleteGame(id: id): Promise<IGame | null>;
    updateGameName(id: id, name: string): Promise<IGame | null>;
    updateGameQuestions(id: id, question: IQuestion[]): Promise<IGame | null>;
    incrementTimesPlayed(id: id): Promise<IGame | null>;
    addRating(id: id, rating: IRating): Promise<IGame | null>;
    changeRating(gameId: id, userId: id, newRating: number): Promise<IGame | null>;
}

export const Game = model<IGame, IGameModel>('Game', gameSchema);
