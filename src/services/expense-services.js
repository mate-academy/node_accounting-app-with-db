const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const createExpenseService = async (expense) => {
  const newExpense = await Expense.create({
    ...expense,
    userId: +expense.userId,
  });

  return newExpense;
};

const getAllExpensesService = async (query) => {
  const { userId, categories, from, to } = query;

  const where = [];

  if (userId) {
    where.push({ userId: +userId });
  }

  if (categories) {
    where.push({ category: categories });
  }

  if (from) {
    where.push({ spentAt: { [Sequelize.Op.gte]: new Date(from) } });
  }

  if (to) {
    where.push({ spentAt: { [Sequelize.Op.lte]: new Date(to) } });
  }

  const expenses = await Expense.findAll({
    where,
  });

  return expenses;
};

const getExpenseByIdService = async (id) => {
  const expense = await Expense.findByPk(+id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
};

const updateExpenseService = async (id, updateExpense) => {
  const expense = await getExpenseByIdService(id);

  await Expense.update(updateExpense, {
    where: { id: expense.id },
  });

  const updatedExpense = await getExpenseByIdService(id);

  return updatedExpense;
};

const deleteExpenseService = async (id) => {
  const expense = await getExpenseByIdService(id);

  await Expense.destroy({ where: { id: expense.id } });
};

const resetExpensesService = () => {};

module.exports = {
  createExpenseService,
  getAllExpensesService,

  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,

  resetExpensesService,
};
