'use strict';

const express = require('express');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');

function createExpensesRoute() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const whereClause = {};

    if (req.query.userId) {
      whereClause.userId = Number(req.query.userId);
    }

    if (req.query.categories) {
      whereClause.category = req.query.categories;
    }

    if (req.query.from || req.query.to) {
      whereClause.spentAt = {};

      if (req.query.from) {
        whereClause.spentAt[Op.gte] = req.query.from;
      }

      if (req.query.to) {
        whereClause.spentAt[Op.lte] = req.query.to;
      }
    }

    const filteredExpenses = await Expense.findAll({
      where: whereClause,
    });

    res.send(filteredExpenses);
  });

  router.post('/', async (req, res) => {
    const expense = req.body;

    if (!expense.amount) {
      return res.status(400).send('Amount is required');
    }

    if (!expense.title) {
      return res.status(400).send('title is required');
    }

    if (!expense.userId) {
      return res.status(400).send('userId is required');
    }

    const user = await User.findByPk(expense.userId);

    if (!user) {
      return res.status(400).send('Such user doesn`t exist');
    }

    if (!expense.spentAt) {
      return res.status(400).send('spentAt is required');
    }

    res.status(201).send(await Expense.create(expense));
  });

  router.get('/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.send(expense);
  });

  router.delete('/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();

    res.status(204).send('Deleted');
  });

  router.patch('/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.update(req.body);

    res.send(expense);
  });

  return router;
}

module.exports = createExpensesRoute;
