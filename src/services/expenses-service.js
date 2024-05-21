/* eslint-disable indent */
const { Expense } = require('../models/Expense.model');
const { getWhereOptions } = require('../services/helper');

const getExpensesData = async (query) => {
  if (query) {
    const findBy = getWhereOptions(query);

    return Expense.findAll(findBy);
  }

  return Expense.findAll();
};

const getOneExpenseData = async (id) => {
  return Expense.findByPk(id);
};

const addExpense = async (newExpense) => {
  return Expense.create(newExpense);
};

const removeExpense = async (id) => {
  await Expense.destroy({ where: { id } });

  return getExpensesData();
};

const updatedExpenseData = async (id, newData) => {
  await Expense.update(newData, { where: { id } });

  return getOneExpenseData(id);
};

module.exports = {
  getExpensesData,
  getOneExpenseData,
  addExpense,
  removeExpense,
  updatedExpenseData,
};
