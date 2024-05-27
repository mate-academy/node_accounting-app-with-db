/* eslint-disable function-paren-newline */
const { Expense } = require('../models/Expense.model');

const allExpenses = async (userId, categories, from, to) => {
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
    return error;
  }
};

const expenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpenses = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const id = Math.floor(Math.random() * 10000);

  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpenses = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpenses = async (id, body) => {
  await Expense.update(body, { where: { id } });
};

const clearExpenses = async () => {
  return Expense.destroy({ where: {} });
};

module.exports = {
  allExpenses,
  expenseById,
  createExpenses,
  deleteExpenses,
  updateExpenses,
  clearExpenses,
};
//
