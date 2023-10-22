'use strict';

const Expense = require('../models/expenseModel');

const getAllExpenses = async(query) => {
  const expenses = await Expense.findAll();

  return filterExpenses(expenses, query);
};

const getExpenseById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => Expense.create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const updateExpense = async(id, updateData) => {
  await Expense.update(updateData, { where: { id } });

  return getExpenseById(id);
};

const removeExpense = async(id) => {
  await Expense.destroy({ where: { id } });
};

function filterExpenses(data, {
  userId,
  categories,
  from,
  to,
}) {
  let filteredExpenses = data;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category))
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => (
      expense.spentAt >= fromDate
      && expense.spentAt <= toDate
    ));
  }

  return filteredExpenses;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
