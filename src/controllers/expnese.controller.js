'use strict';

const statusCode = require('../constants/statusCodes');
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const { isIdValid } = require('../helpers/isIdValid');
const {
  isNewExpenseValid,
  isUpdateExpenseValid,
} = require('../helpers/expenseHelper');
const BAD_REQUEST_MESSAGE = 'Bad request';

const getExpenses = async(req, res) => {
  res.status(statusCode.OK);
  res.send(await expenseService.getExpenses(req.query));
};

const getExpenseById = async(req, res) => {
  const { id } = req.params;

  if (!id || !isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    const expense = await expenseService.getExpenseById(+id);

    res.status(statusCode.OK);
    res.send(expense);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const createExpense = async(req, res) => {
  const expense = req.body;

  try {
    const user = await userService.getUserById(+expense.userId);

    if (!isNewExpenseValid(expense)
      || !user) {
      res.status(statusCode.BAD_REQUEST);
      res.send(BAD_REQUEST_MESSAGE);

      return;
    }
  } catch (ex) {
    res.status(statusCode.BAD_REQUEST);
    res.send(ex.message);

    return;
  }

  const newExpense = await expenseService.createExpense(expense);

  res.status(statusCode.CREATED);
  res.send(newExpense);
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    await expenseService.deleteExpense(+id);
    res.sendStatus(statusCode.UNDERSTOOD);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const changeExpense = async(req, res) => {
  const { id } = req.params;
  const updatedExpenseFields = req.body;

  if (!isIdValid(id) || !isUpdateExpenseValid(updatedExpenseFields)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    const changedExpense
      = await expenseService.changeExpense(updatedExpenseFields, +id);

    res.status(statusCode.OK);
    res.send(changedExpense);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  changeExpense,
  deleteExpense,
  createExpense,
};
