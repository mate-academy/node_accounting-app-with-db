const { Router } = require('express');
const usersService = require('../services/users.service');

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await usersService.get(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.add(name);

  res.status(201).json(user);
});

usersRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await usersService.remove(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.sendStatus(204);
});

usersRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.sendStatus(400);
  }

  const body = req.body;
  const user = await usersService.update(id, body);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

module.exports = usersRouter;
