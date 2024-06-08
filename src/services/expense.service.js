const { Expense } = require('../models/Expense.model');

const get = (filter) => {
  return Expense.findAll({ where: filter });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (expense) => {
  return Expense.create(expense);
};

const removeExpense = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = (id, updatedBody) => {
  return Expense.update(
    { ...updatedBody },
    {
      where: {
        id,
      },
      returning: true,
    },
  );
};

module.exports = {
  get,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
