'use strict';

const { expenseService } = require('../service/expense.js');
const { userService } = require('../service/user.js');

const add = async(req, res) => {
  const {
    userId,
    title,
  } = req.body;

  if (!userService.getById(userId) || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = async(req, res) => {
  const { userId, from, to, category } = req.query;

  const expenses = await expenseService.getAll();

  if (userId) {
    const userExpenses = await expenseService
      .findById(userId);

    res.send(userExpenses);

    return;
  }

  if (category) {
    const categoryExpenses = await expenseService
      .findUserExpenses(category);

    res.send(categoryExpenses);

    return;
  }

  if (from && to) {
    const expensesBetweenDates = await expenseService
      .filteredFromTo(from, to);

    res.send(expensesBetweenDates);

    return;
  }

  res.send(expenses);
};

const getOne = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const update = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expenseService.update(expenseId, req.body);

  res.send(newExpense);
};

const remove = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  const foundExpense = await expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(+expenseId);

  res.sendStatus(204);
};

module.exports.expenseController = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
