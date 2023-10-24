'use strict';

const { usersService }
  = require('./users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const getUserbyId = (req, res) => {
  const { id } = req.params;
  const userToSend = usersService.getUser(id);

  if (!userToSend) {
    res.sendStatus(404);

    return;
  }

  res.send(userToSend);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: Date.now(),
    name,
  };

  usersService.addNewUser(user);
  res.statusCode = 201;

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = usersService.userIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }
  usersService.deleteOneUser(index);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const index = usersService.userIndex(id);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.status(200);

  res.send(usersService.updateUserName(index, name));
};

const usersController = {
  getAllUsers,
  getUserbyId,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  usersController,
};
