'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getById(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  const { name } = req.body;

  try {
    const newUser = await userService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getById(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    await userService.update(userId, name);

    const updatedUser = await userService.getById(userId);

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  const { userId } = req.params;

  try {
    const userInBase = await userService.getById(userId);

    if (!userInBase) {
      res.sendStatus(404);

      return;
    }

    await userService.remove(userId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
