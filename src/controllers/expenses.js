'use strict';

const { ExpenseService } = require('../services/expenseServise');
const { UserService } = require('../services/userService');

const expenseServise = new ExpenseService();
const userServise = new UserService();

const getAll = async(req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(await expenseServise.getAll());

    return;
  }

  res.send(expenseServise.getFiltered(searchParams));
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId || isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServise.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userServise.getUserById(userId);

  if (!foundUser || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServise.create(req.body);

  res.sendStatus(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const hasDeleted = expenseServise.remove(expenseId);

  if (!hasDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenseServise.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isEverythingCorrect = spentAt
    || title
    || amount
    || category
    || note;

  if (!isEverythingCorrect || isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  expenseServise.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
