'use strict';

const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  upgradeUser,
} = require('../services/usersService');

const getUsers = async(req, res) => {
  try {
    const users = await getAllUsers();

    if (!users) {
      res.sendStatus(404);
    }

    res.status(200).send(users);
  } catch (error) {
    res.send(error.message);
  }
};

const getUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  try {
    const newUser = await createNewUser(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.send(error.message);
  }
};

const removeUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      res.sendStatus(404);
    }

    await deleteUser(id);

    res.sendStatus(204);
  } catch (error) {
    res.send(error.message);
  }
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(404);
  }

  if (!name) {
    res.sendStatus(400);
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      res.status(404);
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);
    }

    const updatedUser = await upgradeUser({
      id, name,
    });

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
