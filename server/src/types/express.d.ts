import type { id } from './id.ts';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: id;
                username: string;
            };
            validId?: number;
        }
    }
}

export {};
