const { Expense, Category } = require('../models/models').models;

const createExpense = async (data) => {
  return Expense.create(data);
};

const getExpenses = () => {
  return Expense.findAll({
    include: {
      model: Category,
      attributes: ['name'],
    },
  });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id, {
    include: {
      model: Category,
      attributes: ['name'],
    },
  });
};

const deleteExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.destroy();

  return expense;
};

const updateExpenseById = async (id, data) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(data);

  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};
