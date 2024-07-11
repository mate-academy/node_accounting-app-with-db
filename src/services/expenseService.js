'use strict';

const { models } = require('../models/models');

class ExpenseService {
  async createExpense(userId, spentAt, title, amount, category, note) {
    try {
      const newExpense = await models.Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      return newExpense;
    } catch (error) {
      throw error;
    }
  }

  async getAllExpenses(filters = {}) {
    try {
      const expenses = await models.Expense.findAll({
        where: filters,
      });

      return expenses;
    } catch (error) {
      throw error;
    }
  }

  async updateExpense(id, newExpense) {
    try {
      const [updatedRowsCount, [updatedExpense]] = await models.Expense.update(
        newExpense,
        {
          where: { id },
          returning: true,
        },
      );

      return updatedRowsCount ? updatedExpense : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpense(id) {
    try {
      const deletedRowsCount = await models.Expense.destroy({
        where: { id },
      });

      return deletedRowsCount > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ExpenseService };
