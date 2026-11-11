'use strict';

const express = require('express');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');
const { validateId } = require('../middlewares/validateId');

const createExpenses = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      const categoryList = categories.split(',');

      where.category = { [Op.in]: categoryList };
    }

    if (from || to) {
      where.spentAt = {};
    }

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  router.get('/:id', validateId, async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.send(expense);
  });

  router.post('/', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      userId === undefined
    ) {
      res.status(400).json({ message: 'Missing required fields' });

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const newExpense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      category,
      note,
    });

    res.status(201).send(newExpense);
  });

  router.patch('/:id', validateId, async (req, res) => {
    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    await expense.update(updates);
    res.send(expense);
  });

  router.delete('/:id', validateId, async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return router;
};

module.exports = { createExpenses };
