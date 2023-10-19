'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const httpStatusCodes = require('../utils/httpStatusCodes');

const getAll = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = (await expenseService.getAll())
    .map(value => expenseService.normalize(value));

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses
      .filter(expense => (
        new Date(expense.spentAt).valueOf() > new Date(from).valueOf())
      );
  }

  if (to) {
    expenses = expenses
      .filter(expense => (
        new Date(expense.spentAt).valueOf() < new Date(to).valueOf())
      );
  }

  res.send(expenses);
};

const getById = async(req, res) => {
  const { id } = req.params;
  const searchedExpense = await expenseService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  res.send(searchedExpense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

    return;
  }

  if (!(await userService.getById(userId))) {
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = httpStatusCodes.CREATED;
  res.send(newExpense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { body } = req;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  const updatedExpense = await expenseService.update(id, body);

  res.statusCode = httpStatusCodes.OK;
  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
