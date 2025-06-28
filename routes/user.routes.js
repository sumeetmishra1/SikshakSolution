import express from 'express';

const router = express.Router();
let users = [];
let id = 1;

router.post('/', (req, res) => {
  const user = { id: id++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

router.get('/', (req, res) => res.json(users));

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
});

router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.sendStatus(404);
  Object.assign(user, req.body);
  res.json(user);
});

router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.sendStatus(204);
});

export default router;
