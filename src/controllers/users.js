'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(foundUser);
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
  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  await userService.update({
    id, name,
  });

  const updatedUserd = await userService.getById(id);

  res.send(updatedUserd);
};

const remove = async(req, res) => {
  const { id } = req.params;

  try {
    const foundUser = userService.getById(id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    await userService.remove(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(402);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
