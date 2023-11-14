import { Router } from "express";
import db from "../db/db";
import { User } from "../db/models/user";
import { getUser } from '../db/users';
import { loggedIn } from "./middlewares/user";

const router = Router();

router.get('/users/me', loggedIn, (req, res) => {
  res.json(req.user);
});

router.post('/users/login', async (req, res) => {
  if (req.user) {
    res.status(400).json({ message: 'User already logged in' });
    return;
  }

  const { username, password } = req.body;

  const u: User = await db<User>('users')
    .select('id', 'hashed_password')
    .from('users')
    .where({ username })
    .first();

  if (!u) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (u.hashed_password) {
    if (Bun.password.verifySync(password, u.hashed_password)) {
      const user = await getUser({ id: u.id });
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: err });
        }
        return res.status(200).json(user);
      });
    }
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

router.post('/users/logout', loggedIn, (req, res) => {
  req.logout({}, () => res.status(200).json({ message: 'OK' }));
});

export { router };
