const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async (id, categories, from, to) => {
  const where = {};

  if (id) {
    where.userId = +id;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  const filteredExpenses = await Expense.findAll({ where, raw: true });

  return filteredExpenses;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id, { raw: true });

  return expense;
};

const createExpense = async (expenseData) => {
  const newExpense = await Expense.create(expenseData);

  return newExpense.toJSON();
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id: id } });
};

// const updateExpense = (expense, body) => {
//   return Object.assign(expense, body);
// };
const updateExpense = async (id, body) => {
  const [updatedCount] = await Expense.update(body, { where: { id: id } });

  if (updatedCount > 0) {
    const updatedExpense = await getExpenseById(id);

    return updatedExpense;
  }

  return null;
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
