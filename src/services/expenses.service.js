'use strict';

const { filterExpenses } = require('../helpers/filterExpenses');
const { Expense } = require('../models/Expense');

async function getAllExpenses(userId, categories, from, to) {
  const expensesFromDB = await Expense.findAll();

  if (!userId && !categories && !from && !to) {
    return expensesFromDB;
  }

  try {
    const filteredExpenses = filterExpenses(
      expensesFromDB, categories, userId, from, to
    );

    return filteredExpenses;
  } catch (error) {
    return error;
  }
}

async function getExpenseById(id) {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (error) {
    return error;
  }
}

async function createExpense({
  name,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = await Expense.create({
    name,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
}

async function updateExpense({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  await Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: {
      id,
    },
  });

  return getExpenseById(id);
}

async function removeExpense(id) {
  try {
    await Expense.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
