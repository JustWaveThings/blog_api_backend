import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/users';
import bcrypt from 'bcryptjs';

// passport local strategy  function 1

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, {
          message: 'User not found',
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// passport serialize user function 2

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// passport deserialize user function 3

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
