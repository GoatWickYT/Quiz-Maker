import type { Request, Response } from 'express';

const errorHandler = (err: unknown, req: Request, res: Response): Response | void => {
    if (err instanceof Error) return res.status(500).json({ error: 'Server error' });
    res.status(500).json({ error: 'Server error: Unknown error' });
};

export default errorHandler;
