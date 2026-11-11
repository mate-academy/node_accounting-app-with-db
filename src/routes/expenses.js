'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('../models/models');

function createExpensesRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId !== undefined) {
      where.userId = userId;
    }

    if (from !== undefined || to !== undefined) {
      where.spentAt = {};

      if (from !== undefined) {
        where.spentAt[Op.gte] = from;
      }

      if (to !== undefined) {
        where.spentAt[Op.lte] = to;
      }
    }

    if (categories !== undefined) {
      const categoriesList = categories.split(',');

      where.category = { [Op.in]: categoriesList };
    }

    const result = await Expense.findAll({ where, order: [['id', 'ASC']] });

    res.send(result);
  });

  router.get('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  });

  router.post('/', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await Expense.create({
      userId,
      category,
      spentAt,
      title,
      note,
      amount,
    });

    res.status(201).send(expense);
  });

  router.patch('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.update(req.body || {});
    res.send(expense);
  });

  router.delete('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return router;
}

module.exports = { createExpensesRouter };
