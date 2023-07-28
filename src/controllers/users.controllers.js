'use strict';

const usersServices = require('../services/users.services');
const { normalizeUser } = require('../helpers');

const getAllUsers = async(request, response) => {
  const users = await usersServices.getAllUsers();

  response.send(users.map(user => (
    normalizeUser(user)
  )));
};

const getUser = async(request, response) => {
  const { userId } = request.params;
  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  response.send(normalizeUser(foundUser));
};

const createUser = async(request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  const newUser = await usersServices.createUser(name);

  response.statusCode = 201;
  response.send(normalizeUser(newUser));
};

const removeUser = async(request, response) => {
  const { userId } = request.params;
  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  await usersServices.removeUser(userId);

  response.sendStatus(204);
};

const updateUser = async(request, response) => {
  const { userId } = request.params;
  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);
  }

  if (typeof name !== 'string') {
    response.sendStatus(422);

    return;
  }

  const updatedUser = await usersServices.updateUser(userId, name);

  response.send(normalizeUser(updatedUser));
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
