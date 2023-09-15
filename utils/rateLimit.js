import RateLimit from 'express-rate-limit';

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: 'Too many requests, please try again later.',
});

export default limiter;
