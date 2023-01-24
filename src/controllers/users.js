'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  res.send(foundUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = await userService.addOne(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  userService.deleteOne(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  // eslint-disable-next-line no-console
  console.log(userId);

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  };

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  const updatedUser = await userService.updateOne(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
