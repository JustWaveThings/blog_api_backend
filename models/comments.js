import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { DateTime } from 'luxon';

const CommentSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    body: { type: String, required: true, max: 1000 },
    reported: { type: Boolean, required: true, default: false },
    published_timestamp: { type: Date, required: true, default: Date.now() },
    parent_post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    likes: { type: Number, required: true, default: 0 },
  },
  { toJSON: { virtuals: true } }
);

// virtual for comment age

CommentSchema.virtual('published_timestamp_formatted').get(function () {
  return this.published_timestamp
    ? DateTime.fromJSDate(this.published_timestamp).toLocaleString(
        DateTime.DATE_MED
      )
    : '';
});

CommentSchema.virtual('comment_age_published').get(function () {
  return this.published_timestamp
    ? +DateTime.fromJSDate(this.published_timestamp)
        .until(DateTime.now())
        .toDuration('days')
        .toObject()
        .days.toFixed(0)
    : null;
});

export default mongoose.model('Comment', CommentSchema);
