/* eslint-disable no-return-await */
const { Expense } = require('../models/Expense.model');
const expensesService = {
  async getExpenses() {
    return await Expense.findAll();
  },

  async reset() {
    await Expense.destroy({ where: {} });
  },

  async createExpense(userId, spentAt, title, amount, category, note) {
    return await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
  },

  async getExpense(id) {
    return await Expense.findByPk(id);
  },

  async deleteExpense(id) {
    const deleted = await Expense.destroy({ where: { id } });

    return deleted > 0;
  },

  async updateExpense(id, spentAt, title, amount, category, note) {
    const updatedFields = {};

    if (spentAt !== undefined) {
      updatedFields.spentAt = spentAt;
    }

    if (title !== undefined) {
      updatedFields.title = title;
    }

    if (amount !== undefined) {
      updatedFields.amount = amount;
    }

    if (category !== undefined) {
      updatedFields.category = category;
    }

    if (note !== undefined) {
      updatedFields.note = note;
    }

    const [updatedRows] = await Expense.update(updatedFields, {
      where: { id },
    });

    if (updatedRows === 0) {
      return 0;
    }

    return await Expense.findByPk(id);
  },
};

module.exports = {
  expensesService,
};
