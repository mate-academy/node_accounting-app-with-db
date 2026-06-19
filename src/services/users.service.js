const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const update = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
