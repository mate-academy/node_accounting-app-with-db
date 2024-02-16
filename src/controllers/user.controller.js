'use strict';

const userService = require('../service/user.service');

const getAll = async(req, res) => {
  const users = await userService.get();

  res.send(users);
};

const getOne = async(req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addOne = async(req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create({ name });

  res.statusCode = 201;
  res.send(newUser);
};

const deleteOne = async(req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

const updateOne = async(req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (isNaN(id) || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.update({
    id, name,
  });

  const updatedUser = await userService.getById(id);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
