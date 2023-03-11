import express, {Request, Response} from 'express';

const router = express.Router();

import {apiRouter} from './api/api_router';

import mainMiddleware from '../app/http/middleware/main_middleware';

router.get('/', (req: Request, res: Response) => {
  res.json({title: 'Service Is Running'});
});

router.use('/api', mainMiddleware, apiRouter);

export {router as indexRouter};
