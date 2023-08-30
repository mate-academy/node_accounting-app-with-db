'use strict';

const usersService = require('../services/users');

const create = async(req, res) => {
  try {
    const user = await usersService.create(req.body);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    res.statusCode = 400;
    res.send('Enter all fields');
  }
};

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const foundUser = await usersService.getById(req.params.userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  try {
    const updatedUser = await usersService.update(userId, req.body);

    res.send(updatedUser);
  } catch (error) {
    res.statusCode = 400;
    res.send('There are error in request body');
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
