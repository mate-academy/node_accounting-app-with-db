const getFilteredExpenses = require('../utils/getFilteredExpenses');
const { Expense } = require('../models/Expense.model');

const getAll = async (query) => {
  const filterParam = getFilteredExpenses(query);

  return Expense.findAll({ where: filterParam });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({
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

const update = async (id, body) => {
  await Expense.update({ ...body }, { where: { id } });

  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
