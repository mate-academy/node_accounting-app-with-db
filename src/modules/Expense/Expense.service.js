'use strict';

const { Op } = require('sequelize');

class ExpenseService {
  constructor(ExpenseModel) {
    this.Expense = ExpenseModel;
  }

  normalize(expense) {
    const { id, userId, spentAt, title, amount, category, note } = expense;

    return {
      id, userId, spentAt, title, amount, category, note,
    };
  }

  async getAll({ userId, categories, from, to }) {
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      where.category = categories;
    }

    if (from && to) {
      where.spentAt = {
        [Op.between]: [from, to],
      };
    }

    return this.Expense.findAll({ where });
  }

  async getOne(id) {
    return this.Expense.findByPk(id);
  }

  async add(expenseData) {
    const { dataValues: newExpense } = await this.Expense.create(expenseData);

    return newExpense;
  }

  async remove(id) {
    return this.Expense.destroy({ where: { id } });
  }

  async update(expense) {
    const { id } = expense;
    const [, updatedExpense] = await this.Expense.update(
      expense, {
        where: { id }, returning: true,
      },
    );

    if (updatedExpense.length === 0) {
      throw new Error(404);
    }

    return updatedExpense[0];
  }
}

module.exports = ExpenseService;
