import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { validateId } from '../validators/validateId.js';
import { validateRequest } from '../validators/validateRequest.js';
import {
    createUserValidator,
    updatePasswordValidator,
    updateAvatarValidator,
    updateUsernameValidator,
} from '../validators/userValidations.js';
const userRouter = Router();

userRouter.get('/users', UserController.getAllUsers);
userRouter.get('/users/:username', UserController.getUserByUsername);

userRouter.post('/users', createUserValidator, validateRequest, UserController.createUser);

userRouter.delete('/users/:id', validateId, UserController.deleteUser);

userRouter.patch(
    '/users/:id/password',
    validateId,
    updatePasswordValidator,
    validateRequest,
    UserController.updatePassword,
);
userRouter.patch(
    '/users/:id/name',
    validateId,
    updateUsernameValidator,
    validateRequest,
    UserController.updateUsername,
);
userRouter.patch(
    '/users/:id/avatar',
    validateId,
    updateAvatarValidator,
    validateRequest,
    UserController.updateAvatar,
);

export default userRouter;
