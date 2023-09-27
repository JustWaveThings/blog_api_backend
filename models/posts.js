import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { DateTime } from 'luxon';

const PostSchema = new Schema(
  {
    title: { type: String, required: true, max: 250 },
    subtitle: { type: String, required: false, max: 250 },
    body: { type: String, required: true },
    published: { type: Boolean, required: true, default: 'false' },
    created_timestamp: { type: Date, required: true },
    updated_timestamp: { type: Date, required: false },
    published_timestamp: { type: Date, required: false },
    comment_array: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, required: true, default: 0 },
  },
  { toJSON: { virtuals: true } }
);

// virtual for date formatting

PostSchema.virtual('created_timestamp_formatted').get(function () {
  return this.created_timestamp
    ? DateTime.fromJSDate(this.created_timestamp).toLocaleString(
        DateTime.DATE_MED
      )
    : '';
});

PostSchema.virtual('updated_timestamp_formatted').get(function () {
  return this.updated_timestamp
    ? DateTime.fromJSDate(this.updated_timestamp).toLocaleString(
        DateTime.DATE_MED
      )
    : '';
});

PostSchema.virtual('published_timestamp_formatted').get(function () {
  return this.published_timestamp
    ? DateTime.fromJSDate(this.published_timestamp).toLocaleString(
        DateTime.DATE_MED
      )
    : '';
});

// virtual for comment count
PostSchema.virtual('comment_count').get(function () {
  return this.comment_array ? this.comment_array.length : 0;
});

// virtual for post age

PostSchema.virtual('post_age_published').get(function () {
  return this.published_timestamp ? Date.now() - this.published_timestamp : '';
});

PostSchema.virtual('post_age_created').get(function () {
  return this.created_timestamp
    ? +DateTime.fromJSDate(this.created_timestamp)
        .until(DateTime.now())
        .toDuration('days')
        .toObject()
        .days.toFixed(0)
    : null;
});

export default mongoose.model('Post', PostSchema);
