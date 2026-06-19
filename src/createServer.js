'use strict';

const express = require('express');
const { Category } = require('./models/Category.model');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching categories', error: error.message });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching category', error: error.message });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const newCategory = await Category.create({
      name,
      description: description || null,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating category', error: error.message });
  }
});

router.patch('/categories/:id', async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (name !== undefined) {
      if (!name || name.trim() === '') {
        return res
          .status(400)
          .json({ message: 'Category name cannot be empty' });
      }

      category.name = name;
    }

    if (description !== undefined) {
      category.description = description;
    }

    await category.save();

    res.json(category);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating category', error: error.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting category', error: error.message });
  }
});

router.get('/expenses', async (req, res) => {
  const { userId, category, from, to, categories } = req.query;

  try {
    const whereClause = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (category) {
      whereClause.category = category;
    }

    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : categories.split(',').map((cat) => cat.trim());

      whereClause.category = categoryArray;
    }

    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }

      whereClause.spentAt = {
        [Op.between]: [start, end],
      };
    }

    const expenses = await Expense.findAll({ where: whereClause });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

router.get('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching expense', error: error.message });
  }
});

router.post('/expenses', async (req, res) => {
  const { title, amount, userId, category, note, spentAt } = req.body;

  try {
    if (!title || !amount || !userId) {
      return res
        .status(400)
        .json({ message: 'Title, amount, and userId are required' });
    }

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: 'Invalid amount format' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newExpense = await Expense.create({
      title,
      amount: parsedAmount,
      userId,
      category: category || null,
      note: note || null,
      spentAt: spentAt || new Date().toISOString(),
    });

    return res.status(201).json(newExpense);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error creating expense', error: error.message });
  }
});

router.patch('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, amount, category, note, spentAt } = req.body;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    let updatedAmount = amount;

    if (amount !== undefined) {
      updatedAmount = parseFloat(amount);

      if (isNaN(updatedAmount)) {
        return res.status(400).json({ message: 'Invalid amount format' });
      }
      updatedAmount = updatedAmount.toFixed(2);
    }

    await expense.update({
      title,
      amount: updatedAmount,
      category,
      note,
      spentAt,
    });

    await expense.reload();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
});

router.delete('/expenses/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.post('/users', async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.patch('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name === undefined || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    await user.update({ name });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(router);

  return app;
};

module.exports = {
  createServer,
};
