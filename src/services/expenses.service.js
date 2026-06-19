const { Expense } = require('../models/Expense.model');

const getAllExpenses = async () => {
  return Expense.findAll();
};

const createExpenses = async ({
  userId,
  spentAt,
  title,
  amount,
  categoryId,
  note,
}) => {
  return Expense.create({
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    categoryId: Number(categoryId),
    note,
  });
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const deleteExpenses = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpenses = async (id, body) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(body);

  return expense;
};

const resetExpenses = () => {
  return Expense.destroy({ where: {} });
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpense,
  deleteExpenses,
  updateExpenses,
  resetExpenses,
};
