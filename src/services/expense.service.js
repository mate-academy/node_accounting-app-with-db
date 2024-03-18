/* eslint-disable no-console */
'use strict';

const {
  models: { Expense },
} = require('../models/models');

const getAll = async () => {
  const result = await Expense.findAll();

  console.log(1);

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  console.log(2);

  return result;
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const expenses = await Expense.findAll();

  console.log(3);

  console.log('test-expenses', title, expenses);

  const expense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const result = await Expense.create(expense);

  return result;
};

const update = async ({ id, title, amount, category, note }) => {
  const expenses = await Expense.findAll();
  const expense = expenses.find((exp) => exp.id === id);

  console.log(4);

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  await Expense.update(expense, { where: { id } });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });

  console.log(5);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
