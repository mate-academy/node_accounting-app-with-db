'use strict';

const {
  getAll,
  createUser,
  getOne,
  deleteOne,
  updateOne,
} = require('../services/userServices');

const validateBody = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
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
    res.sendStatus(500);
  }
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await createUser(name);

    res.status(201).json(user);
  } catch (e) {
    res.sendStatus(500);
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
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
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
    res.sendStatus(500);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  validateBody,
};
