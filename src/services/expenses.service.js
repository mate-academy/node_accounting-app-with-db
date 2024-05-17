const { Expense } = require('../models/Expense.model');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

const getAllExpenses = async (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  return Expense.findAll({
    where: filteredExpenses,
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpence = async ({
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

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpence = async (id, body) => {
  await Expense.update({ ...body }, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpence,
  deleteExpense,
  updateExpence,
};
