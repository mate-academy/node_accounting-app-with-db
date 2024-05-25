'use strict';

const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const filter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (categories) {
      filter.category = categories;
    }

    if (from || to) {
      filter.spentAt = {};

      if (from) {
        filter.spentAt[Op.gte] = from;
      }

      if (to) {
        filter.spentAt[Op.lte] = to;
      }
    }

    const expenses = await Expense.findAll({ where: filter });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateExpense = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
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
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
