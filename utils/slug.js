import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

const slug_options = {
  truncate: 120,
};

export default mongoose.plugin(slug, slug_options);
