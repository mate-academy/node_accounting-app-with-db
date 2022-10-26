'use strict';

const { userService } = require('../service/user.js');

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = async(req, res) => {
  const users = await userService.getAll();

    res.send(users);
};

const getOne = async(req, res) => {
  const userId = +req.params.userId;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus = 200;
  res.send(foundUser);
};

const update = async(req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const remove = async(req, res) => {
  const userId = +req.params.userId;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

module.exports.userController = {
  add,
  getOne,
  getAll,
  update,
  remove,
};
