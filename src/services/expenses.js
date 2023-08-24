'use strict';

const Expense = require('../models/expenses.js');

const getAll = async({ userId, categoryId, from, to }) => {
  let expensesFromDB = await Expense.findAll();

  if (categoryId) {
    expensesFromDB = expensesFromDB.filter((exp) => {
      return exp.categoryId === categoryId;
    });
  }

  if (userId) {
    expensesFromDB = expensesFromDB.filter((exp) => {
      return exp.userId === userId;
    });
  }

  if (from && to) {
    expensesFromDB = expensesFromDB.filter((exp) => {
      return exp.spentAt >= from && exp.spentAt <= to;
    });
  }

  return expensesFromDB;
};

const getById = async(expenseId) => {
  const expense = await Expense.findByPk(expenseId);

  return expense;
};

const create = async({ userId, spentAt, title, amount, categoryId, note }) => {
  const newExpence = {
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  };

  const expenseToPush = await Expense.create(newExpence);

  return expenseToPush;
};

const remove = async(expenseId) => {
  const expenseToRemove = await Expense.destroy({
    where: { id: expenseId },
  });

  return expenseToRemove;
};

const update = async(expenseId, body) => {
  await Expense.update(body, {
    where: { id: expenseId },
  });

  return getById(expenseId);
};

module.exports = {
  Expense,
  getAll,
  getById,
  create,
  remove,
  update,
};
