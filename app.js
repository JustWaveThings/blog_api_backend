import 'dotenv/config';
import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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
import { asyncHandler } from 'express-async-handler';

// Create the Express application object

const app = express();

// Enable CORS

app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Database Connection

app.use(database);

// Helmet CSP

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': 'self',
    },
  })
);

// session store
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
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//Compress all routes
app.use(compression());

// parse cookies

// app.use(cookieParser({ secret: process.env.SESSION_SECRET }));

// request loggging middleware

app.use(morgan('tiny'));

// parse application/json

app.use(express.json());

// serve static files

// app.use(express.static(path.join(__dirname, 'public')));

// Rate Limiting

// app.use(rateLimit);

// custom logging middleware

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// routes

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/author', authorRouter);
app.use('/', indexRouter);

// error catcher

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json(err);
}

app.use(errorHandler);

export default app;
