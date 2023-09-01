/* eslint-disable no-console */
'use strict';

const usersService = require('../services/users');

const create = async(req, res) => {
  try {
    const user = await usersService.create(req.body);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const getAll = async(req, res) => {
  try {
    const users = await usersService.getAll();

    res.send(users);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const getById = async(req, res) => {
  try {
    const foundUser = await usersService.getById(req.params.userId);

    if (!foundUser) {
      res.statusCode = 404;
      res.send('User not found');

      return;
    }

    res.send(foundUser);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const remove = async(req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.statusCode = 404;
      res.send('User not found');

      return;
    }

    usersService.remove(userId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const update = async(req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.statusCode = 404;
      res.send('User not found');

      return;
    }

    const updatedUser = await usersService.update(userId, req.body);

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
