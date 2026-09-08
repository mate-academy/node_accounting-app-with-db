'use strict';

const { Op } = require('sequelize');
const { Expense } = require('./../models/Expense.model');
const { User } = require('./../models/User.model');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filters = {};

  if (userId) {
    filters.userId = Number(userId);
  }

  if (categories) {
    filters.category = { [Op.in]: categories.split(',') };
  }

  if (from || to) {
    filters.spentAt = {};

    if (from) {
      filters.spentAt[Op.gte] = from;
    }

    if (to) {
      filters.spentAt[Op.lte] = to;
    }
  }

  const expenses = await Expense.findAll({ where: filters });

  res.status(200).json(expenses);
};

const createExpense = async (req, res) => {
  const { userId, title, amount, spentAt, category, note } = req.body;
  const user = await User.findByPk(userId);

  if (!userId || !title || !amount || !spentAt || !user) {
    res
      .status(400)
      .json({ message: 'Required fields are missing or user not found' });

    return;
  }

  const newExpense = await Expense.create({
    userId,
    title,
    amount,
    spentAt,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  res.status(200).json(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, spentAt, category, note } = req.body;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  const updatedExpense = await expense.update({
    title,
    amount,
    spentAt,
    category,
    note,
  });

  res.status(200).json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);

  if (!expense) {
    res.status(404).json({ message: 'Expense not found' });

    return;
  }

  await expense.destroy();

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
