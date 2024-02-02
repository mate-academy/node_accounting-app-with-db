/* eslint-disable no-console */
'use strict';

// const expenses = [];
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { Expenses } = require('../models/expenses');

// getAllExpenses with optional, not required parameters
// userId, categories, and from to to date
const getAllExpenses = async({ userId, category, from, to }) => {
  const filter = {};

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const currentDate = year + '-' + month + '-' + day;
  let fromDate = '1900-01-01';
  let toDate = currentDate;

  if (userId) {
    filter.userId = userId;
  }

  if (category) {
    filter.category = category;
  }

  if (from) {
    fromDate = from;
  }

  if (to) {
    toDate = to;
  }

  const spentAt = {
    spentAt: { [Op.between]: [fromDate, toDate] },
  };

  console.log(spentAt);

  const result = await Expenses.findAll({
    where: {
      ...filter, ...spentAt,
    },
  });

  // console.log(result);

  return result;
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
