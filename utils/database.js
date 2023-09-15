import 'dotenv/config';
import mongoose from 'mongoose';
import debug from 'debug';

mongoose.set('strictQuery', false);

const mongoDB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dmc0his.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

function dbMiddleware(req, res, next) {
  main().catch(err => debug(err));
  next();
}

async function main() {
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbMiddleware;
