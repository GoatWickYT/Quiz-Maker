import { body } from 'express-validator';

// Password regex: at least one uppercase, one lowercase, one number, min 8 chars
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const createUserValidator = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3-30 characters'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .matches(passwordRegex)
        .withMessage(
            'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number',
        ),
    body('avatar')
        .optional()
        .trim()
        .isString()
        .matches(/\.png$/)
        .withMessage('Avatar must be a .png file'),
];

export const updatePasswordValidator = [
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .matches(passwordRegex)
        .withMessage(
            'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number',
        ),
];

export const updateUsernameValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3-30 characters'),
];

export const updateAvatarValidator = [
    body('avatar')
        .notEmpty()
        .withMessage('Avatar is required')
        .trim()
        .isString()
        .matches(/\.png$/)
        .withMessage('Avatar must be a .png file'),
];
