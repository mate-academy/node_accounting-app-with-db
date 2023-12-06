'use strict';

const expenseService = require('./../services/expenses.service');
const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { badRequestResponse } = require('./../helpers/badRequestResponse');
const { isDate } = require('../helpers/isDate');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(expenseService.getExpenses(userId, from, to, categories));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return notFoundResponse(res, 'Expense');
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(userId)) {
    return res
      .status(400)
      .json({
        error: 'User not found',
      });
  }

  if (!isDate(spentAt)) {
    return badRequestResponse(res, 'spentAt', 'Date');
  }

  if (!category || typeof category !== 'string') {
    return badRequestResponse(res, 'category', 'string');
  }

  if (!note || typeof note !== 'string') {
    return badRequestResponse(res, 'note', 'string');
  }

  if (amount === undefined || typeof amount !== 'number') {
    return badRequestResponse(res, 'amount', 'number');
  }

  if (!title || typeof title !== 'string') {
    return badRequestResponse(res, 'title', 'string');
  }

  const newExpense = expenseService.create(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }
  );

  return res.status(201).json(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return notFoundResponse(res, 'Expense');
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    return notFoundResponse(res, 'Expense');
  }

  if (
    dataToUpdate.hasOwnProperty('id')
    || dataToUpdate.hasOwnProperty('userId')
  ) {
    return res
      .status(400)
      .json({
        error: 'You can not update id or userId',
      });
  }

  if (dataToUpdate.spentAt && !isDate(dataToUpdate.spentAt)) {
    return badRequestResponse(res, 'spentAt', 'Date');
  }

  if (dataToUpdate.category && typeof dataToUpdate.category !== 'string') {
    return badRequestResponse(res, 'category', 'string');
  }

  if (dataToUpdate.note && typeof dataToUpdate.note !== 'string') {
    return badRequestResponse(res, 'note', 'string');
  }

  if (dataToUpdate.amount && typeof dataToUpdate.amount !== 'number') {
    return badRequestResponse(res, 'amount', 'string');
  }

  if (dataToUpdate.title && typeof dataToUpdate.title !== 'string') {
    return badRequestResponse(res, 'title', 'string');
  }

  expenseService.update(id, dataToUpdate);

  res.send(expense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
