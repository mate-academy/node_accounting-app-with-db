'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');
const { statusCode } = require('../statusCodes');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = await expensesService.getExpenses(
    userId,
    from,
    to,
    categories,
  );

  res.send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params || undefined;
  const userExpens = await expensesService.getExpensesById(id);

  if (!userExpens) {
    res.status(statusCode.NOT_FOUND).send();
  } else {
    res.send(userExpens);
  }
};

const create = async (req, res) => {
  const newExpense = req.body;

  if (typeof newExpense.title !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const userExist = await userService.getUserById(newExpense.userId);

  if (userExist === null) {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const expens = await expensesService.createExpense(newExpense);

  res.status(statusCode.CREATED);
  res.send(expens);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateExpense = req.body || undefined;

  if (!id || !updateExpense) {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const existingExpense = await expensesService.getExpensesById(id);

  if (!existingExpense) {
    res.status(statusCode.NOT_FOUND);
    res.send();

    return;
  }

  const changedExpens = await expensesService.changeExpense(id, updateExpense);

  res.status(statusCode.OK);
  res.send(changedExpens);
};

const remove = async (req, res) => {
  const { id } = req.params || undefined;

  if (await expensesService.getExpensesById(id)) {
    await expensesService.deleteExpense(id);
    res.status(statusCode.NO_CONTENT).send();
  } else {
    res.status(statusCode.NOT_FOUND).send();
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
