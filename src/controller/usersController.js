'use strict';

const serviceUser = require('../service/users');

const getAllUsers = async (req, res) => {
  try {
    const users = await serviceUser.getAllUsers();

    res.statusCode = 200;
    res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await serviceUser.getUserById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await serviceUser.createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await serviceUser.getUserById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await serviceUser.deleteUser(+id);
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const existingUser = await serviceUser.getUserById(+id);

    if (!existingUser) {
      return res.sendStatus(404);
    }

    await serviceUser.updateUser(+id, { name });

    const updatedUser = await serviceUser.getUserById(+id);

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
