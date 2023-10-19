'use strict';

const userService = require('../services/user.service');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(
    users.map(user => userService.normalize(user))
  );
};

const getById = async(req, res) => {
  const { id } = req.params;
  const searchedUser = await userService.getById(id);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.normalize(searchedUser));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.update({
    id, name,
  });

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
