'use strict';

const { filterExpenses } = require('../helpers/expenseHelper');
const { models: { Expense } } = require('../models/models');

const EXPENSE_NOT_FOUND_ERROR = 'Expense doesn\'t exist';

const init = async() => {
  await Expense.destroy({
    where: {},
    truncate: true,
  });
};

const getExpenses = async(filterOptions) => {
  const expenses = await Expense.findAll();

  return filterExpenses(expenses, filterOptions);
};

const getExpenseById = async(id) => {
  const searchExpense = await Expense.findOne({ where: { id } });

  if (!searchExpense) {
    throw new Error(EXPENSE_NOT_FOUND_ERROR);
  }

  return searchExpense;
};

const createExpense = async(
  { userId, spentAt, title, amount, category, note }
) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const createdExpense = await Expense.create(expense);

  return createdExpense;
};

const deleteExpense = async(id) => {
  const expemseToDelete = await getExpenseById(id);

  if (!expemseToDelete) {
    throw new Error(EXPENSE_NOT_FOUND_ERROR);
  }

  await expemseToDelete.destroy();
};

const changeExpense = async(updatedExpenseFields, id) => {
  const expenseToChange = await getExpenseById(id);

  if (!expenseToChange) {
    throw new Error(EXPENSE_NOT_FOUND_ERROR);
  }

  await expenseToChange.update({
    ...expenseToChange,
    ...updatedExpenseFields,
  });

  return expenseToChange;
};

module.exports = {
  changeExpense,
  deleteExpense,
  getExpenses,
  getExpenseById,
  createExpense,
  init,
};
