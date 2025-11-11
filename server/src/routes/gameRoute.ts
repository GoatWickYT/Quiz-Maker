import { Router } from 'express';
import GameController from '../controllers/gameController.js';
import { validateId } from '../validators/validateId.js';
import { validateRequest } from '../validators/validateRequest.js';
import {
    createGameValidator,
    rateGameValidator,
    updateGameNameValidator,
    updateGameValidator,
} from '../validators/gameValidations.js';

const gameRouter = Router();

gameRouter.get('/games', GameController.getAllGames);
gameRouter.get('/games/:name', GameController.getGamesByName);

gameRouter.post('/games/new', createGameValidator, validateRequest, GameController.createGame);
gameRouter.post(
    '/games/:id/rate',
    validateId,
    rateGameValidator,
    validateRequest,
    GameController.addRating,
);

gameRouter.delete('/games/:id', validateId, GameController.deleteGame);

gameRouter.patch(
    '/games/:id/name',
    validateId,
    updateGameNameValidator,
    validateRequest,
    GameController.updateGameName,
);
gameRouter.patch(
    '/games/:id/question',
    validateId,
    updateGameValidator,
    validateRequest,
    GameController.updateGameQuestions,
);
gameRouter.patch('/games/:id/played', validateId, GameController.incrementTimesPlayed);
gameRouter.patch(
    '/games/:id/rate',
    validateId,
    rateGameValidator,
    validateRequest,
    GameController.changeRating,
);

export default gameRouter;
