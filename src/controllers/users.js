'use strict';

const { usersService } = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.status(200).send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing.' });
  }

  try {
    const user = await usersService.getById(userId);

    if (!user) {
      return res
        .status(404).json({ message: `User with id ${userId} not found.` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const add = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await usersService.create({ name });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  try {
    const user = await usersService.getById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

    await usersService.removeById(userId);
    res.sendStatus(204);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'An error occurred while removing the user' });
  }
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId || !name) {
    return res.sendStatus(400);
  }

  try {
    const user = await usersService.getById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

    await usersService.updateById(user.id, { name });
    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while updating the user.' });
  }
};

module.exports = {
  usersController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
