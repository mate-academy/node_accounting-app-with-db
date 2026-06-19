const express = require('express');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from || to) {
      where.spentAt = {};
    }

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }

    if (categories) {
      where.category = { [Op.in]: categories.split(',') };
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      !title ||
      amount === undefined
    ) {
      return res.status(400).json({ error: "Обов'язкові поля не заповнені" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Витрату не знайдено' });
    }

    const updates = {};
    if (Object.prototype.hasOwnProperty.call(req.body, 'spentAt'))
      updates.spentAt = req.body.spentAt;
    if (Object.prototype.hasOwnProperty.call(req.body, 'title'))
      updates.title = req.body.title;
    if (Object.prototype.hasOwnProperty.call(req.body, 'amount'))
      updates.amount = req.body.amount;
    if (Object.prototype.hasOwnProperty.call(req.body, 'category'))
      updates.category = req.body.category;
    if (Object.prototype.hasOwnProperty.call(req.body, 'note'))
      updates.note = req.body.note;

    await expense.update(updates);

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
