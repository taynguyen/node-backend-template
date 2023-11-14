import { Router } from 'express';
import passport from 'passport';
import { getUser } from '../db/users';

const router = Router();

router.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ message: 'Logout success' });
  });
});

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
interface INonStrictUser {
  id?: string;
}
passport.serializeUser((u: INonStrictUser, cb) => {
  cb(null, { id: u.id });
});

passport.deserializeUser(async (u: { id: string }, cb) => {
  console.log('deserializeUser', u)
  if (!u || !u.id) {
    return cb(null, false);
  }
  try {
    const user = await getUser({ id: u.id });
    if (!user) {
      return cb(null, false);
    }

    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

export { router };
