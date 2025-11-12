import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import config from '../configs/dotenv.js';
import type { id } from '../types/id.js';

const JWT_SECRET = config['jwtSecret'];
interface JwtPayload {
    id: id;
    username: string;
}

export const signJwt = (payload: JwtPayload, timezone: string): string => {
    const now = DateTime.now().setZone(timezone);
    const midnight = now.plus({ days: 1 }).startOf('day');
    const secondsUntilMidnight = Math.floor(midnight.diff(now, 'seconds').seconds);

    return jwt.sign(payload, JWT_SECRET, { expiresIn: secondsUntilMidnight });
};

export const verifyJwt = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
        return null;
    }
};
