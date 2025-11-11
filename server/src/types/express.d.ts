import { Role } from './roles';

declare global {
    namespace Express {
        interface Request {
            validId?: number;
        }
    }
}

export {};
