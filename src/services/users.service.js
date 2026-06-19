const { User } = require('../models/User.model');

const get = async () => {
  return User.findAll();
};

const create = async (name) => {
  return User.create({ name });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  return User.update({ name }, { where: { id } });
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
