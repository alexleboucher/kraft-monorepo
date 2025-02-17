import createHttpError from 'http-errors';
import isEmail from 'validator/lib/isEmail';
import isUUID from 'validator/lib/isUUID';
import type { UsersCreateBody, UsersDeleteParams } from '@internal/types';

export const validateCreateBody = (body: Partial<UsersCreateBody>) => {
    const { username, email, password } = body;

    if (!username) {
        throw createHttpError(400, 'Username required');
    }
    if (username.length < 5) {
        throw createHttpError(400, 'Username must contain at least 5 characters');
    }

    if (!email) {
        throw createHttpError(400, 'Email required');
    }
    if (!isEmail(email)) {
        throw createHttpError(400, 'Email is invalid');
    }

    if (!password) {
        throw createHttpError(400, 'Password required');
    }
    if (password.length < 8) {
        throw createHttpError(400, 'Password must contain at least 8 characters');
    }

    // As the function checked the properties are not missing,
    // return the body as original type
    return body as UsersCreateBody;
};

export const validateDeleteParams = (params: Partial<UsersDeleteParams>) => {
    const { id } = params;

    if (!id) {
        throw createHttpError(400, 'User id required');
    }
    if (!isUUID(id, '4')) {
        throw createHttpError(404, 'Cannot find user');
    }

    return params as UsersDeleteParams;
};