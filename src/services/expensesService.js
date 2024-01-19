'use strict';

const { Op } = require('sequelize');
const { Expenses } = require('../DbInstances/expenses');

const getAllExpenses = async(userId, categories, from, to) => {
  const where = {};

  if (categories) {
    where.category = categories;
  }

  if (userId) {
    where.userId = Number(userId);
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  const expenses = await Expenses.findAll({ where });

  return expenses;
};

const getExpenseById = async(id) => {
  const expense = await Expenses.findByPk(id);

  return expense;
};

const createExpense = async({
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
    note: note || '',
  };

  return Expenses.create(newExpense);
};

const updateExpense = async({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = await getExpenseById(id);

  await Expenses.update(
    spentAt,
    title,
    amount,
    category,
    note,
    { where: { id } }
  );

  return expenseToUpdate;
};

const removeExpense = async(id) => {
  await Expenses.destroy({
    where: {
      id,
    },
  });

  return true;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
