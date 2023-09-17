import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
});

export default mongoose.model('User', UserSchema);
