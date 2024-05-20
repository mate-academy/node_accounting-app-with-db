const { Expense } = require('../models/Expense.model');
const { getFilteredExpenses } = require('../utils/getFilteredExtenses');

const getAll = async (data) => {
  const filteredExpenses = getFilteredExpenses(data);

  return Expense.findAll({
    where: filteredExpenses,
  });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const createExpenses = async ({
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

const updateExpenses = async (id, data) => {
  await Expense.update({ ...data }, { where: { id } });

  return Expense.findByPk(id);
};

const deleteExpenses = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  deleteExpenses,
};
