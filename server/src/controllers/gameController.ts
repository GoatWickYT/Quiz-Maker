import type { Request, Response, NextFunction } from 'express';
import { Game, type IGame, type IQuestion, type IRating } from '../models/gameModel.js';
import type { id } from '../types/id.js';

const createGame = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const { name, questions, creatorId }: IGame = req.body;

        if (!name || !questions || !creatorId) {
            return res.status(400).json({
                message: 'Bad request: missing name, questions or creator id',
                missing: `
                    ${!name ? 'name, ' : ''}
                    ${!questions ? 'questions, ' : ''}
                    ${!creatorId ? 'creatorId' : ''}
                `,
            });
        }

        const createdGame = await Game.createGame(name, questions, creatorId);
        if (!createdGame) return res.status(409).json({ message: 'Conflict during game creation' });

        return res.status(201).json({
            message: 'Game created successfully',
            game: createdGame,
        });
    } catch (err) {
        next(err);
    }
};

const getAllGames = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const games: IGame[] = await Game.getAllGames();
        if (games.length === 0) return res.status(404).json({ message: 'No games in database' });
        return res.status(200).json({ games });
    } catch (err) {
        next(err);
    }
};

const getGamesByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const name: string | undefined = req.params['name'];
        if (!name)
            return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const games: IGame[] | null = await Game.getGamesByName(name);
        if (!games || games.length === 0)
            return res.status(404).json({ message: 'No games found with name', name: name });

        return res.status(200).json({ games });
    } catch (err) {
        next(err);
    }
};

const deleteGame = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: id | undefined = req.params['id'];
        if (!id) return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const deleted = await Game.deleteGame(id);
        if (!deleted) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Game deleted successfully',
            game: deleted,
        });
    } catch (err) {
        next(err);
    }
};

const updateGameName = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: id | undefined = req.params['id'];
        const { name }: { name: string } = req.body;

        if (!id || !name)
            return res.status(400).json({
                message: 'Bad request: missing id or name',
                missing: `
                    ${!id ? 'id, ' : ''}
                    ${!name ? 'name' : ''}
                `,
            });

        const updated = await Game.updateGameName(id, name);
        if (!updated) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Game name updated successfully',
            game: updated,
        });
    } catch (err) {
        next(err);
    }
};

const updateGameQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: id | undefined = req.params['id'];
        const { questions }: { questions: IQuestion[] } = req.body;

        if (!id || !questions)
            return res.status(400).json({
                message: 'Bad request: missing id or questions',
                missing: `
                    ${!id ? 'id, ' : ''}
                    ${!questions ? 'questions' : ''}
                `,
            });

        const updated = await Game.updateGameQuestions(id, questions);
        if (!updated) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Questions updated successfully',
            game: updated,
        });
    } catch (err) {
        next(err);
    }
};

const incrementTimesPlayed = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: id | undefined = req.params['id'];
        if (!id) return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const updated = await Game.incrementTimesPlayed(id);
        if (!updated) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Game timesPlayed incremented',
            game: updated,
        });
    } catch (err) {
        next(err);
    }
};

const addRating = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: id | undefined = req.params['id'];
        const rating: IRating = req.body;

        if (!id || !rating || !rating.user || !rating.rating)
            return res.status(400).json({
                message: 'Bad request: missing rating or user id',
                missing: `
                    ${!id ? 'id, ' : ''}
                    ${!rating ? 'rating object, ' : ''}
                    ${!rating.user ? 'rating user, ' : ''}
                    ${!rating.rating ? 'rating rating' : ''}
                `,
            });

        const updated = await Game.addRating(id, rating);
        if (!updated) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Rating added successfully',
            game: updated,
        });
    } catch (err) {
        next(err);
    }
};

const changeRating = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const gameId: id | undefined = req.params['id'];
        const { userId, newRating }: { userId: id; newRating: number } = req.body;

        if (!gameId || !userId || !newRating)
            return res.status(400).json({
                message: 'Bad request: missing gameId, userId, or newRating',
                missing: `
                    ${!gameId ? 'game id, ' : ''}
                    ${!userId ? 'user id, ' : ''}
                    ${!newRating ? 'new rating' : ''}
                `,
            });

        const updated = await Game.changeRating(gameId, userId, newRating);
        if (!updated) return res.status(404).json({ message: 'Game or rating not found' });

        return res.status(200).json({
            message: 'Rating updated successfully',
            game: updated,
        });
    } catch (err) {
        next(err);
    }
};

const GameController = {
    createGame,
    getAllGames,
    getGamesByName,
    deleteGame,
    updateGameName,
    updateGameQuestions,
    incrementTimesPlayed,
    addRating,
    changeRating,
};

export default GameController;
