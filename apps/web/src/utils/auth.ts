import type { JWT } from '../types/JWT';

export const getToken = (): string | null => localStorage.getItem('token');

const isAuthenticated = (): boolean => {
    const token: string | null = getToken();
    if (!token) return false;

    try {
        const payload: JWT = JSON.parse(atob(token.split('.')[1]));
        const exp: number = payload.exp * 1000;
        return Date.now() < exp;
    } catch {
        return false;
    }
};

export default isAuthenticated;
