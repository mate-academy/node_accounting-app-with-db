'use strict';

const { User } = require('../models/User.js');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAllUsers = async(req, res) => {
  const users = await User.findAll({
    order: [
      ['createdAt', 'ASC'],
    ],
  });

  res.json(users.map(normalize));
};

const getOneUser = async(req, res) => {
  const { userId } = req.params;
  const findUser = await User.findByPk(userId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  res.json(normalize(findUser));
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.json({ error: 'Name is required' });

    return;
  }

  const newUser = await User.create({
    name,
  });

  res.status(201);
  res.json(normalize(newUser));
};

const removeUser = async(req, res) => {
  const { userId } = req.params;

  const findUser = await User.findByPk(userId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  await User.destroy({
    where: { id: userId },
  });

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const findUser = await User.findByPk(userId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  await User.update({ name }, {
    where: { id: userId },
  });

  const findUpdatedUser = await User.findByPk(userId);

  res.json(normalize(findUpdatedUser));
};

const userController = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};

module.exports = { userController };
