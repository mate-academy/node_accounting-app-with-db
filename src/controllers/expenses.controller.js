'use strict';

const { Op } = require('sequelize');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
  }

  const expenses = await expensesService.getAll(where);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isValidUserId = typeof userId === 'number';
  const isValidTitle = typeof title === 'string' && title.trim() !== '';
  const isValidAmount = typeof amount === 'number' && Number.isFinite(amount);
  const isValidSpentAt =
    typeof spentAt === 'string' && !Number.isNaN(Date.parse(spentAt));

  if (!isValidUserId || !isValidTitle || !isValidAmount || !isValidSpentAt) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const update = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.update(expense, req.body);

  res.json(expense);
};

const remove = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.remove(expense);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
