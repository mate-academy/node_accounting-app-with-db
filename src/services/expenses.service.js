const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpensesService = async () => {
  return Expense.findAll();
};

const createExpenseService = async (
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const getExpenseByIdService = async (id) => {
  return Expense.findByPk(id);
};

const getExpenseByQueryService = async (query) => {
  const { userId, from, to, categories } = query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where });
};

const deleteExpenseService = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpenseService = async (
  id,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: {
        id,
      },
    },
  );
};

module.exports = {
  getAllExpensesService,
  createExpenseService,
  getExpenseByIdService,
  getExpenseByQueryService,
  deleteExpenseService,
  updateExpenseService,
};
