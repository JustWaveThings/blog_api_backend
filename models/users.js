import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// consider adding mongoose-slug-generator to generate slugs for posts and users https://www.npmjs.com/package/mongoose-slug-generator

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  name: { type: String, required: true, max: 100 },
  admin: { type: Boolean, required: true, default: false },
  creation_timestamp: { type: Date, required: true },
  last_login_timestamp: { type: Date, required: false },
  deleted: { type: Boolean, required: true, default: false },
});

export default mongoose.model('User', UserSchema);
