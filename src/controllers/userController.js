'use strict';

const {
  getAll,
  createUser,
  getOne,
  deleteOne,
  updateOne,
} = require('../services/userServices');

const isUser = (userId) => {};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || Number.isNaN(Number.parseInt(id))) {
    res.sendStatus(400);

    return;
  }

  next();
};

const getAllUsers = async (_, res) => {
  try {
    const users2 = await getAll();

    res.send(users2);
  } catch (e) {
    res.sendStatus(400);
  }
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Bad request');
    }

    const user = await createUser(name);

    res.status(201).json(user);
  } catch (e) {
    res.sendStatus(400);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getOne(id);

    if (user === null) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await deleteOne(id);

    if (status === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(400);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Bad request');
    }

    const [status, user] = await updateOne({
      name,
      id,
    });

    if (status === 0) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  validateId,
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  isUser,
};
