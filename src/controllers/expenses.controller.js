/* eslint-disable curly */
'use strict';

const { validate: isUuid } = require('uuid');
const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query || {});

  res.json(expenses.map((ex) => expensesService.normalize(ex)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const expense = await expensesService.getById(id);

  if (!expense) return res.sendStatus(404);

  res.json(expensesService.normalize(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) return res.sendStatus(400);

  const expense = await expensesService.create({ userId, ...req.body });

  res.status(201).json(expense);
};

const updatePut = async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const expense = await expensesService.getById(id);

  if (!expense) return res.sendStatus(404);

  const { userId, spentAt, title, amount, category, note } = req.body || {};

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  await expense.update({
    userId,
    spentAt,
    title,
    amount,
    category: category ?? expense.category,
    note: note ?? expense.note,
  });

  res.json(expensesService.normalize(expense.toJSON()));
};

const updatePatch = async (req, res) => {
  const body = req.body || {};
  const filteredBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => Boolean(value)),
  );

  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const expense = await expensesService.getById(id);

  if (!expense) return res.sendStatus(404);

  await expense.update(filteredBody);

  res.json(expensesService.normalize(expense.toJSON()));
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const expense = await expensesService.getById(id);

  if (!expense) return res.sendStatus(404);

  await expensesService.deleteById(id);

  res.sendStatus(204);
};

module.exports = {
  expensesController: {
    getAll,
    getOne,
    create,
    deleteOne,
    updatePut,
    updatePatch,
  },
};
