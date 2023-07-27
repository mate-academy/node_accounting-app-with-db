'use strict';

const userServices = require('../services/userServices');

const getAll = async(req, res) => {
  try {
    const users = await userServices.getAll();

    res.send(users);
  } catch (error) {
    res.sendStatus(400);
  }
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required.' });

    return;
  }

  const newUser = await userServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userServices.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  try {
    await userServices.remove(id);
    res.status(204).send({ message: 'User has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while removing the user' });
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

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
