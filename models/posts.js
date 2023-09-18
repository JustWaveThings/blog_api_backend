import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// import createSlug from '../utils/slug';

// createSlug();

const PostSchema = new Schema({
  title: { type: String, required: true, max: 250 },
  subtitle: { type: String, required: false, max: 250 },
  body: { type: String, required: true },
  published: { type: Boolean, required: true, default: false },
  created_timestamp: { type: Date, required: true },
  updated_timestamp: { type: Date, required: false },
  published_timestamp: { type: Date, required: false },
  comment_array: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  // slug: { type: String, slug: ['title', 'subtitle'], slug_padding_size: 3, unique: true },
});

// virtual for comment count
PostSchema.virtual('comment_count').get(function () {
  return this.comment_array.length;
});

// virtual for post age

PostSchema.virtual('post_age').get(function () {
  return Date.now() - this.published_timestamp;
});

export default mongoose.model('Post', PostSchema);
