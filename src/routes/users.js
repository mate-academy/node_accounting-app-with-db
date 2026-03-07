'use strict';

const express = require('express');
const { User } = require('../models/User.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({
    order: [['id', 'ASC']],
  });

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { name } = req.body || {};

  if (name === undefined) {
    return res.status(400).send('Bad request');
  }

  const user = await User.create({ name });

  return res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Not found');
  }

  return res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Not found');
  }

  await user.destroy();

  return res.status(204).send();
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const { name } = req.body || {};
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send('Not found');
  }

  if (name !== undefined) {
    user.name = name;
  }

  await user.save();

  return res.status(200).json(user);
});

module.exports = router;
