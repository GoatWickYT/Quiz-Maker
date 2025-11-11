import { body } from 'express-validator';

export const createGameValidator = [
    body('name')
        .notEmpty()
        .withMessage('Game name is required')
        .isLength({ max: 50 })
        .withMessage('Game name cannot exceed 50 characters'),
    body('questions').isArray({ min: 1 }).withMessage('Game must have at least one question'),
    body('questions.*.question')
        .notEmpty()
        .withMessage('Question text is required')
        .isLength({ max: 50 })
        .withMessage('Question cannot exceed 50 characters'),
    body('questions.*.answers')
        .isArray({ min: 2 })
        .withMessage('Each question must have at least 2 answers'),
    body('questions.*.answers.*.answer')
        .notEmpty()
        .withMessage('Answer text is required')
        .isLength({ max: 20 })
        .withMessage('Answer cannot exceed 20 characters'),
    body('questions.*.answers.*.correct')
        .isBoolean()
        .withMessage('Answer must have correct as true or false'),
];

export const updateGameValidator = [
    body('questions')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Game must have at least one question'),
    body('questions.*.question')
        .optional()
        .notEmpty()
        .withMessage('Question text is required')
        .isLength({ max: 50 })
        .withMessage('Question cannot exceed 50 characters'),
    body('questions.*.answers')
        .optional()
        .isArray({ min: 2 })
        .withMessage('Each question must have at least 2 answers'),
    body('questions.*.answers.*.answer')
        .optional()
        .notEmpty()
        .withMessage('Answer text is required')
        .isLength({ max: 20 })
        .withMessage('Answer cannot exceed 20 characters'),
    body('questions.*.answers.*.correct')
        .optional()
        .isBoolean()
        .withMessage('Answer must have correct as true or false'),
];

export const updateGameNameValidator = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Game name cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Game name cannot exceed 50 characters'),
];

export const rateGameValidator = [
    body('user').notEmpty().withMessage('User ID is required'),
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isInt({ min: 1, max: 10 })
        .withMessage('Rating must be between 1 and 10'),
];
