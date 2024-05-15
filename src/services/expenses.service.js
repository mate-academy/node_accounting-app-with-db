const { Expense } = require('../models/Expense.model');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

const getExpenses = async (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  return Expense.findAll({
    where: filteredExpenses,
  });
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
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

const updateExpense = async (id, body) => {
  await Expense.update({ ...body }, { where: { id } });

  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
