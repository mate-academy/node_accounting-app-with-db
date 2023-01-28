'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(
    users.map(usersService.normalize),
  );
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    usersService.normalize(foundUser),
  );
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;

  res.send(
    usersService.normalize(newUser),
  );
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(422);

    return;
  }

  await usersService.update({
    id: userId,
    name,
  });

  const updatedUser = await usersService.getById(userId);

  res.send(
    usersService.normalize(updatedUser),
  );
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
