const { Expense } = require('../../models/Expense.model');
const { Op } = require('sequelize');

const normalizeExpense = (expense) => {
  return {
    id: expense.id,
    title: expense.title,
    amount: Number(expense.amount),
    userId: expense.userId,
    spentAt: expense.spentAt,
    category: expense.category ?? null,
    note: expense.note ?? null,
  };
};

const ExpenseRepository = {
  creatExpense: async (expense) => {
    const newExpense = await Expense.create(expense);

    return normalizeExpense(newExpense);
  },

  getAllExpenses: async ({ userId, categories, from, to } = {}) => {
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      where.category = { [Op.in]: [].concat(categories) };
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

    const result = await Expense.findAll({ where });

    return result.map(normalizeExpense);
  },

  getExpensesById: async (id) => {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return null;
    }

    return normalizeExpense(expense);
  },

  updateExpenses: async ({ id, spentAt, title, amount, category, note }) => {
    const updates = Object.fromEntries(
      Object.entries({
        spentAt,
        title,
        amount,
        category,
        note,
      }).filter(([, value]) => value !== undefined),
    );

    if (Object.keys(updates).length === 0) {
      return false;
    }

    await Expense.update(updates, { where: { id } });

    const updated = await Expense.findByPk(id);

    return normalizeExpense(updated);
  },

  removeExpenses: async (id) => {
    await Expense.destroy({
      where: {
        id,
      },
    });

    return true;
  },
};

module.exports = { ExpenseRepository };
