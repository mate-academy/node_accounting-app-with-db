'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const create = async (req, res) => {
  const { spentAt, title, amount, userId, category, note } = req.body;

  if (!spentAt || !title || !amount || !userId) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create({
    spentAt,
    title,
    amount,
    userId,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getAll = async (req, res) => {
  const expense = await expensesService.getAll(req.query);

  res.json(expense);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.update(id, req.body);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const deleted = await expensesService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
