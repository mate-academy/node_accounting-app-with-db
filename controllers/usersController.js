'use strict';

const { createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser } = require('../services/userService');

const getAllUsr = async(req, res) => {
  const users = await getAllUsers();

  res.send(users);
};

const getUsrById = async(req, res) => {
  const { userID } = req.params;
  const user = await getUserById(userID);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUsr = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Name is required');

    return;
  }

  const user = await createUser(name);

  res.status(201);
  res.send(user);
};

const deleteUsr = async(req, res) => {
  const { userID } = req.params;
  const deleted = await deleteUser(userID);

  if (!deleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUsr = async(req, res) => {
  const { userID } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Name is required');

    return;
  }

  const foundUser = await getUserById(userID);

  if (!foundUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  const updatedUser = await updateUser(userID, name);

  res.send(updatedUser);
};

module.exports = {
  deleteUsr,
  createUsr,
  getUsrById,
  getAllUsr,
  updateUsr,
};
