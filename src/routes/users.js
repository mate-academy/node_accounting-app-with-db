'use strict';

const express = require('express');
const { User } = require('../models/User.model');

function createUsersRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  router.post('/', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  router.patch('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body || {};

    if (name !== undefined) {
      await user.update({ name });
    }

    res.send(user);
  });

  router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();
    res.sendStatus(204);
  });

  return router;
}

module.exports = { createUsersRouter };
