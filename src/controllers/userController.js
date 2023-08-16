'use strict';

const userServices = require('../services/userServices');

const getAll = async(req, res) => {
  try {
    const users = await userServices.getAll();

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required.' });

    return;
  }

  const newUser = await userServices.create(name);

  res.status(201).send(newUser);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userServices.getUserById(id);

  if (!foundUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  await userServices.remove(id);
  res.status(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  };

  if (!name) {
    res.status(422).json({ message: 'Name is required' });

    return;
  };

  const updatedUser = await userServices.update(id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
