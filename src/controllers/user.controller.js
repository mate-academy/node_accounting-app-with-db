'use strict';

const express = require('express');
const { User } = require('../models/User.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await User.create({ name });

  res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.sendStatus(400);
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!Number.isInteger(id) || !name) {
    return res.sendStatus(400);
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await user.update({ name });

  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const user = await User.findByPk(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await user.destroy();
  res.sendStatus(204);
});

module.exports = router;
