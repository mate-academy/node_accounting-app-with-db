'use strict';

const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Bad request' });

    return;
  }

  try {
    const user = await usersService.create({ name });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    await usersService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    if (!name) {
      res.status(400).json({ error: 'Bad request' });

      return;
    }

    await usersService.update({ id, name });

    const updatedUser = await usersService.getById(id);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
