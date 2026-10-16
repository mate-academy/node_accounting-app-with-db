const expenseRepository = require('../repositories/expenseRepository');

const getAll = () => {
  return expenseRepository.getAll();
};

const getById = (id) => {
  return expenseRepository.getById(id);
};

const remove = (id) => {
  return expenseRepository.remove(id);
};

const create = (expense) => {
  return expenseRepository.create(expense);
};

const update = (expense) => {
  return expenseRepository.update(expense);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
