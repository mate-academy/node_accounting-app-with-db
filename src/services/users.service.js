const { User } = require('../models/User.model.js');

const getAll = async () => {
  return User.findAll();
};

const get = async (id) => {
  return User.findByPk(id);
};

const add = async (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

const update = async (id, name) => {
  return User.update({ name }, { where: { id }, returning: true });
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
