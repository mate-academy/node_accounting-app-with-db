'use strict';

const { Expense } = require('../models/expenses.model');
const { Op } = require('sequelize');

class ExpensesService {
  async getAll(searchQuery) {
    const whereOptions = this.createWhereOptions(searchQuery);

    return Expense.findAll({
      where: whereOptions,
    });
  }

  async create(newExpense) {
    return Expense.create(newExpense);
  }

  async getOne(expenseId) {
    return Expense.findByPk(expenseId);
  }

  async remove(expenseId) {
    return Expense.destroy({ where: { id: expenseId } });
  }

  async update(expenseId, newExpense) {
    return Expense.update(newExpense, {
      where: { id: expenseId },
    });
  }

  createWhereOptions({ userId, categories, from, to }) {
    const whereOptions = {};

    if (userId) {
      whereOptions.userId = userId;
    }

    if (categories && categories.length) {
      const preparedQuery = Array.isArray(categories)
        ? categories
        : [categories];

      whereOptions.category = {
        [Op.iLike]: { [Op.any]: preparedQuery },
      };
    }

    if (to) {
      whereOptions.spentAt = {
        [Op.lt]: to,
      };
    }

    if (from) {
      whereOptions.spentAt = {
        [Op.gt]: from,
      };
    }

    if (to && from) {
      whereOptions.spentAt = {
        [Op.between]: [from, to],
      };
    }

    return whereOptions;
  }
}

module.exports = { ExpensesService };
