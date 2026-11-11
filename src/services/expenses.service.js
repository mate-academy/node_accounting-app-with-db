const { Expense } = require('../models/Expense.model');

const getAll = async () => {
  return Expense.findAll();
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (data) => {
  return Expense.create(data);
};

const deleteById = async (id) => {
  return Expense.destroy({ where: { id } });
};

const update = async ({ id, ...data }) => {
  await Expense.update(data, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
