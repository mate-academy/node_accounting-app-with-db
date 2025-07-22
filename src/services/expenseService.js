const { Expense } = require('../models/Expense.model');
const userService = require('./userService');
const { Op } = require('sequelize');

class ExpenseService {
  async resetData() {
    // Delete expenses first (child table)
    await Expense.destroy({ where: {}, force: true });
  }

  async getAllExpenses({ userId, categories, from, to } = {}) {
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      where.category = { [Op.in]: cats };
    }

    if (from) {
      where.spentAt = { ...where.spentAt, [Op.gte]: new Date(from) };
    }

    if (to) {
      where.spentAt = { ...where.spentAt, [Op.lte]: new Date(to) };
    }

    const expenses = await Expense.findAll({ where });

    // Convert amount to number for consistency and exclude timestamps
    return expenses.map((expense) => {
      const { createdAt, updatedAt, ...data } = expense.toJSON();

      return {
        ...data,
        amount: parseFloat(expense.amount),
      };
    });
  }

  async createExpense(expenseData) {
    const { userId, spentAt, title, amount, category, note } = expenseData;

    if (!userId || !spentAt || !title || amount === undefined) {
      throw new Error('Required fields missing');
    }

    // Always store userId as integer for consistency with tests
    const intUserId = typeof userId === 'string' ? parseInt(userId) : userId;

    try {
      await userService.getUserById(intUserId);
    } catch (error) {
      throw new Error('User not found');
    }

    const expense = await Expense.create({
      userId: intUserId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    const { createdAt, updatedAt, ...data } = expense.toJSON();

    return {
      ...data,
      amount: parseFloat(expense.amount),
    };
  }

  async getExpenseById(id) {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    const { createdAt, updatedAt, ...data } = expense.toJSON();

    return {
      ...data,
      amount: parseFloat(expense.amount),
    };
  }

  async updateExpense(id, expenseData) {
    const { spentAt, title, amount, category, note } = expenseData;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    await expense.save();

    const { createdAt, updatedAt, ...data } = expense.toJSON();

    return {
      ...data,
      amount: parseFloat(expense.amount),
    };
  }

  async deleteExpense(id) {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    await expense.destroy();

    return true;
  }
}

module.exports = new ExpenseService();
