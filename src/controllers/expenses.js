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

  const expenses = await expensesService.getAll(userId, category, from, to);

  res.send(
    expenses.map(expensesService.normalize),
  );
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getbyId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expensesService.normalize(foundExpense),
  );
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

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.statusCode(422);

    return;
  }

  const foundUser = await usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

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

  res.send(
    expensesService.normalize(newExpense),
  );
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpenses = await expensesService.getbyId(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getbyId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  await expensesService.update({
    id: expenseId,
    data,
  });

  const updatedExpense = await expensesService.getById(expenseId);

  res.send(
    expensesService.normalize(updatedExpense),
  );
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
