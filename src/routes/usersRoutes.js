const express = require('express');
const { User } = require('../models/models');

const router = express.Router();

// ✅ GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST create a new user
router.post('/users', async (req, res) => {
  try {
    const { name: userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name: userName });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH update user (partial update)
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow updating the 'name' field
    const updatableFields = ['name'];
    const updates = {};

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Require at least one valid field to update
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: 'No valid fields provided for update' });
    }

    Object.assign(user, updates);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
