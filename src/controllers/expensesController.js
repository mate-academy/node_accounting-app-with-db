'use strict';

const { Op } = require('sequelize');
const { User } = require('../models/User.model');
const { Expense } = require('../models/Expense.model');

const createExpense = async (req, res) => {
  const { spentAt, title, amount, userId, category, note } = req.body;

  if (!spentAt || !title || !amount || !userId) {
    res.sendStatus(400);

    return;
  }

  const user = await User.findByPk(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await Expense.create({
    spentAt,
    title,
    amount,
    userId,
    category,
    note,
  });

  res.status(201).send(expense);
};

const getExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
  }

  const expenses = await Expense.findAll({ where });

  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(expense, req.body);
  await expense.save();

  res.send(expense);
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expense.destroy();
  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
