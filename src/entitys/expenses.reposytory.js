const { models } = require('../models/models.js');
const Expense = models.Expense;

const getAll = (filterParams = {}) => {
  return Expense.findAll({ where: filterParams });
};

const create = (data) => {
  return Expense.create(data);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const update = (id, data) => {
  return Expense.update(data, { where: { id }, returning: true });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
