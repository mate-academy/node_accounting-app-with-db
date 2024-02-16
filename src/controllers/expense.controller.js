'use strict';

const expenseService = require('../service/expense.service');
const userService = require('../service/user.service');
const {
  validateExpenseGetRequestQuery,
  validateExpensePatchRequestBody,
  validateExpensePostRequestBody,
} = require('../utils/validateRequest');

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  const isQueryValid = validateExpenseGetRequestQuery({
    userId, categories, from, to,
  });

  if (!isQueryValid) {
    res.sendStatus(400);

    return;
  }

  const expenses = await expenseService.get({
    userId, categories, from, to,
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

const addOne = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isRequestValid = validateExpensePostRequestBody({
    userId, spentAt, title, amount, category, note,
  });

  if (!isRequestValid || !(await userService.getById(userId))) {
    res.sendStatus(400);

    return;
  }

  const newExpenseData = {
    userId, spentAt, title, amount, category, note,
  };

  const newExpense = await expenseService.add(newExpenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteOne = async(req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

const updateOne = async(req, res) => {
  const id = parseInt(req.params.id);
  const { spentAt, title, amount, category, note } = req.body;

  const isRequestValid = validateExpensePatchRequestBody({
    spentAt, title, amount, category, note,
  });

  if (isNaN(id) || !isRequestValid) {
    res.sendStatus(400);

    return;
  }

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  const dataToUpdate = {
    spentAt, title, amount, category, note,
  };

  await expenseService.update(id, dataToUpdate);

  const updatedExpense = await expenseService.getById(id);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
