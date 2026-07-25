'use strict';

const { User } = require('../models/User.model');

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await User.create({ name });

  res.status(201).send(user);
};

const getUsers = async (req, res) => {
  const users = await User.findAll();

  res.send(users);
};

const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.name = req.body.name;
  await user.save();

  res.send(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await user.destroy();
  res.sendStatus(204);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
