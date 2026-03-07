'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.userId !== undefined) {
    const userId = Number(req.query.userId);

    if (!Number.isInteger(userId)) {
      return res.status(400).send('Bad request');
    }

    where.userId = userId;
  }

  if (req.query.categories !== undefined) {
    const categories = Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories];

    where.category = {
      [Op.in]: categories,
    };
  }

  if (req.query.from !== undefined || req.query.to !== undefined) {
    where.spentAt = {};
  }

  if (req.query.from !== undefined) {
    const fromMs = Date.parse(req.query.from);

    if (Number.isNaN(fromMs)) {
      return res.status(400).send('Bad request');
    }

    where.spentAt[Op.gte] = new Date(req.query.from);
  }

  if (req.query.to !== undefined) {
    const toMs = Date.parse(req.query.to);

    if (Number.isNaN(toMs)) {
      return res.status(400).send('Bad request');
    }

    where.spentAt[Op.lte] = new Date(req.query.to);
  }

  const expenses = await Expense.findAll({
    where,
    order: [['id', 'ASC']],
  });

  res.status(200).json(expenses);
});

router.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body || {};

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    return res.status(400).send('Bad request');
  }

  const userIdNum = Number(userId);
  const amountNum = Number(amount);
  const spentAtMs = Date.parse(spentAt);

  if (
    !Number.isInteger(userIdNum) ||
    !Number.isInteger(amountNum) ||
    Number.isNaN(spentAtMs)
  ) {
    return res.status(400).send('Bad request');
  }

  const user = await User.findByPk(userIdNum);

  if (!user) {
    return res.status(400).send('Not found');
  }

  const expenseData = {
    userId: userIdNum,
    spentAt: new Date(spentAt),
    title,
    amount: amountNum,
    category,
  };

  if (note !== undefined) {
    expenseData.note = note;
  }

  const expense = await Expense.create(expenseData);

  return res.status(201).json(expense);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  return res.status(200).json(expense);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  await expense.destroy();

  return res.status(204).send();
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).send('Bad request');
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  const { spentAt, title, amount, category, note } = req.body || {};

  if (spentAt !== undefined) {
    const spentAtMs = Date.parse(spentAt);

    if (Number.isNaN(spentAtMs)) {
      return res.status(400).send('Bad request');
    }

    expense.spentAt = new Date(spentAt);
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    const amountNum = Number(amount);

    if (!Number.isInteger(amountNum)) {
      return res.status(400).send('Bad request');
    }

    expense.amount = amountNum;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  await expense.save();

  return res.status(200).json(expense);
});

module.exports = router;
