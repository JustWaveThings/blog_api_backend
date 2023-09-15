import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(cors()); //Enable CORS
app.use(helmet()); //Protects against well known vulnerabilities
app.use(compression()); //Compress all routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
