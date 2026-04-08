'use strict';

const express = require('express');
const { User } = require('../models/User.model');

function createUsersRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    res.send(await User.findAll());
  });

  router.post('/', async (req, res) => {
    const user = req.body;

    if (!user.name) {
      return res.status(400).send('Name is required');
    }

    res.status(201).send(await User.create(user));
  });

  router.get('/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  });

  router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.destroy();

    res.status(204).send('Deleted');
  });

  router.patch('/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.update(req.body, { silent: true });

    res.send(user);
  });

  return router;
}

module.exports = createUsersRouter;
