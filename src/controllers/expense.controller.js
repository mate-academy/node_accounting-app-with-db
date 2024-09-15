'use strict';

const { statusCode } = require('../helpers/statusCode');
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const userExpenses = await expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(statusCode.OK);
  res.send(userExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.status(statusCode.OK);
  res.send(expense);
};

const create = async (req, res) => {
  const body = req.body;

  const { userId, spentAt, title } = body;

  if (!spentAt || !title) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const isExistUser = await userService.getById(+userId);

  if (!isExistUser) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const expense = await expenseService.create(body);

  res.status(statusCode.CREATED);
  res.send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expenseToUpdate = await expenseService.getById(+id);

  if (!expenseToUpdate) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  const body = req.body;

  await expenseService.update(body, +id);

  const updatedExpense = await expenseService.getById(+id);

  res.status(statusCode.OK);
  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  await expenseService.remove(+id);
  res.sendStatus(statusCode.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
