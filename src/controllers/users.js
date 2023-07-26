'use strict';

const usersService = require('../services/users');

const getUserById = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    response
      .sendStatus(404);

    return;
  }

  const normalisedUser = usersService.normalize(user);

  response
    .status(200)
    .send(normalisedUser);
};

const getAllUsers = async(request, response) => {
  const users = await usersService.getUsers();

  if (!users) {
    response
      .sendStatus(500);

    return;
  }

  const normalisedUsers = users.map(usersService.normalize);

  response
    .status(200)
    .send(normalisedUsers);
};

const addUser = async(request, response) => {
  const { name } = request.body;

  if (!name) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.addUser(name);

  if (!user) {
    response
      .sendStatus(500);

    return;
  }

  const normalizedUser = usersService.normalize(user);

  response
    .status(201)
    .send(normalizedUser);
};

const updateUser = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const { name } = request.body;

  if (!name) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.updateUser(userId, name);

  if (!user) {
    response
      .sendStatus(404);

    return;
  }

  const normalizedUser = usersService.normalize(user);

  response
    .status(200)
    .send(normalizedUser);
};

const deleteUser = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const isUserDeleted = await usersService.deleteUser(userId);

  if (!isUserDeleted) {
    response
      .sendStatus(404);

    return;
  }

  response
    .sendStatus(204);
};

module.exports = {
  getUserById,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
