import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);
