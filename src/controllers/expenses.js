'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAll = async(req, res) => {
  if (Object.keys(req.query).length > 0) {
    const filteredExpenses = await expensesService.getAllWithFilter(req.query);

    res.send(filteredExpenses);

    return;
  }

  const expenses = await expensesService.getAll();

  res.send(expenses);
};

const getOne = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expensesService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note
    );

    res.statusCode = 201;
    res.send(newExpense);
  } catch (exception) {
    global.console.log('Error', exception);

    res.sendStatus(404);
  }
};

const remove = async(req, res) => {
  const expenseId = Number(req.params.expenseId);
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { userId } = req.body;

  if (userId && !await userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const [, updatedExpense] = await expensesService.update({
    id: expenseId,
    ...req.body,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
