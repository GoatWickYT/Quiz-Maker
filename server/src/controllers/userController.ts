import type { Request, Response, NextFunction } from 'express';
import { User, type IUser } from '../models/userModel.js';
import { hash } from '../utils/hashing.js';

const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const user: IUser = req.body;
        if (!user.username || !user.password)
            return res.status(400).json({
                message: 'Bad request: missing username or password',
                missing: `
                        ${!user.username ? 'username,' : ''}
                        ${!user.password ? 'password' : ''}`,
            });
        const password = await hash(user.password);
        const createdUser = await User.createUser(user.username, password, user.avatar);
        if (!createdUser) return res.status(409).json({ message: 'Conflict on creation attempt' });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
};

const getUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const username: string | undefined = req.params['username'];
        if (!username || username.trim() === '')
            return res
                .status(400)
                .json({ message: 'Bad request: missing username', missing: 'username' });
        const user = await User.getUserByUsername(username);
        if (!user)
            return res.status(404).json({ message: 'No user found with name', name: username });
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const users: IUser[] = await User.getAllUsers();
        if (users.length === 0) return res.status(404).json({ message: 'No users in database' });
        return res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: string | undefined = req.params['id'];
        if (!id || Number.isNaN(id))
            return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const user: IUser | null = await User.deleteUser(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            message: 'User deleted successfully',
            user: {
                username: user.username,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};

const updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: string | undefined = req.params['id'];
        if (!id || Number.isNaN(id))
            return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const password: string = req.body.password;
        if (!password)
            return res
                .status(400)
                .json({ message: 'Bad request: missing new password', missing: 'new password' });

        const newPassword: string = await hash(password);

        const user: IUser | null = await User.updatePassword(id, newPassword);
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            message: 'Password updated successfully',
            user: {
                username: user.username,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: string | undefined = req.params['id'];
        if (!id || Number.isNaN(id))
            return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const newAvatar: string = req.body.avatar;
        if (!newAvatar)
            return res
                .status(400)
                .json({ message: 'Bad request: missing new avatar', missing: 'new avatar' });

        const user: IUser | null = await User.updateAvatar(id, newAvatar);
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            message: 'Avatar updated successfully',
            user: {
                username: user.username,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const id: string | undefined = req.params['id'];
        if (!id || Number.isNaN(id))
            return res.status(400).json({ message: 'Bad request: missing id', missing: 'id' });

        const newUsername: string = req.body.username;
        if (!newUsername)
            return res
                .status(400)
                .json({ message: 'Bad request: missing new username', missing: 'new username' });

        const user: IUser | null = await User.updateUsername(id, newUsername);
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            message: 'Username updated successfully',
            user: {
                username: user.username,
            },
        });
    } catch (err) {
        next(err);
    }
};

const UserController = {
    createUser,
    getAllUsers,
    getUserByUsername,
    deleteUser,
    updatePassword,
    updateAvatar,
    updateUsername,
};

export default UserController;
