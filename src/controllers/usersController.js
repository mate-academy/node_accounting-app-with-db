'use strict';

const userService = require('../service/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getUser = async(req, res) => {
  const { userId } = req.params;
  const user = await userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  return res.send(user);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.add(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const user = await userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(Number(userId));
  res.status(204).send(user);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const user = await userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await userService.update({
    id: user.id,
    name,
  });

  res.send(user);
};

module.exports = {
  getAll,
  getUser,
  add,
  remove,
  update,
};
