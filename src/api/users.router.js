const { Router } = require('express');
const usersService = require('../services/users.service');
const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
});

usersRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).send(user);
});

usersRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);

  res.sendStatus(204);
});

usersRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);
  const newName = req.body.name;

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update(id, newName);

  res.send(updatedUser);
});

module.exports = {
  usersRouter,
};
