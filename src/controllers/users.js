'use strict';

const usersService = require('../services/users');

const getAll = (_req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(userId);

  if (!user) {
    res.status(404).send({ error: 'User not found' });
    return;
  }

  res.send(user);
}

const create = (req, res) => {
  const { name: userName} = req.body;

  if (typeof userName !== 'string') {
    res.status(400).send({ error: 'Name is required' });
    return;
  }

  const user = usersService.create(userName);

  res.status(201).send(user);
}

const remove = (req, res) => {
  const { userId } = req.params;

  const isDeleted = usersService.deleteById(userId);

  if (!isDeleted) {
    res.status(404).send({ error: 'User not found' });
    return;
  }

  res.sendStatus(204);
}

const update = (req, res) => {
  const { userId } = req.params;
  const { name: userName} = req.body;

  if (typeof userName !== 'string') {
    res.status(400).send({ error: 'Name is required' });
    return;
  }

  const user = usersService.update(userId, userName);

  if (!user) {
    res.status(404).send({ error: 'User not found' });
    return;
  }

  user.name = userName;
  res.send(user);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
