import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
};
