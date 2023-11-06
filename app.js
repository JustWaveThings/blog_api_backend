import 'dotenv/config';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import createErrors from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongodb-session';
import passport from 'passport';
import database from './utils/database';
import rateLimit from './utils/rateLimit';
import './utils/passport';
import { isAuth } from './utils/authMiddleware';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import postsRouter from './routes/frontend';
import authorRouter from './routes/author';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
); //Enable CORS

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

// express session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: false,
    },
  })
);

// passport

app.use(passport.initialize());
app.use(passport.session());

// custom logging middleware for dev
app.use((req, res, next) => {
  if (req.session.pageViewCount) {
    req.session.pageViewCount++;
  } else {
    req.session.pageViewCount = 1;
  }
  console.log(req.session, req?.user);
  next();
});

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/author', isAuth, authorRouter);

//Compress all routes
app.use(compression());

app.use(function (err, req, res, next) {
  next(createErrors(err));
});

export default app;
