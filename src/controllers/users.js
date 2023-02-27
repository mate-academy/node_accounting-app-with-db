'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(
    users.map(usersService.normalize)
  );
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    usersService.normalize(foundUser)
  );
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(usersService.normalize(newUser));
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.update(userId, name);

  res.send(usersService.normalize(newUser));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
