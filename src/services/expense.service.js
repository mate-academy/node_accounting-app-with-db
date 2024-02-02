'use strict';

const { Expense } = require('../database');

const getAllExpenses = async(req) => {
  const { userId, categories, from, to } = req.query;

  const whereClause = {};

  if(userId) {
    whereClause.userId = userId
  }

  if(categories) {
    whereClause.categories = categories
  }

  if(from) {
    whereClause.from = from
  }

  if(to) {
    whereClause.to = to
  }

  const expensesX = await Expense.findAll({ where: whereClause });

  return expensesX;
};

const getExpenseById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async(items) => {
  const newExpense = await Expense.create({
    ...items,
  });

  return newExpense;
};

const updateExpense = async(id, items) => {
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
