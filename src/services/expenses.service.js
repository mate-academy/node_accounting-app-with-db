const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async () => {
  return Expense.findAll();
};

const getFilteredExpenses = (expenseParam) => {
  const { userId, from, to, categories } = expenseParam;
  const filteredExpenses = {};

  if (userId) {
    filteredExpenses.userId = userId;
  }

  if (categories) {
    filteredExpenses.category = categories;
  }

  if (from || to) {
    filteredExpenses.spentAt = {};

    if (from) {
      filteredExpenses.spentAt[Op.gte] = from;
    }

    if (to) {
      filteredExpenses.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({
    where: filteredExpenses,
  });
};

const addExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(newExpense);
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const removeExpenseById = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpenseById = async ({
  spentAt,
  title,
  amount,
  category,
  note,
  id,
}) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return getExpenseById(id);
};

module.exports = {
  getAllExpenses,
  getFilteredExpenses,
  addExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
};
