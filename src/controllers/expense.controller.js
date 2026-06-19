'use strict';

const express = require('express');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const where = {};

  if (userId !== undefined) {
    where.userId = Number(userId);
  }

  if (categories) {
    where.category = Array.isArray(categories) ? categories : [categories];
  }

  const { Op } = require('sequelize');

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
});

router.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    return res.sendStatus(400);
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category: category || null,
    note: note || null,
  });

  res.status(201).json(expense);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.sendStatus(400);
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.sendStatus(400);
  }

  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  await expense.update({
    ...(spentAt !== undefined && { spentAt }),
    ...(title !== undefined && { title }),
    ...(amount !== undefined && { amount }),
    ...(category !== undefined && { category }),
    ...(note !== undefined && { note }),
  });

  res.json(expense);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expense.destroy();

  res.sendStatus(204);
});

module.exports = router;
