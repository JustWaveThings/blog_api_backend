import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const CommentSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  body: { type: String, required: true, max: 1000 },
  reported: { type: Boolean, required: true, default: false },
  published_timestamp: { type: Date, required: true, default: Date.now() },
  parent_post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

// virtual for comment age

CommentSchema.virtual('comment_age').get(function () {
  return Date.now() - this.published_timestamp;
});

export default mongoose.model('Comment', CommentSchema);
