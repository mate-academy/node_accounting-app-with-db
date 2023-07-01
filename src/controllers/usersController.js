'use strict';

const User = require('../models/userModel');

exports.getAllUsers = async(req, res) => {
  const users = await User.findAll();

  res.json(users);
};

exports.getUserById = async(req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

exports.addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = await User.create(name);

  res.status(201).send(user);
};

exports.deleteUser = async(req, res) => {
  const { id } = req.params;
  const requestedUser = await User.findById(id);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  await User.remove(id);

  res.sendStatus(204);
};

exports.updateUser = async(req, res) => {
  const { userId } = req.params;

  const requestedUser = await User.findById(userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await User.update(userId, name);

  res.send(updatedUser);
};
