'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await userService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    };

    res.send(foundUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = await userService.create(name);

    res.status(201);
    res.send(newUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await userService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    await userService.remove(userId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await userService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    };

    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    await userService.update(userId, name);

    const user = await userService.getById(userId);

    res.send(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
