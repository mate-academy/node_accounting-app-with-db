'use strict';

const express = require('express');
const {
  models: { User },
} = require('../models/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required parameter: name' });
  }

  try {
    const user = await User.create({ name });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  await user.destroy();
  res.status(204).send();
});

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name !== undefined) {
    user.name = name;
  }

  await user.save();
  res.status(200).json(user);
};

router.patch('/:id', updateHandler);
router.put('/:id', updateHandler);

module.exports = router;
