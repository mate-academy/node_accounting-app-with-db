'use strict';

const { ApiError } = require('../errorHandler/errorHandler');
const { UserService } = require('../services/users.service');

const getAllUsersController = async(req, res) => {
  const userService = new UserService();
  const users = await userService.findAll();

  res.status(200).send(users);
};

const createUsersController = async(req, res, next) => {
  const userService = new UserService();

  const { name } = req.body;

  if (!name) {
    return next(ApiError.badRequest('name can not be empty'));
  }

  const user = await userService.create(name);

  res.status(201).send(user);
};

const getOneUsersController = async(req, res, next) => {
  const userService = new UserService();
  const { userId } = req.params;

  const user = await userService.getById(Number(userId));

  if (!user) {
    return next(ApiError.notFound('user not found'));
  }

  res.send(user);
};

const removeUsersController = async(req, res, next) => {
  const userService = new UserService();
  const { userId } = req.params;

  const isRemoved = await userService.remove(userId);

  if (!isRemoved) {
    return next(ApiError.notFound('user not found'));
  }

  res.sendStatus(204);
};

const updateUsersController = async(req, res, next) => {
  const usersService = new UserService();
  const { userId } = req.params;
  const newUser = req.body;

  const results = await usersService.update(userId, newUser);

  if (results.some(success => !success)) {
    return next(ApiError.notFound('user not found'));
  }

  res.sendStatus(200);
};

module.exports = {
  getAllUsersController,
  createUsersController,
  getOneUsersController,
  removeUsersController,
  updateUsersController,
};
