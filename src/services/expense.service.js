const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpense = async () => {
  return Expense.findAll();
};

const getExpenseById = async (expenseId) => {
  return Expense.findByPk(expenseId);
};

const filterQuery = async ({ from, to, userId, categories }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from) {
    where.spentAt = { ...where.spentAt, [Op.gte]: new Date(from) };
  }

  if (to) {
    where.spentAt = { ...where.spentAt, [Op.lte]: new Date(to) };
  }

  if (categories) {
    where.category = { [Op.in]: categories };
  }

  return Expense.findAll({ where });
};

const addExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpence = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(newExpence);
};

const deleteExpense = async (expenseId) => {
  const rowsDeleted = await Expense.destroy({
    where: { id: expenseId },
  });

  return rowsDeleted;
};

const updateExpense = async (
  expenseId,
  title,
  spentAt,
  amount,
  category,
  note,
) => {
  const expenseToUpdate = await Expense.findByPk(expenseId);

  if (title) {
    expenseToUpdate.title = title;
  }

  if (spentAt) {
    expenseToUpdate.spentAt = spentAt;
  }

  if (amount) {
    expenseToUpdate.amount = amount;
  }

  if (category) {
    expenseToUpdate.category = category;
  }

  if (note) {
    expenseToUpdate.note = note;
  }

  await expenseToUpdate.save();

  return expenseToUpdate;
};

module.exports = {
  getAllExpense,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
  filterQuery,
};
