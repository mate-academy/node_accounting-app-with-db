const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

function createExpensesService() {
  return {
    getAllExpenses: async (userId, categories, from, to) => {
      const where = {};

      if (userId) {
        where.userId = userId;
      }

      if (categories.length) {
        where.category = { [Op.in]: categories };
      }

      if (from || to) {
        where.spentAt = {};

        if (from) {
          where.spentAt[Op.gte] = new Date(from);
        }

        if (to) {
          where.spentAt[Op.lte] = new Date(to);
        }
      }

      return Expense.findAll({
        where,
        order: [['id', 'ASC']],
      });
    },

    createExpenses: async (userId, spentAt, title, amount, category, note) => {
      const newExpenses = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      return newExpenses;
    },

    getExpensesById: async (id) => {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        throw new Error('not found');
      }

      return expense;
    },

    updateExpensesById: async (id, data) => {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        throw new Error('not found');
      }

      const updatedExpense = await expense.update(data);

      return updatedExpense;
    },

    deleteExpensesById: async (id) => {
      const deletedCount = await Expense.destroy({
        where: { id: id },
      });

      if (!deletedCount) {
        throw new Error('not found');
      }
    },
  };
}

module.exports = {
  createExpensesService,
};
