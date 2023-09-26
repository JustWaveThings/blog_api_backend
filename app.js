import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import createErrors from 'http-errors';
// import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongodb-session';

import database from './utils/database';
import rateLimit from './utils/rateLimit';
// import passportConfig from './utils/passport';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';

const app = express();

app.use(cors()); //Enable CORS

app.use(rateLimit); //Rate Limiting

app.use(database); //Database Connection

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': 'self',
    },
  })
);

const MongoStoreSession = MongoStore(session);

const store = new MongoStoreSession({
  uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dmc0his.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  collection: 'sessions',
});

store.on('error', function (error) {
  console.log(error);
});

// Passport

// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(compression()); //Compress all routes

app.use(function (req, res, next) {
  next(createErrors(404));
});

export default app;
