'use strict';

const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../constants/statusCodes');
const service = require('../services/expenses.services');
const userService = require('../services/users.services');

const getExpenses = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = service.getAll();

  if (userId) {
    expenses = expenses.filter(
      expense => expense.userId === Number(userId)
    );
  }

  if (categories) {
    const categoriesArr = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses.filter(
      expense => categoriesArr.includes(expense.category)
    );
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).valueOf() >= new Date(from).valueOf())
    );
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).valueOf() <= new Date(to).valueOf())
    );
  }

  res.statusCode = OK;
  res.send(expenses);
};

const postExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(Number(userId))) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  service.add(newExpense);
  res.statusCode = CREATED;
  res.send(newExpense);
};

const getOneExpense = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = service.getById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.statusCode = OK;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const id = Number(req.params.id);
  const expense = service.getById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  service.remove(id);
  res.sendStatus(NO_CONTENT);
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);

  if (!id || !req.body) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  if (!service.getById(id)) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(service.update(id, req.body));
};

module.exports = {
  getExpenses,
  postExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
