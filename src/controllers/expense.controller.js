'use strict';

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_NO_CONTENT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
} = require('../constants');

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let filteredExpenses = await expenseService.getAll();

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      ({ category }) => categories.includes(category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => new Date(spentAt).valueOf() >= new Date(from).valueOf()
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => new Date(spentAt).valueOf() <= new Date(to).valueOf()
    );
  }

  res.statusCode = STATUS_CODE_OK;
  res.send(filteredExpenses);
};

const getById = async(req, res) => {
  const expenseId = Number(req.params.id);

  const expense = await expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  const user = await userService.getById(expense.userId);

  if (!user && !expense.userId) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  res.statusCode = STATUS_CODE_OK;
  res.send(expense);
};

const update = async(req, res) => {
  const expenseId = Number(req.params.id);
  const body = req.body;

  const expense = await expenseService.getById(expenseId);

  if (!expense || !body) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  const user = await userService.getById(expense.userId);

  if (!user) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const updatedExpense = await expenseService.update(
    expenseId,
    body,
  );

  res.statusCode = STATUS_CODE_OK;
  res.send(updatedExpense);
};

const create = async(req, res) => {
  const {
    title,
    amount,
    category,
    userId,
  } = req.body;

  if (!title || !amount || !category || !userId) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  if (!(await userService.getById(+userId))) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const expense = await expenseService.create(req.body);

  res.statusCode = STATUS_CODE_CREATED;
  res.send(expense);
};

const remove = async(req, res) => {
  const expenseId = Number(req.params.id);

  if (!(await expenseService.getById(+expenseId))) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  await expenseService.deleteExpense(+expenseId);

  res.sendStatus(STATUS_CODE_NO_CONTENT);
};

module.exports = {
  update,
  getAll,
  getById,
  create,
  remove,
};
