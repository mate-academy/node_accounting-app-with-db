'use strict';

const {
  getAll,
  getById,
  create,
  changeById,
  deleteById,
} = require('../models/users');

const getAllUsers = async(req, res) => {
  const users = await getAll();

  return res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await create(name);

  return res.status(201).send(newUser);
};

const changeUserById = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const userIdNumber = Number(userId);

  if (!name || !userIdNumber) {
    return res.sendStatus(400);
  }

  const user = await getById(userIdNumber);

  if (!user) {
    return res.status(404);
  }

  const updatedUser = await changeById(userId, { name });

  return res.send(updatedUser);
};

const deleteUserById = async(req, res) => {
  const { userId } = req.params;

  const userIdNumber = Number(userId);

  if (!userIdNumber) {
    return res.sendStatus(400);
  }

  const user = await getById(userIdNumber);

  if (!user) {
    return res.sendStatus(404);
  }

  await deleteById(userIdNumber);

  return res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  changeUserById,
  deleteUserById,
};
