'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  const { name } = req.body;

  try {
    const user = await usersService.add(name);

    res.statusCode = 201;
    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  try {
    if (!await usersService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await usersService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (!await usersService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await usersService.update(id, data);

    const user = await usersService.getById(id);

    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
