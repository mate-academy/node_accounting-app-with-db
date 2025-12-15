'use strict';

const { Op } = require('sequelize');
const { models } = require('../models/models');

const { Expense, Category, User } = models;

const createExpense = async (req, res) => {
  try {
    const { category, spentAt, title, amount, note, userId } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let categoryInstance = null;

    if (category) {
      [categoryInstance] = await Category.findOrCreate({
        where: { name: category },
      });
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      note,
      userId,
      categoryId: categoryInstance ? categoryInstance.id : null,
    });

    res.status(201).json({
      id: expense.id,
      spentAt,
      title,
      amount: Number(amount),
      note,
      userId,
      category: category || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { userId, from, to, categories } = req.query;

    const where = {
      ...(userId && { userId }),
      ...((from || to) && {
        spentAt: {
          ...(from && { [Op.gte]: from }),
          ...(to && { [Op.lte]: to }),
        },
      }),
    };

    const include = [
      {
        model: Category,
        attributes: ['name'],
        ...(categories && {
          where: {
            name: {
              [Op.in]: categories.split(','),
            },
          },
        }),
      },
    ];

    const expenses = await Expense.findAll({
      where,
      include,
      order: [['spentAt', 'ASC']],
    });

    res.json(
      expenses.map((e) => ({
        id: e.id,
        spentAt: e.spentAt,
        title: e.title,
        amount: Number(e.amount),
        note: e.note,
        userId: e.userId,
        category: e.Category ? e.Category.name : null,
      })),
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpenseById = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id, {
    include: { model: Category, attributes: ['name'] },
  });

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json({
    id: expense.id,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: Number(expense.amount),
    note: expense.note,
    userId: expense.userId,
    category: expense.Category ? expense.Category.name : null,
  });
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id, {
    include: Category,
  });

  if (!expense) {
    return res.sendStatus(404);
  }

  await expense.update(req.body);

  res.json({
    id: expense.id,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: Number(expense.amount),
    note: expense.note,
    userId: expense.userId,
    category: expense.Category ? expense.Category.name : null,
  });
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const deleted = await Expense.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
