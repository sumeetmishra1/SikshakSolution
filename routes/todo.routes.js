import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();
let todos = [];
let id = 1;

router.post('/', body('task').notEmpty(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const todo = { id: id++, task: req.body.task, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

router.get('/', (req, res) => res.json(todos));

router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.sendStatus(404);
  Object.assign(todo, req.body);
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

export default router;
