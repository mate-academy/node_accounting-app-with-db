// eslint-disable-next-line no-unused-vars
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const { getUserById } = require('./user.service');

const getExpenses = async (expensesURLParams) => {
  const queries = Object.entries(expensesURLParams);

  const filteredExpenses = {};

  if (!expensesURLParams || queries.length === 0) {
    return Expense.findAll();
  }

  queries.forEach(([key, value]) => {
    switch (key) {
      case 'userId':
        filteredExpenses.userId = value;
        break;
      case 'categories':
        filteredExpenses.category = value;
        break;
      case 'from':
        filteredExpenses.spentAt = filteredExpenses.spentAt || {};
        filteredExpenses.spentAt[Op.gte] = value;
        break;
      case 'to':
        filteredExpenses.spentAt = filteredExpenses.spentAt || {};
        filteredExpenses.spentAt[Op.lte] = value;
        break;
      default:
        break;
    }
  });

  return Expense.findAll({ where: filteredExpenses });
};

const createExpense = async (expense) => {
  const { userId, title, amount } = expense;

  if (!userId || !title || !amount) {
    return null;
  }

  const findUser = getUserById(userId);

  if (!findUser) {
    return undefined;
  }

  return Expense.create(expense);
};

const getExpenseById = async (id) => {
  return Expense.findByPk(Number(id));
};

const deleteExpenseById = async (id) => {
  const findExpense = await getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  await Expense.destroy({
    where: { id },
  });

  return findExpense;
};

const updateExpense = async (expense, id) => {
  const findExpense = getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  const updatedExpense = await Expense.update(
    { ...expense },
    { where: { id }, returning: true },
  );

  return updatedExpense[1][0];
};

module.exports = {
  updateExpense,
  deleteExpenseById,
  getExpenseById,
  createExpense,
  getExpenses,
};
