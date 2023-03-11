import express from 'express';
import {privateRouter} from './private_router';
import {publicRouter} from './public_router';

const router = express.Router();

router.use('/public', publicRouter);
router.use('/private', privateRouter);

export {router as apiRouter};
