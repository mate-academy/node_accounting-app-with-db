'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = await expensesService.getAll({
    userId,
    category,
    from,
    to,
  });

  res.send(expenses.map(expensesService.normalizeExpense));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const expense = await expensesService.getbyId(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.normalizeExpense(expense));
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

  const user = await usersService.getbyId(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const expense = await expensesService.getbyId(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const expense = await expensesService.getbyId(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;
  const updatedExpense = await expensesService.update({
    id: expenseId,
    data,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
