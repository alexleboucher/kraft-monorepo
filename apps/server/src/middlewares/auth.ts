import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(createHttpError(401, 'User must be authenticated'));
    }
};

export const isUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isUnauthenticated()) {
        next();
    } else {
        next(createHttpError(401, 'User must not be authenticated'));
    }
};