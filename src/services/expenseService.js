'use strict';

const { Expense } = require('../models/Expense.model');

const createExpenseService = async (
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
) => {
  try {
    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return newExpense;
  } catch (error) {
    return 'Failed to create expense';
  }
};

const getExpensesService = async (userId, categories, from, to) => {
  try {
    const filter = {};

    if (userId) {
      filter.userId = userId;
    }

    if (categories) {
      filter.category = categories;
    }

    if (from || to) {
      filter.spentAt = {};

      if (from) {
        filter.spentAt['$gte'] = from;
      }

      if (to) {
        filter.spentAt['$lte'] = to;
      }
    }

    const expenses = await Expense.findAll({ where: filter });

    return expenses;
  } catch (error) {
    return 'Failed to get expenses';
  }
};

const getExpenseByIdService = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (error) {
    return 'Failed to get expense by ID';
  }
};

const updateExpenseService = async (
  id,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return null;
    }

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

    return expense;
  } catch (error) {
    return 'Failed to update expense';
  }
};

const deleteExpenseService = async (id) => {
  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return false;
    }
    await expense.destroy();

    return true;
  } catch (error) {
    return 'Failed to delete expense';
  }
};

const initExpenses = async () => {
  await Expense.sync();
};

module.exports = {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  initExpenses,
};
