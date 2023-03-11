/* eslint-disable node/no-extraneous-import */
import express, {Express} from 'express';
import {indexRouter} from './routes/index_router';
import errorHandler from './app/http/middleware/error_middleware';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(indexRouter);
app.use(errorHandler);

export default app;
