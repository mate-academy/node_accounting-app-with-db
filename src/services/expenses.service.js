const { models } = require('../models/models');
const Expense = models.Expense;

const getAll = async (queryParams) => {
  const result = await Expense.findAll({
    where: queryParams,
  });

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async (body) => {
  const result = await Expense.create(body);

  return result;
};

const deleteById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateById = async (id, updates) => {
  await Expense.update(updates, { where: { id } });

  const updatedExpense = Expense.findByPk(id);

  return updatedExpense;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
