'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const addOne = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = await usersService.addOne(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const deleteOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteOne(userId);
  res.sendStatus(204);
};

const updateOne = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.updateOne(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
