/* eslint-disable no-console */
'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  EXPENSE_NOT_FOUND_MESSAGE,
  MISSING_PARAM_MESSAGE,
} = require('../variables');

const getExpenses = async (req, res) => {
  const { from, to, categories } = req.query;
  const userId = parseInt(req.query.userId);

  let filteredExpenses = await expenseService.getAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === userId,
    );
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((expense) => {
      return categoryList.includes(expense.category);
    });
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from) &&
        new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.status(OK).send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  console.log('expence controller 2');

  if (!expense) {
    res.status(NOT_FOUND).send({ message: EXPENSE_NOT_FOUND_MESSAGE });

    return;
  }

  res.status(OK).send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(BAD_REQUEST).send({ message: MISSING_PARAM_MESSAGE });

    return;
  }

  console.log('expence controller 3');

  const user = await userService.getById(parseInt(userId));

  if (!user) {
    res.status(BAD_REQUEST).send({ message: MISSING_PARAM_MESSAGE });

    return;
  }

  const expense = await expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(CREATED).send(expense);
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const expense = await expenseService.getById(id);

  console.log('expence controller 4');

  if (!expense) {
    res.status(NOT_FOUND).send({ message: EXPENSE_NOT_FOUND_MESSAGE });

    return;
  }

  const { title, amount, category, note } = req.body;

  const updatedExpense = await expenseService.update({
    id,
    title,
    amount,
    category,
    note,
  });

  res.status(OK).send(updatedExpense);
};

const remove = async (req, res) => {
  const expenseId = parseInt(req.params.id);

  console.log('expence controller 5');

  const data = await expenseService.getById(expenseId);

  if (!data) {
    return res.status(NOT_FOUND).send({ message: EXPENSE_NOT_FOUND_MESSAGE });
  }

  await expenseService.remove(expenseId);
  res.status(NO_CONTENT).end();
};

module.exports = {
  getExpenses,
  getOne,
  create,
  update,
  remove,
};
