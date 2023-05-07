'use strict';

const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  const allUsers = await usersService.getAll();

  res.send(allUsers);
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  res.send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  await usersService.update(userId, name);

  const updatedUser = await usersService.getById(userId);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
