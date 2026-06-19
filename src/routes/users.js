const express = require('express');
// const { models } = require('../models/models');
// const { User } = models;
const { User } = require('../models');
const {
  formatUserResponse,
  formatUsersResponse,
} = require('../utils/responseFormatters');
const { sequelize } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(formatUsersResponse(users));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Bad request - Name is required' });
    }

    const existingUser = await User.findOne({ where: { name } });

    if (existingUser) {
      return res.status(200).json(formatUserResponse(existingUser));
    }

    const newUser = await User.create({ name });

    res.status(201).json(formatUserResponse(newUser));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Bad request - Invalid user ID' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(formatUserResponse(user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Bad request - Invalid user ID' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Bad request - Name is required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    user.name = name;
    await user.save();

    res.status(200).json(formatUserResponse(user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Bad request - Invalid user ID' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
