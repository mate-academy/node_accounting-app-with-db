const { getExpensesFilterQuery } = require('../utils/expenses');

const { Expense } = require('../models/Expense.model.js');

const getExpenses = async (categories, userId, from, to) => {
  const data = getExpensesFilterQuery(categories, userId, from, to);

  const expenses = await Expense.findAll({ data });

  return expenses;
};

const getExpensesById = async (id) => {
  const expenses = await Expense.findByPk({ id });

  return expenses;
};

const createExpense = async (expense) => {
  const newExpense = await Expense.create({ expense });

  return newExpense;
};

const updateExpense = async (id, valuesToUpdate) => {
  await Expense.update(valuesToUpdate, { where: { id } });

  const updatedExpense = await getExpensesById(id);

  return updatedExpense;
};

const removeExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  removeExpense,
};
