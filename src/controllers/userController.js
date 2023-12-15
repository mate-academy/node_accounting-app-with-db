'use strict';

let idTracker = 1;

let users = [];

const resetUsers = () => {
  users = [];
};

const isUser = (userId) => {
  return users.some((user) => user.id === userId);
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || Number.isNaN(Number.parseInt(id))) {
    res.sendStatus(400);

    return;
  }

  next();
};

const getAllUsers = (req, res) => {
  res.json(users);
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: idTracker,
    name,
  };

  users.push(newUser);
  idTracker++;
  res.status(201).json(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === Number.parseInt(id));

  if (!foundUser) {
    res.sendStatus(404);
  } else {
    res.json(foundUser);
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === Number.parseInt(id));

  if (userIndex < 0) {
    res.sendStatus(404);
  } else {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const userIndex = users.findIndex((user) => user.id === Number.parseInt(id));

  if (userIndex < 0) {
    res.sendStatus(404);
  } else {
    users.splice(userIndex, 1, {
      id: Number.parseInt(id),
      name,
    });
    res.json(users[userIndex]);
  }
};

module.exports = {
  validateId,
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  resetUsers,
  isUser,
};
