/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const { models } = require('../models/models');

const User = models.User;

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res
      .status(400)
      .json({ error: 'Name is required and must be a string' });
  }

  try {
    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name !== 'undefined' && typeof name !== 'string') {
    return res.status(422).json({ error: 'Name must be a string if provided' });
  }

  try {
    const [updatedRowsCount, updatedUsers] = await User.update(
      { name },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUsers[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.error('Error in getUserById:', error);

    return null;
  }
};

module.exports = {
  router,
  getUserById,
};
