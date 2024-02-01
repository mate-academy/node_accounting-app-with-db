'use strict';

const { Expense } = require('../database');

const getAllExpenses = async(req) => {
  const { userId, categories, from, to } = req.query;
  const expensesX = await Expense.findAll();

  let filteredExpenses = [...expensesX];

  if (categories && userId) {
    filteredExpenses = expensesX.filter(item => {
      return item.category === categories;
    });

    return filteredExpenses;
  };

  if (userId) {
    filteredExpenses = expensesX.filter(item => {
      return item.userId === +userId;
    });

    return filteredExpenses;
  }

  if (from && to) {
    filteredExpenses = expensesX.filter(item => {
      return item.spentAt > from && item.spentAt < to;
    });

    return filteredExpenses;
  }

  return expensesX;
};

const getExpenseById = async(id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (error) {
    return null;
  }
};

const createExpense = async(items) => {
  const newExpense = await Expense.create({
    ...items,
  });

  return newExpense;
};

const updateExpense = async(id, items) => {
  try {
    const [rowsUpdated, [updatedExpense]] = await Expense.update(
      { ...items },
      {
        where: { id }, returning: true,
      }
    );

    if (rowsUpdated === 0) {
      throw new Error('Expenses not found or no changes were made.');
    }

    return updatedExpense;
  } catch (error) {
    throw error;
  }
};

const deleteExpense = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
