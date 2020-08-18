import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import ratelimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(ratelimiter);
app.use(cors());
app.use(express.json());

// Middleware to print request route in terminal
function logResquests(request: Request, response: Response, next: NextFunction) {
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(`Request: ${logLabel}`);
    return next();
}
app.use(logResquests);

// Middleware to serve static files
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// Middleware validation errors
app.use(errors());

// Middleware do handle errors
app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.log('\n- RUNTIME ERROR -----------------------------------------------');
    console.log(error.message);
    console.log('---------------------------------------------------------------\n');

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🚀 Server started on port 3333.');
});
