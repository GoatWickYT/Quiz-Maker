import type { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({ error: 'Resource not found' });
};

export default notFoundHandler;
