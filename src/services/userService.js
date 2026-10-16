const userRepository = require('../repositories/userRepository');

const getAll = () => {
  return userRepository.getAll();
};

const getById = (id) => {
  return userRepository.getById(id);
};

const remove = (id) => {
  return userRepository.remove(id);
};

const create = (expense) => {
  return userRepository.create(expense);
};

const update = (expense) => {
  return userRepository.update(expense);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
