const express = require('express');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Sequelize } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const where = {};

  if (userId) {
    where.userId = +userId;
  }

  if (categories) {
    where.category = categories.split(',');
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Sequelize.Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Sequelize.Op.lte] = new Date(to);
    }
  }

  try {
    const result = await Expense.findAll({ where });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  const { userId, spentAt, title, amount } = data;
  const user = await User.findByPk(userId);

  if (!user || !userId || !spentAt || !title || !amount) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const expense = await Expense.create(req.body);

  res.status(201).json(expense);
});

router.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json(expense);
});

router.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ error: 'Not found' });
  }

  expense.destroy();

  res.sendStatus(204);
});

router.patch('/:id', async (req, res) => {
  const id = +req.params.id;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  await expense.update(req.body);

  res.status(200).json(expense);
});

module.exports = router;
