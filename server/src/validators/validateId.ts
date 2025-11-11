import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateId = (req: Request, res: Response, next: NextFunction): void | Response => {
    const id = req.params['id'];
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID parameter' });
    }
    next();
};
