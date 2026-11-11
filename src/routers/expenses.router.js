'use strict';

const express = require('express');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');
const { validateId } = require('../middlewares/valedateId');

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

    if (from) {
      where.spentAt = { [Op.gte]: from };
    }

    if (to) {
      where.spentAt = { [Op.lte]: to };
    }

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  router.get('/:id', validateId, async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  router.post('/', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || amount !== undefined || !userId) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.sendStatus(400);

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
      res.sendStatus(404);

      return;
    }

    const updates = {};

    allowedFields.forEach((filed) => {
      if (req.body[filed !== undefined]) {
        updates[filed] = req.body[filed];
      }
    });

    await expense.update(updates);
    res.send(expense);
  });

  router.delete('/:id', validateId, async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return router;
};

module.exports = { createExpenses };
