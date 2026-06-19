'use strict';

const { Router } = require('express');

function createUsersRouter(usersService) {
  const usersRouter = Router();

  usersRouter.get('/', async (_req, res) => {
    const users = await usersService.getAll();

    res.status(200).json(users);
  });

  usersRouter.post('/', async (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await usersService.create(name);

    res.status(201).json(user);
  });

  usersRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  usersRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await usersService.deleteById(id);

    res.sendStatus(204);
  });

  usersRouter.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await usersService.update({ id, name });

    res.json(updatedUser);
  });

  return usersRouter;
}

module.exports = {
  createUsersRouter,
};
