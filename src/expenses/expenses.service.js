/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const Expenses = require('./expenses.model');

Expenses.sync();

const getExpenses = async() => {
  try {
    const expenses = await Expenses.findAll();

    return expenses;
  } catch (error) {
    throw new Error('Error while fetching expenses: ' + error.message);
  }
};

const getExpenseById = async(expenseId) => {
  try {
    const expense = await Expenses.findByPk(expenseId);

    return expense;
  } catch (error) {
    throw new Error('Error while fetching expense: ' + error.message);
  }
};

const addNewExpense = async(newExpense) => {
  try {
    const createdExpense = await Expenses.create(newExpense);

    return createdExpense;
  } catch (error) {
    throw new Error('Error while creating a new expense: ' + error.message);
  }
};

const updateExpenseValues = async(id, spentAt, title, amount, category, note) => {
  try {
    const expense = await Expenses.findByPk(id);

    if (expense) {
      if (spentAt) {
        expense.spentAt = spentAt;
      }

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
      await expense.save();

      return true;
    }

    return false;
  } catch (error) {
    throw new Error('Error while updating the expense: ' + error.message);
  }
};

const deleteOneExpense = async(id) => {
  try {
    await Expenses.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      success: false, error: error.message,
    };
  }
};

const expensesService = {
  getExpenses,
  getExpenseById,
  addNewExpense,
  updateExpenseValues,
  deleteOneExpense,
};

module.exports = {
  expensesService,
};
