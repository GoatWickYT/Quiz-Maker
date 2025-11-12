import type { Request, Response, NextFunction } from 'express';
import { User, type IUser } from '../models/userModel.js';
import { compare, hash } from '../utils/hashing.js';
import { signJwt } from '../utils/jwt.js';

const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { username, password, timezone } = req.body;
        if (!username || !password)
            return res.status(401).json({ message: 'Missing or wrong data' });

        const user: IUser | null = await User.getUserByUsername(username);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const correct: boolean = await compare(password, user.password);
        if (!correct) return res.status(401).json({ message: 'Missing or wrong data' });
        const token = signJwt({ id: user.id, username: user.username }, timezone || 'UTC');
        return res.status(200).json(token);
    } catch (err) {
        next(err);
    }
};

const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const { username, password, avatar } = req.body;
        if (!username || !password)
            return res.status(401).json({ message: 'Missing or wrong data' });

        const user: IUser | null = await User.getUserByUsername(username);
        if (user) return res.status(409).json({ message: 'Username already taken' });
        else {
            const hashed = await hash(password);
            const result: IUser = await User.createUser(username, hashed, avatar);
            return res.status(201).json({ message: 'User created', user: result });
        }
    } catch (err) {
        next(err);
    }
};

const AuthController = { login, register };

export default AuthController;
