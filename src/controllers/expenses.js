'use strict';

const {
  normalize,
  findAll,
  findById,
  create,
  removeExpense,
  updateExpense,
} = require('../services/expenses');

const { findAll: findAllUsers } = require('../services/users');

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = await findAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  };

  res.send(expenses.map(normalize));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundExpense));
};

const add = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const hasAllData = userId && title && amount && category && note;
  const users = await findAllUsers();
  const hasUser = users.map(user => user.id).includes(userId);

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  res.statusCode = 201;
  res.send(create(newExpense));
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = {
    id: expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  res.send(updateExpense(expense));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
