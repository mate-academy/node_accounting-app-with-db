'use strict';

// const expenses = [];

const { v4: uuidv4 } = require('uuid');
const { Expenses } = require('../models/expenses');

const getAllExpenses = async({ userId, categories, from, to }) => {
  let result = '';

  return Expenses.findAll({
    where: {
      result,
    },
  });

  // if (userId) {
  //   result = result.filter(el => el.userId === +userId);
  // }

  // if (categories) {
  //   result = result.filter(el => el.category === categories);
  // }

  // if (from) {
  //   result = result.filter(el => new Date(el.spentAt) > new Date(from));
  // }

  // if (to) {
  //   result = result.filter(el => new Date(el.spentAt) < new Date(to));
  // }

  // return result;
};

const getExpensesById = async(id) => {
  return Expenses.findByPk(id);
};

const createExpense = async(userId, spentAt, title, amount, category, note) => {
  const id = uuidv4();

  return Expenses.create({
    id,
    userId,
    spentAt: spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpenses = async(id) => {
  const result = await Expenses.destroy({
    where: { id },
  });

  if (result !== 1) {
    throw new Error('Id not found');
  }
};

const editExpense = (title, expense) => {
  return Object.assign(expense, { title });
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpenses,
  editExpense,
};
