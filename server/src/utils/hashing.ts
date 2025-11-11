import argon2 from 'argon2';

export const hash = (plainPassword: string): Promise<string> =>
    argon2.hash(plainPassword, { type: argon2.argon2id });

export const compare = (plainPassword: string, hashedPassword: string): Promise<boolean> =>
    argon2.verify(hashedPassword, plainPassword);
