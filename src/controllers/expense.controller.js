'use strict';

const expenseService = require('../services/expense.service');
const usersService = require('../services/user.service');

const getAll = async(req, res) => {
  const { categories, userId, from, to } = req.query;

  const expenses = await expenseService.get({
    categories,
    userId,
    from,
    to,
  });

  res.send(expenses);
};

const getOne = async(req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = await usersService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title || !spentAt || !amount) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create({
    userId: user.id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(+id, body);

  res.send(await expenseService.getById(+id));
};

const remove = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expense.id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
