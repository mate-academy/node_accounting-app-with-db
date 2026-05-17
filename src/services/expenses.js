const { Expense } = require('../models/Expense.model.js');

const getAllExpenses = async (userId, categories) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = Array.isArray(categories) ? categories : [categories];
  }

  return Expense.findAll({ where });
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const removeExpense = async (id) => {
  const expenseToRemove = await getExpense(id);

  await Expense.destroy({ where: { id } });

  return expenseToRemove;
};

const editExpense = async (id, { spentAt, title, amount, category, note }) => {
  const expense = await getExpense(id);

  if (!expense) {
    return null;
  }

  const updatedExpense = await expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return updatedExpense;
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  editExpense,
};
