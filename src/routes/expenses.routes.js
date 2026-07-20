const { Router } = require('express');
const { Op } = require('sequelize');

const { User } = require('../models/User.model');
const { Expense } = require('../models/Expense.model');

const router = Router();

router.post('/', async (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category = null,
    note = null,
  } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
});

router.get('/', async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  if (categories) {
    where.category = { [Op.in]: String(categories).split(',') };
  }

  const expenses = await Expense.findAll({
    where,
  });

  res.status(200).json(expenses);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findOne({ where: { id } });

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.status(200).json(expense);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = await Expense.findOne({ where: { id } });

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  await expense.save();

  res.status(200).json(expense);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findOne({ where: { id } });

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  await expense.destroy();
  res.sendStatus(204);
});

module.exports = router;
