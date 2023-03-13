'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await userService.createUser(name);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    global.console.log(error.message);
  }
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const user = userService.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const user = userService.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const upratedUser = await userService.updateUser({
    id: userId, name,
  });

  res.statusCode = 200;
  res.send(upratedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
