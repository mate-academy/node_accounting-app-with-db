'use strict';

const usersServise = require('../services/users.js');

const getAll = (req, res) => {
  try {
    const users = usersServise.getAll();

    res.send(users);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersServise.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersServise.create(name);

    res.statusCode = 201;
    res.send(newUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersServise.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersServise.remove(userId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersServise.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name && typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = usersServise.update({
      id: userId,
      name,
    });

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
