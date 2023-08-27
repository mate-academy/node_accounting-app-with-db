'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async(req, res) => {
  const expenses = await expenseService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expenseService.getExpenseById(id);

  if (!foundExpense) {
    res.statusCode = 404;
    res.end(`Expense with id ${id} was not found`);

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId
      || !spentAt
      || !title
      || !amount
      || !category
      || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.createExpense(req.body);

  res.status(201).send(newExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expenseService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.removeExpense(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const updatedExpense = await expenseService.updateExpense(id, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
