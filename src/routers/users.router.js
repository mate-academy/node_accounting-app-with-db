'use strict';

const express = require('express');
const { User } = require('../models/User.model');
const { validateUuid } = require('../middlewares/validateUuid');

const createUsers = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  router.get('/:id', validateUuid, async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.send(user);
  });

  router.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const newUser = await User.create({ name });

    res.status(201).send(newUser);
  });

  router.patch('/:id', validateUuid, async (req, res) => {
    const { name } = req.body;
    const id = req.params.id;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await user.update({ name });

    res.send(user);
  });

  router.delete('/:id', validateUuid, async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await user.destroy();
    res.sendStatus(204);
  });

  return router;
};

module.exports = { createUsers };
