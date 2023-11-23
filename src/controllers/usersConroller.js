'use strict';

const { validate } = require('uuid');
const usersService = require('./../services/usersService');

const get = async(req, res) => {
  try {
    const users = await usersService.getAll();

    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await usersService.create(name);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    if (!(await usersService.getById(id))) {
      res.sendStatus(404);

      return;
    }

    await usersService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!validate(id) || !name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    if (!(await usersService.getById(id))) {
      res.sendStatus(404);

      return;
    }

    await usersService.update(id, name);

    const updatedUser = await usersService.getById(id);

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
