'use strict';

const {
  models: { User },
} = require('../models/models');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await User.create({ name });

  res.status(201).json(user);
};

const getAll = async (req, res) => {
  const users = await User.findAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

const update = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.name = req.body.name;
  await user.save();

  res.json(user);
};

const remove = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await user.destroy();
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
