import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret123';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.sendStatus(401);
});

router.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ profile: { username: user.username } });
  });
});

export default router;
