const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { User, Expense } = require('./models/models');
const { Category } = require('./models/models'); // Import Sequelize models
const { Op } = require('sequelize');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// --- USERS ENDPOINTS ---
app.post('/users', async (req, res) => {
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

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user
app.get('/users/:id', async (req, res) => {
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

// Update user (PATCH)
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only allow updating name, and require it to be present and non-empty
    const { name } = req.body;

    if (name === undefined || name === null || name === '') {
      return res.status(400).json({ error: 'Name is required for update' });
    }

    await user.update({ name });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- EXPENSES ENDPOINTS ---

// Create expense
app.post('/expenses', async (req, res) => {
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

// Get all expenses (with filters)
app.get('/expenses', async (req, res) => {
  try {
    const { userId, category, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (category && categories) {
      return res.status(400).json({
        error: "Provide either 'category' or 'categories', not both.",
      });
    }

    if (category) {
      where.category = category;
    } else if (categories) {
      where.category = categories.split(',');
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single expense
app.get('/expenses/:id', async (req, res) => {
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

// Update expense (PATCH)
app.patch('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Only allow updating these fields
    const allowedFields = [
      'title',
      'amount',
      'spentAt',
      'category',
      'note',
      'userId',
    ];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

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

    await expense.update(updates);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete expense
app.delete('/expenses/:id', async (req, res) => {
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

// --- CATEGORIES ENDPOINTS ---
app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the app instance
module.exports = { createServer: () => app };
