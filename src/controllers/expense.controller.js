'use strict';

const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('../models/models');

const create = async (req, res) => {
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
    category: category || null,
    note: note || null,
  });

  res.status(201).json(expense);
};

const getAll = async (req, res) => {
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

  const expenses = await Expense.findAll({
    where,
    order: [['id', 'ASC']],
  });

  res.json(expenses);
};

const getOne = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const update = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expense.update(req.body);
  res.json(expense);
};

const remove = async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expense.destroy();
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
