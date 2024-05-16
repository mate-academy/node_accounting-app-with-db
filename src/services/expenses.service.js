const { Expense } = require('../models/Expense.model');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

const initExpenses = () => {
  return [];
};

const getAllExpenses = async (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  if (!filteredExpenses) {
    return [];
  }

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
  initExpenses,
  getAllExpenses,
  getExpenseById,
  createExpence,
  deleteExpense,
  updateExpence,
};
