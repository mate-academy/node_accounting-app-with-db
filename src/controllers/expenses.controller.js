'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const usersService = require('../services/users.service');
const expensesService = require('../services/expenses.service');

const getAll = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses
      .filter(expense => categoriesArray.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= new Date(from))
    );
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) <= new Date(to))
    );
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(expenses);
};

const getById = async(req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(expense);
};

const create = async(req, res) => {
  const user = usersService.getById(Number(req.body.userId));

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    ...req.body,
  };

  const expense = await expensesService.add(newExpense);

  res.statusCode = STATUS_MESSAGES.NEW_RESOURCE_CREATED;
  res.send(expense);
};

const update = async(req, res) => {
  const id = Number(req.params.id);

  if (!id || !req.body) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  const updatedExpense = await expensesService.updateById(id, req.body);

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
