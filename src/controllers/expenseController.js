'use strict';

const expenseService = require('../services/expenseService');
const userService = require('../services/userService');
const { itemsFilter } = require('../services/itemsFilter');

const getAll = async(req, res) => {
  const query = req.query;

  const expenses = await expenseService.getAll();

  if (Object.keys(query).length === 0) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = itemsFilter(expenses, query);

  res.send(filteredExpenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await userService.getById(userId);

  if (title === undefined || amount === undefined || category === undefined
    || !user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  res.statusCode = 201;

  res.send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const params = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(id, params);

  res.sendStatus(200);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
