import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configs/dotenv.js';
import type { id } from '../types/id.js';

interface TokenPayload {
    id: id;
    username: string;
}

const JWT_SECRET = config.jwtSecret;

export const attachUser = (req: Request, res: Response, next: NextFunction): Response | void => {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token: string | undefined = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Missing or malformed Authorization header' });

    try {
        const decoded: TokenPayload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = {
            id: decoded.id,
            username: decoded.username,
        };

        next();
    } catch {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
