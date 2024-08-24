/* eslint-disable no-console */
'use strict';

const { models } = require('../models/models');

class ExpenseService {
  async createExpense(userId, spentAt, title, amount, category, note) {
    const newExpense = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return newExpense;
  }

  async getAllExpenses(where = {}) {
    try {
      const expenses = await models.Expense.findAll({ where });

      return expenses;
    } catch (error) {
      console.error('Error in getAllExpenses:', error);
      throw error;
    }
  }

  async updateExpense(id, newExpense) {
    const [updatedRowsCount, [updatedExpense]] = await models.Expense.update(
      newExpense,
      {
        where: { id },
        returning: true,
      },
    );

    return updatedRowsCount ? updatedExpense : null;
  }

  async deleteExpense(id) {
    const deletedRowsCount = await models.Expense.destroy({
      where: { id },
    });

    return deletedRowsCount > 0;
  }
}

module.exports = { ExpenseService };
