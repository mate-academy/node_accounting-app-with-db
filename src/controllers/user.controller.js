'use strict';

const { userService } = require('../services/user.service.js');

const get = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  let user;

  try {
    const userFromDB = await userService.getById(id);

    user = userFromDB;
  } catch (error) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(422);

    return;
  }

  await userService.update({
    id,
    name,
  });

  const updatedUser = await userService.getById(id);

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

module.exports.userController = {
  get,
  getOne,
  create,
  update,
  remove,
};
