const express = require('express');
const { Expense, User } = require('../models/models');

const router = express.Router();

// ✅ GET all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET expense by ID
router.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST create a new expense
router.post('/expenses', async (req, res) => {
  try {
    const { title, amount, spentAt, category, note, userId } = req.body;

    if (!title || !amount || !spentAt || !category || !userId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = await Expense.create({
      title,
      amount,
      spentAt,
      category,
      note,
      userId,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH update an expense (partial update)
router.patch('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Only allow updating these fields
    const updatableFields = [
      'title',
      'amount',
      'spentAt',
      'category',
      'note',
      'userId',
    ];
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

    // If userId is being updated, check if the user exists
    if (updates.userId !== undefined) {
      const user = await User.findByPk(updates.userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    Object.assign(expense, updates);
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE expense by ID
router.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
